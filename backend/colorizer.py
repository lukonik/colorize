from fileinput import filename
from typing import Literal
from deoldify.visualize import ModelImageVisualizer, get_image_colorizer
import logging
import requests
from dotenv import dotenv_values
from os.path import isfile

logger = logging.getLogger(__name__)

config = dotenv_values()

COLORIZER_TYPE = Literal["stable", "artistic"]

colorizers: dict[str, ModelImageVisualizer] = {
    "stable": None,
    "artistic": None,
}


def get_colorizer(type: COLORIZER_TYPE) -> ModelImageVisualizer:
    return _get_or_create_colorizer(type)


def _get_or_create_colorizer(type: COLORIZER_TYPE):
    col = colorizers[type]
    import os

    current_dir = os.getcwd()
    print("Current Directory:", current_dir)
    if col is None:
        logger.info("Initializing image colorizers!")
        colorizers[type] = get_image_colorizer(artistic=type == "artistic")
        logger.info("Colorizers are initialized!")
        return colorizers[type]
    return col


def download_weights():
    logger.info("Checking weights")
    model_files = {
        "stable": {
            "url": config["STABLE_WEIGHTS"],
            "filename": "ColorizeStable_gen.pth",
        },
        "artistic": {
            "url": config["ARTISTIC_WEIGHTS"],
            "filename": "ColorizeArtistic_gen.pth",
        },
    }
    for model in model_files.values():
        url = model.get("url")
        filename = model.get("filename")
        file_path = "models/" + filename
        if isfile(file_path):
            logger.info("Weight " + filename + " already exists, skipping")
            continue
        logger.info("Downloading weight " + filename + " please wait")
        response = requests.get(url, stream=True)
        response.raise_for_status()
        with open(file_path, "wb") as f:
            f.write(response.content)
            logger.info("Weight is downloaded sucessfully, you can check it in models folder")

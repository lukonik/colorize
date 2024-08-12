import io
from typing import Annotated, Union

from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from pydantic import conint, constr

from colorizer import get_colorizer, download_weights
from bucket import FileBucket, get_bucket, set_bucket
from dotenv import dotenv_values

set_bucket(FileBucket())

download_weights()

config = dotenv_values()
app = FastAPI()
origins = [config.get("CORS_URL")]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/colorize")
async def colorize_image(
    file: UploadFile,
    colorizerType: Annotated[str, Form(regex="^(stable|artistic)$")],
    renderFactor: Annotated[int, Form(ge=1, le=40)],
):
    colorizer = get_colorizer(colorizerType)
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    colorized = colorizer.plot_transformed_image_raw(
        image,
        render_factor=renderFactor,
    )

    image_format = image.format
    media_type = f"image/{image_format.lower()}"
    buf = io.BytesIO()
    colorized.save(buf, format=image_format)
    buf.seek(0)
    return StreamingResponse(buf, media_type=media_type)

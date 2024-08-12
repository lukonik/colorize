from fastai.core import *
from fastai.vision import *
from matplotlib.axes import Axes
from .filters import IFilter, MasterFilter, ColorizerFilter
from .generators import gen_inference_deep, gen_inference_wide
from PIL import Image
import yt_dlp as youtube_dl
from IPython import display as ipythondisplay
from IPython.display import HTML
from IPython.display import Image as ipythonimage
from PIL import Image as PILImage



class ModelImageVisualizer:
    def __init__(self, filter: IFilter, results_dir: str = None):
        self.filter = filter
        self.results_dir = None if results_dir is None else Path(results_dir)
        self.results_dir.mkdir(parents=True, exist_ok=True)

    def _clean_mem(self):
        torch.cuda.empty_cache()
        # gc.collect()

    def plot_transformed_image_raw(
        self,
        image: PIL.Image,
        render_factor: int = None,
    ) -> PILImage.Image:
        result = self.get_transformed_image_raw(
            image, render_factor, post_process=True
        )

        return result

    def get_transformed_image_raw(
        self,
        image: PIL.Image,
        render_factor: int = None,
        post_process: bool = True,
    ) -> Image:
        orig_image = image
        filtered_image = self.filter.filter(
            orig_image,
            orig_image,
            render_factor=render_factor,
            post_process=post_process,
        )

        return filtered_image


def get_image_colorizer(
    root_folder: Path = Path("./"), render_factor: int = 35, artistic: bool = True
) -> ModelImageVisualizer:
    if artistic:
        return get_artistic_image_colorizer(
            root_folder=root_folder, render_factor=render_factor
        )
    else:
        return get_stable_image_colorizer(
            root_folder=root_folder, render_factor=render_factor
        )


def get_stable_image_colorizer(
    root_folder: Path = Path("../"),
    weights_name: str = "ColorizeStable_gen",
    results_dir="result_images",
    render_factor: int = 35,
) -> ModelImageVisualizer:
    learn = gen_inference_wide(root_folder=root_folder, weights_name=weights_name)
    filtr = MasterFilter([ColorizerFilter(learn=learn)], render_factor=render_factor)
    vis = ModelImageVisualizer(filtr, results_dir=results_dir)
    return vis


def get_artistic_image_colorizer(
    root_folder: Path = Path("../"),
    weights_name: str = "ColorizeArtistic_gen",
    results_dir="result_images",
    render_factor: int = 35,
) -> ModelImageVisualizer:
    learn = gen_inference_deep(root_folder=root_folder, weights_name=weights_name)
    filtr = MasterFilter([ColorizerFilter(learn=learn)], render_factor=render_factor)
    vis = ModelImageVisualizer(filtr, results_dir=results_dir)
    return vis


 
import uuid
from PIL import Image as PILImage
from .BaseBucket import BaseBucket

class FileBucket(BaseBucket):
    def save_image(image:PILImage.Image)->str:
        name = uuid()
        image.save(name)
        return name

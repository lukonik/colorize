
from abc import ABC, abstractmethod
from PIL import Image as PILImage

class BaseBucket(ABC):

    @abstractmethod
    def save_image(image:PILImage.Image)->str:
        pass
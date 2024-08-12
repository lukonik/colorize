
from enum import Enum
from .BaseBucket import BaseBucket
from .FileBucket import FileBucket

bucket:BaseBucket = None


def set_bucket(buck:BaseBucket):
   global bucket
   bucket = buck

def get_bucket()->BaseBucket:
    if bucket is None:
        raise ValueError("call set_bucket at first to initialize bucket")
    return bucket
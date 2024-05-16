from pydantic import BaseModel
from enum import Enum


class ProgrammingLanguage(Enum):
    python = "python"
    java = "java"
    cpp = "cpp"
    js = "js"


class CodeRequest(BaseModel):
    language: ProgrammingLanguage
    code: str

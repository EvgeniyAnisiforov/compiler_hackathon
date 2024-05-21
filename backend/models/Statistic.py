from pydantic import BaseModel
from Compiler import ProgrammingLanguage


class Time(BaseModel):
    time_python: float = 0.0
    time_java: float = 0.0
    time_cpp: float = 0.0
    time_js: float = 0.0


class UpdateTimeRequest(BaseModel):
    language: ProgrammingLanguage
    time: float

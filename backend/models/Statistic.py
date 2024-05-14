from pydantic import BaseModel


class Time(BaseModel):
    time: float


class Ram(BaseModel):
    ram: float

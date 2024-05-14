from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    surname: str
    login: str
    password: str


class UserAuth(BaseModel):
    login: str
    password: str
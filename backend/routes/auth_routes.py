from fastapi import APIRouter, HTTPException, status
from backend.models.User import UserAuth, UserCreate
from db import CreateUser, CheckUser

router = APIRouter()


@router.post(
    "/register/",
    description="Метод регистрации",
    tags=["users"]
)
async def register(user: UserCreate):
    # Проверка существует ли уже пользователь
    if CreateUser(user.login, user.password, user.name, user.surname):
        return {"message": f"User {user.login} created successfully"}
    else:
        raise HTTPException(status_code=400, detail="Username already registered")


@router.post(
    "/login/",
    description="Метод авторизации",
    tags=["users"]
)
async def login(user: UserAuth):
    user_info = CheckUser(user.login, user.password)
    if user_info:
        return user_info
    else:
        raise HTTPException(status_code=401, detail="Incorrect username or password")

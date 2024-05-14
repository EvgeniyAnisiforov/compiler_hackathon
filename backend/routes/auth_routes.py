from fastapi import APIRouter, HTTPException, status
from backend.models.User import UserAuth, UserCreate

router = APIRouter()


async def get_user():
    return "user_test"


@router.post(
    "/register/",
    description="Метод регистрации",
    tags=["users"]
)
async def register(user: UserCreate):
    db_user = await get_user()
    # if db_user:
    #     raise HTTPException(status_code=400, detail="Username already registered")
    password = user.password  # В реальном приложении здесь должно быть хэширование пароля
    # await create_user(user.username, hashed_password)
    return {"message": f"User {db_user}-{password} created successfully"}


@router.post(
    "/login/",
    description="Метод авторизации",
    tags=["users"]
)
async def login(user: UserAuth):
    # db_user = await get_user(user.username)
    # if not db_user or db_user['hashed_password'] != user.password:
    #     return {"message": "Incorrect username or password"}
    if user.login == "user" and user.password == "pass":
        return {"message": "ok"}
    else:
        return {"message": "no"}

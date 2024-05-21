from fastapi import APIRouter, HTTPException
from backend.models.Statistic import Time, UpdateTimeRequest
from backend.services.Statistic import Statistic
from db import SetAtrb
from models import CodeRequest

router = APIRouter()
statistic = Statistic()


@router.get(
    "/time/{user_id}",
    description="Метод получения времени",
    tags=["statistics"],
    response_model=Time
)
async def get_time(user_id: int):
    result = statistic.time_stat(user_id)
    if not result:
        raise HTTPException(status_code=404, detail="User not found or no time data available")
    return result


@router.post("/get_time/{user_id}")
async def update_time(user_id: int, update_request: UpdateTimeRequest):
    update_result = statistic.update_time(user_id=user_id, lang=update_request.language.value,
                                          time=update_request.time)
    if not update_result:
        raise HTTPException(status_code=404, detail="User not found or update failed")
    return update_result


@router.get(
    "/get_code/{user_id}",
    description="Показывает последний код",
    tags=["code"],
    response_model=CodeRequest
)
async def get_code(user_id: int):
    result = statistic.get_code(user_id)
    if not result:
        raise HTTPException(status_code=404, detail="User not found or no code data available")
    return result


@router.post(
    "/update_code/{user_id}",
    description="Обновляет последний код",
    tags=["code"],
)
async def update_code(user_id: int, update_request: CodeRequest):
    success = statistic.update_code(user_id, update_request.language.value, update_request.code)
    if not success:
        raise HTTPException(status_code=404, detail="User not found or update failed")
    return {"message": "Code updated successfully"}

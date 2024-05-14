from fastapi import APIRouter, HTTPException
from backend.models.Statistic import Time, Ram
from backend.services.Statistic import Statistic

router = APIRouter()
statistic = Statistic()


@router.get(
    "/time/{time}",
    description="Метод получения времени",
    tags=["statistics"],
    response_model=Time
)
async def get_time(user_id: int):
    result = statistic.time_stat(user_id)
    if result["status"] == "error":
        raise HTTPException(status_code=400, detail=result["message"])
    return Time(time=result["output"])


@router.get(
    "/RAM",
    description="Метод получения RAM",
    tags=["statistics"],
    response_model=Ram
)
async def get_ram(user_id: int):
    result = statistic.ram_stat(user_id)
    if result["status"] == "error":
        raise HTTPException(status_code=400, detail=result["message"])
    return Ram(ram=result["output"])

import pytest
from db import delete_user_from_db_by_login
from main import app
from httpx import AsyncClient

BASE_URL = "http://localhost:8000/api"


@pytest.mark.asyncio
async def test_user_registration():
    async with AsyncClient(app=app, base_url=BASE_URL) as ac:
        response = await ac.post("/users/register/",
                                 json={"login": "newuser", "password": "newpass", "name": "New", "surname": "User"})
        assert response.status_code == 200
        assert "User newuser created successfully" in response.json()['message']


@pytest.mark.asyncio
async def test_user_login():
    async with AsyncClient(app=app, base_url=BASE_URL) as ac:
        response = await ac.post("/users/login/", json={"login": "test1", "password": "test2"})
        assert response.status_code == 200
        assert "name" in response.json() and response.json()['name'] == 'testn'


@pytest.mark.asyncio
async def test_get_time():
    async with AsyncClient(app=app, base_url=BASE_URL) as ac:
        response = await ac.get("/statistic/get_time/5")
        assert response.status_code == 200
        assert response.json() == {"time_python": 5.0, "time_java": 5.5, "time_cpp": 0.0, "time_js": 0.0}


@pytest.mark.asyncio
async def test_update_time():
    async with AsyncClient(app=app, base_url=BASE_URL) as ac:
        response = await ac.put("/statistic/update_time/5", json={"language": "java", "time": 5.5})
        assert response.status_code == 200
        assert response.json() == {
            "message": "Time updated successfully",
            "user_id": 5,
            "time": {
                "time_java": 5.5
            }
        }


@pytest.mark.asyncio
async def test_get_code():
    async with AsyncClient(app=app, base_url=BASE_URL) as ac:
        response = await ac.get("/statistic/get_code/5")
        assert response.status_code == 200
        assert response.json() == {"language": "python", "code": "updated string"}


@pytest.mark.asyncio
async def test_update_code():
    async with AsyncClient(app=app, base_url=BASE_URL) as ac:
        response = await ac.put("/statistic/update_code/5", json={"language": "python", "code": "updated string"})
        assert response.status_code == 200
        assert response.json() == {"message": "Code updated successfully"}
        delete_user_from_db_by_login(login="newuser")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.compiler_routes import router as compiler_router
from routes.auth_routes import router as auth_router
from routes.statistic_router import router as statistic_router

import uvicorn

app = FastAPI(
    openapi_tags=[
        {"name": "users", "description": "Operations with users"},
        {"name": "statistics", "description": "Operations with statistics"},
        {"name": "compiler", "description": "Operations with compiler"},
    ],
    root_path='/api'
)

# Настройка CORS
origins = [
    "http://localhost:5173", # Домен вашего фронтенда
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(compiler_router, prefix="/compile")
app.include_router(auth_router, prefix="/users")
app.include_router(statistic_router, prefix="/statistic")

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True, log_level="info")



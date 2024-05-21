from fastapi import FastAPI
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

app.include_router(compiler_router, prefix="/compile")
app.include_router(auth_router, prefix="/users")
app.include_router(statistic_router, prefix="/statistic")

if __name__ == "__main__":
    # @app.on_event("startup")
    # async def startup():
    #     await database.connect()
    # @app.on_event("shutdown")
    # async def shutdown():
    #     await database.disconnect()
    uvicorn.run("main:app", host="localhost", port=8000, reload=True, log_level="info")

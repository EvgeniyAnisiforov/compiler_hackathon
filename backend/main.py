from fastapi import FastAPI
from routes.compiler_routes import router as compiler_router
from routes.auth_routes import router as user_router
import uvicorn

app = FastAPI()

app.include_router(compiler_router, prefix="/compile")
app.include_router(user_router, prefix="/users")

if __name__ == "__main__":
    # @app.on_event("startup")
    # async def startup():
    #     await database.connect()
    # @app.on_event("shutdown")
    # async def shutdown():
    #     await database.disconnect()
    uvicorn.run(app, host="localhost", port=8000, reload=False)
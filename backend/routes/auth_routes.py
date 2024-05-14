from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
# from ..models.User import UserCreate, Token, TokenData
# from db.database import create_user, get_db, get_user_by_username
# from security import authenticate_user, create_access_token

router = APIRouter()
#
# @router.post("/register/", response_model=UserCreate)
# def register_user(user: UserCreate, db: Session = Depends(get_db)):
#     db_user = create_user(db, user)
#     if db_user:
#         return db_user
#     raise HTTPException(status_code=400, detail="Error registering user")
#
# @router.post("/token/", response_model=Token)
# def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     user = authenticate_user(db, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token = create_access_token(data={"sub": user.username})
#     return {"access_token": access_token, "token_type": "bearer"}
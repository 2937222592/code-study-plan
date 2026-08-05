from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/auth", tags=["auth"])


class RegisterIn(BaseModel):
    email: EmailStr
    password: str
    nickname: str = ""


class LoginIn(BaseModel):
    email: EmailStr
    password: str


@router.post("/register")
def register(body: RegisterIn):
    # TODO(M1): 创建用户、密码哈希（bcrypt）、返回 JWT
    return {"message": "register 占位，M1 实现"}


@router.post("/login")
def login(body: LoginIn):
    # TODO(M1): 校验密码、签发 JWT
    return {"message": "login 占位，M1 实现"}
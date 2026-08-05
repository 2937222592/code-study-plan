from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.core.security import create_access_token, hash_password, verify_password
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import RegisterIn, LoginIn, AuthOut, UserOut
from app.schemas.common import ApiResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=ApiResponse[AuthOut])
def register(body: RegisterIn, db: Session = Depends(get_db)):
    exists = db.scalar(select(User).where(User.email == body.email))
    if exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="该邮箱已注册")
    nickname = body.nickname or body.email.split("@")[0]
    user = User(email=body.email, password_hash=hash_password(body.password), nickname=nickname)
    db.add(user)
    db.commit()
    db.refresh(user)
    return ApiResponse(
        data=AuthOut(token=create_access_token(user.id), user=UserOut.model_validate(user))
    )


@router.post("/login", response_model=ApiResponse[AuthOut])
def login(body: LoginIn, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == body.email))
    if not user or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="邮箱或密码错误")
    if user.is_disabled:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="账号已被禁用")
    return ApiResponse(
        data=AuthOut(token=create_access_token(user.id), user=UserOut.model_validate(user))
    )


@router.get("/me", response_model=ApiResponse[UserOut])
def me(current: User = Depends(get_current_user)):
    return ApiResponse(data=UserOut.model_validate(current))
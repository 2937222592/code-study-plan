from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)


def get_current_user(token: str | None = Depends(oauth2_scheme)):
    # TODO(M1): JWT 解析 + 用户查询
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="认证未实现（M1）")
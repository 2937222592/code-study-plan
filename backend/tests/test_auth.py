from fastapi.testclient import TestClient
from app.main import app

EMAIL = "tester@techpath.cn"
PASSWORD = "12345678"


def test_register_login_me_flow():
    with TestClient(app) as client:
        # 注册
        r = client.post("/api/auth/register", json={"email": EMAIL, "password": PASSWORD, "nickname": "测试"})
        assert r.status_code == 200
        data = r.json()["data"]
        assert data["token"]
        assert data["user"]["email"] == EMAIL
        assert data["user"]["nickname"] == "测试"

        # 重复注册 -> 409
        r2 = client.post("/api/auth/register", json={"email": EMAIL, "password": PASSWORD})
        assert r2.status_code == 409

        # 登录
        r3 = client.post("/api/auth/login", json={"email": EMAIL, "password": PASSWORD})
        assert r3.status_code == 200
        token = r3.json()["data"]["token"]

        # 密码错误 -> 401
        r4 = client.post("/api/auth/login", json={"email": EMAIL, "password": "wrongpass1"})
        assert r4.status_code == 401

        # 密码太短 -> 422（Pydantic 校验）
        r4b = client.post("/api/auth/register", json={"email": "x@y.cn", "password": "short"})
        assert r4b.status_code == 422

        # me（带 token）
        r5 = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert r5.status_code == 200
        assert r5.json()["data"]["email"] == EMAIL

        # me（无 token）-> 401
        r6 = client.get("/api/auth/me")
        assert r6.status_code == 401
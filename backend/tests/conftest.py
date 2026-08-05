import os
import tempfile

# 必须在导入 app 之前设置，保证每个测试进程使用独立数据库
os.environ["DATABASE_URL"] = "sqlite:///" + tempfile.mktemp(suffix=".db")

import pytest
from app.db.base import Base
from app.db.session import engine
from app.models import User  # noqa: F401  注册模型


@pytest.fixture(autouse=True)
def _clean_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)
"""AI 助教服务：LangChain 封装（全项目 AI 调用只发生在这里）"""
from functools import lru_cache
from app.core.config import settings


class AIService:
    def __init__(self):
        self._llm = None

    def _get_llm(self):
        if self._llm is None:
            from langchain_deepseek import ChatDeepSeek  # 懒加载，无依赖也能启动应用
            self._llm = ChatDeepSeek(
                model=settings.ai_model,
                api_key=settings.ai_api_key or "sk-no-key",
                base_url=settings.ai_base_url,
                temperature=0.3,
            )
        return self._llm

    async def tutor(self, question: str, context: dict | None = None):
        """学习助教答疑（上下文问答）。开发期无 Key 时走 mock。"""
        if settings.ai_mock or not settings.ai_api_key:
            return "【Mock】AI 助教已就绪：课程内上下文答疑将在 M4 接入真实模型。"
        from langchain_core.prompts import ChatPromptTemplate
        from langchain_core.output_parsers import StrOutputParser

        prompt = ChatPromptTemplate.from_messages(
            [("system", "你是 TechPath 学习助教，用初学者能懂的语言回答，优先给类比。"), ("human", "{question}")]
        )
        chain = prompt | self._get_llm() | StrOutputParser()
        return await chain.ainvoke({"question": question})


@lru_cache
def get_ai_service() -> AIService:
    return AIService()


ai_service = get_ai_service()
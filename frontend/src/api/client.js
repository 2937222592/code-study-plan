import { MOCK_ROUTES } from './mock'

const MOCK = import.meta.env.VITE_API_MOCK !== 'false'
const AUTH_REAL = import.meta.env.VITE_AUTH_REAL === 'true' // 注册/登录已接入真实后端
const BASE = import.meta.env.VITE_API_BASE || '/api'
const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export async function request(path, { method = 'GET', body } = {}) {
  const useMock = MOCK && !(AUTH_REAL && path.startsWith('/auth/'))
  if (useMock) {
    await delay(160)
    const key = `${method} ${path}`
    const handler = MOCK_ROUTES[key] ?? MOCK_ROUTES[path]
    if (handler === undefined) throw new Error(`Mock 未定义：${key}`)
    return typeof handler === 'function' ? handler(body ?? {}) : JSON.parse(JSON.stringify(handler))
  }
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json()
  if (json.code !== 0) throw new Error(json.message || '请求失败')
  return json.data
}
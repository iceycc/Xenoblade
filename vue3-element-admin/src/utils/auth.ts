const tokenKey = 'V3-Admin-Token'

export const getToken = (): string | null => {
  return localStorage.getItem(tokenKey)
}

export const setToken = (token: string): void => {
  return localStorage.setItem(tokenKey, token)
}

export const removeToken = (): void => {
  return localStorage.removeItem(tokenKey)
}

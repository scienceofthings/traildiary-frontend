const tokenKey = 'jwt'

export const getToken = (): string | null => {
    return localStorage.getItem(tokenKey)
}

export const purgeToken = (): void => {
    localStorage.removeItem(tokenKey)
}

export const getRefreshToken = () => localStorage.getItem('refreshToken')
export const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem('refreshToken', refreshToken)
}
export const removeRefreshToken = () => {
    localStorage.removeItem('refreshToken')
}

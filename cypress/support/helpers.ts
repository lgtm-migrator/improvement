export const createRandomUser = (): { username: string; password: string } => {
    const random = Math.round(Math.random() * 100000).toString()
    const username = `testuser_${random}`
    const password = `password_${random}`

    return { username, password }
}

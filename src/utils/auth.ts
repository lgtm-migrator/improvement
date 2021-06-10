type headersConfig = {
    headers: {
        'Content-Type': string
        Authorization: string
    }
}

export const headersConfigWithToken = (accessToken: string): headersConfig => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    }

    return config
}

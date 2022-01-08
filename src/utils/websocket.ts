type HandleWsAuth = {
    sendMessage: (message: string) => void
    authToken: string
}

export const handleWebsocketAuth = ({ sendMessage, authToken }: HandleWsAuth) =>
    sendMessage(
        JSON.stringify({
            type: 'authenticate',
            data: authToken,
        })
    )

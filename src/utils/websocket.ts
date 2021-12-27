type HandleWsAuth = {
    sendMessage: (message: string) => void
}

export const handleWebsocketAuth = ({ sendMessage }: HandleWsAuth) =>
    sendMessage(
        JSON.stringify({
            type: 'authenticate',
            data: localStorage.getItem('accessToken'),
        })
    )

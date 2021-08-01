/* eslint-disable camelcase */
import { UserDbBase } from '../client/generatedApiClient'

export type User = {
    user_uuid: string
    username: string
    email?: string
    is_active: boolean
    created_at: string
    updated_at: string
    imageUrl?: string
}

export type UserState = {
    isAuthenticated: boolean
    user: UserDbBase
}

export type ProfileMenuItemsType = {
    user: UserDbBase
    userNavigation: { name: string; href: string }[]
}

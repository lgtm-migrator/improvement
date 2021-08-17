/* eslint-disable camelcase */
import { User } from 'client/improvementApiClient.generated'

export type ProfileMenuItemsType = {
    user: User
    userNavigation: { name: string; href: string }[]
}

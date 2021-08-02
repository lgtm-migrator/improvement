/* eslint-disable camelcase */
import { UserDbBase } from 'client/improvementApiClient.generated'

export type ProfileMenuItemsType = {
    user: UserDbBase
    userNavigation: { name: string; href: string }[]
}

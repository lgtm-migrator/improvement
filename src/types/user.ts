import { User } from 'client/codegen/generatedApi'

export type ProfileMenuItemsType = {
    user: User
    userNavigation: { name: string; href: string }[]
}

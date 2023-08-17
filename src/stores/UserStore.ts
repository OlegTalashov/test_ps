import { UserAvatarI, UserI } from '@/interfaces/UserManagementI'
import { createPinia, defineStore } from 'pinia'

interface UserStoreI {
    users: Record<number, UserI>,
    user_avatars: Record<number, UserAvatarI>
    modal_create_user_displayed: boolean,
    edit_avatar_id: number,
    edit_user_id: number,
}

export const useUserStore = defineStore({
    id: 'userStore',
    state: (): UserStoreI => ({
        users: {},
        user_avatars: {},
        modal_create_user_displayed: false,
        edit_avatar_id: 0,
        edit_user_id: 0,
    }),
})

const store = createPinia()

export default store;

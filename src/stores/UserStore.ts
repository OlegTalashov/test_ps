import { UserI } from '@/interfaces/UserManagementI'
import { createPinia, defineStore } from 'pinia'

interface UserStoreI {
    users: Record<number, UserI>,
    modal_create_user_displayed: boolean,
    edit_user_id: number,
}

export const useUserStore = defineStore({
    id: 'userStore',
    state: (): UserStoreI => ({
        users: {},
        modal_create_user_displayed: false,
        edit_user_id: 0,
    }),
})

const store = createPinia()

export default store;

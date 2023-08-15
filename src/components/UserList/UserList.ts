import { useUserStore } from "@/stores/UserStore";
import { defineComponent, reactive, computed, ref } from "vue";

export default defineComponent({
    setup() {
        const userStore = useUserStore();

        const state = reactive({
            bShowSecondName: false,
        });

        const listUsers = computed(() => {
            return userStore.users;
        });

        function fOpenModalCreateUser() {
            userStore.modal_create_user_displayed = true;
        }

        function fEditUser(idUser: number){
            userStore.edit_user_id = idUser;
            fOpenModalCreateUser();
        }

        function fDeleteUser(idUser: number){
            delete userStore.users[idUser];
        }

        return {
            userStore,
            state,
            fOpenModalCreateUser,
            fEditUser,
            fDeleteUser
        };
    }
});
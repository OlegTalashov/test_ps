<template>
    <main class="page">
        <div class="content">
            <UserList class="user-list" />
            <ModalCreateUser v-if="userStore.modal_create_user_displayed" />
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from './stores/UserStore';
import UserList from './components/UserList/UserList.vue';
import ModalCreateUser from './components/ModalCreateUser/ModalCreateUser.vue'

export default defineComponent({
    name: 'App',
    components: {
        UserList,
        ModalCreateUser,
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    }
});
</script>

<style lang="scss" scoped>
    .page{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        .content {
            width: 100%;
            max-width: 1080px;
            margin: 0 auto;
        }
    }
    .user-list{
        margin-top: 40px;
    }
</style>

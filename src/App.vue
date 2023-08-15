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
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        .content {
            width: 100%;
            max-width: 1080px;
            margin: 0 auto;
            position: relative;
        }
    }
    .user-list{
        position: relative;
        margin-top: 40px;
    }
</style>

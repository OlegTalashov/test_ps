<template>
    <main class="page">
        <div class="content">
            <UserList class="user-list" />
            <transition name="fade">
                <ModalCreateUser v-if="userStore.modal_create_user_displayed" />
            </transition>
            <transition name="fade">
                <ModalEditAvatar v-if="userStore.edit_avatar_id"/>
            </transition>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from './stores/UserStore';
import UserList from './components/UserList/UserList.vue';
import ModalCreateUser from './components/ModalCreateUser/ModalCreateUser.vue'
import ModalEditAvatar from './components/ModalEditAvatar/ModalEditAvatar.vue'

export default defineComponent({
    name: 'App',
    components: {
        UserList,
        ModalCreateUser,
        ModalEditAvatar
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
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>

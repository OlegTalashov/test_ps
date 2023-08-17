<template>
    <main class="page">
        <div class="content">
            <div class="tabs">
                <span class="title">Задание:&nbsp;</span>
                <span class="tab" @click="state.bShowFirstTask = true" :class="{ 'active': state.bShowFirstTask }">
                    1
                </span>
                <span>&nbsp;/&nbsp;</span>
                <span class="tab" @click="state.bShowFirstTask = false" :class="{ 'active': !state.bShowFirstTask }">
                    2
                </span>
            </div>
            <div class="page-one" v-if="state.bShowFirstTask">
                <UserList class="user-list" />
                <transition name="fade">
                    <ModalCreateUser v-if="userStore.modal_create_user_displayed" />
                </transition>
                <transition name="fade">
                    <ModalEditAvatar v-if="userStore.edit_avatar_id"/>
                </transition>
            </div>
            <div v-else>
                <TextareaComponent
                    class="textarea-comp"
                    label="Custom textarea"
                    :value="state.sTextareaValue"
                    @update:value="state.sTextareaValue = $event"
                    display_icon
                />
                <br>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useUserStore } from './stores/UserStore';
import UserList from './components/UserList/UserList.vue';
import ModalCreateUser from './components/ModalCreateUser/ModalCreateUser.vue'
import ModalEditAvatar from './components/ModalEditAvatar/ModalEditAvatar.vue'
import TextareaComponent from './components/TextareaComponent/TextareaComponent.vue'

export default defineComponent({
    name: 'App',
    components: {
        UserList,
        ModalCreateUser,
        ModalEditAvatar,
        TextareaComponent,
    },
    setup() {
        const userStore = useUserStore();
        const state = reactive({
            bShowFirstTask: true,
            sTextareaValue: '',
        });
        return {
            userStore,
            state
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
        .page-one{
            position: relative;
            width: 100%;
            height: 100%;
        }
    }
    .tabs{
        
        display: flex;
        justify-content: end;
        padding: 5px;
        font-size: 14px;
        margin-top: 40px;
        user-select: none;
        .title{
            color: #0f4fca;
            cursor: auto;
        }
        
        .tab{
            width: 17px;
            text-align: center;
            cursor: pointer;
            color: gray;
            &:hover{
                color: #2c68d6;
            }
        }
        .active{
            color: #0f4fca;
        }
    }
    .user-list{
        position: relative;
    }
    .textarea-comp{
        position: relative;
        width: 600px;
        height: 120px;
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

<style>
    * {
        box-sizing: border-box;
    }
</style>

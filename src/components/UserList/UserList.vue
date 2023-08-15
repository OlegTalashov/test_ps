<script lang="ts" src="./UserList.ts"></script>

<template>
    <div>
        <div class="filters">
            <button @click="fOpenModalCreateUser" class="btn-add-user">
                Добавить пользователя
            </button>
            <div class="check-container">
                <input v-model="state.bShowSecondName" type="checkbox" id="secondName" name="scales" />
                <label for="secondName">Показывать фамилии</label>
            </div>
        </div>
        <ul class="list-users">
            <li v-for="(user, idx) in userStore.users" :key="idx" class="one-row">
                {{ user }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .filters {
        padding: 10px;
        display: inline-flex;
        width: 100%;
        background-color: #e3f8ff;

        .btn-add-user{
            padding: 10px;
            font-size: 18px;
            border: none;
            color: #fff;
            background: #0f4fca;
            border-radius: 4px;
            cursor: pointer;
            &:hover{
                background-color: #2a65d3;
            }
        }
        .check-container{
            margin: auto 20px;
            font-size: 16px;
            color: #0f4fca;
            accent-color: #0f4fca;
        }
    }
</style>
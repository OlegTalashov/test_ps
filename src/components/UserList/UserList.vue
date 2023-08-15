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
            <li v-for="user in userStore.users" :key="user.id" class="one-row">
                <div class="name-field">
                    <span>{{ user.first_name }}</span>
                    <span v-if="state.bShowSecondName">&nbsp;{{ user.second_name }}</span>
                </div>
                <div class="btn-container">
                    <button @click="fEditUser(user.id)" class="btn">
                        <i class="icon icon-edit" />
                    </button>
                    <button @click="fDeleteUser(user.id)" class="btn">
                        <i class="icon icon-trash" />
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .filters {
        padding: 10px;
        display: inline-flex;
        background-color: #e3f8ff;
        position: relative;
        width: -moz-available;

        @media(max-width: 512px){
            flex-direction: column;
        }

        .btn-add-user{
            padding: 10px;
            font-size: 18px;
            border: none;
            color: #fff;
            background: #0f4fca;
            border-radius: 4px;
            cursor: pointer;
            max-width: 300px;
            &:hover{
                background-color: #2a65d3;
            }
            @media(max-width: 512px){
                align-self: center;
                margin-bottom: 16px;
            }
        }
        .check-container{
            margin: auto 20px;
            font-size: 16px;
            color: #0f4fca;
            accent-color: #0f4fca;
            @media(max-width: 512px){
                text-align: center;
            }
        }
    }
    .list-users{
        display: flex;
        flex-direction: column;
        .one-row{
            display: inline-flex;
            flex-wrap: nowrap;
            border-bottom: 1px solid #d9d9d9;
            padding: 10px 0;
            min-height: 30px;
        }
        .name-field{
            font-size: 18px;
            margin: auto 0;
        }
        .btn-container{
            display: inline-flex;
            flex-wrap: nowrap;
            width: 60px;
            margin-left: auto;
            justify-content: space-evenly;
            .btn{
                height: fit-content;
                width: fit-content;
                background: none;
                cursor: pointer;
                border: none;
                padding: 0;
                margin: auto;
            }
            .icon{
                display: block;
                background-size: cover;
                height: 24px;
                width: 24px;
                &-edit{
                    background-image: url('../../assets/icons/edit.svg');
                }
                &-trash{
                    background-image: url('../../assets/icons/trash.svg');
                }
                &:hover{
                    height: 26px;
                    width: 26px;
                }
            }

        }

    }
</style>
<script lang="ts" src="./ModalCreateUser.ts"></script>

<template>
    <div @click.stop="fCloseModal" class="modal-wrapper">
        <div @click.stop class="modal-body">
            <div class="modal-header">
                <button @click.stop="fCloseModal" class="btn btn-close">
                    <i class="icon-close" />
                </button>
                <p class="modal-title">{{ `${bEditMode ? 'Редактировать' : 'Добавить'} пользователя` }}</p>
            </div>
            <div class="modal-content">
                <div class="input-row">
                    <input 
                        v-model="state.user.second_name"
                        @keydown.enter="fNextField('inputFirstName')"
                        @focus="fSelectOnFocus"
                        @blur="fValidateText(state.user.second_name, InputT.second_name)"
                        @input="
                            state.validation_fields[InputT.second_name] === false 
                            ? fValidateText(state.user.second_name, InputT.second_name)
                            : null
                        "
                        :class="{'has-error': state.validation_fields[InputT.second_name] === false }"
                        class="input-field"
                        ref="inputSecondName"
                        placeholder="Фамилия"
                        type="text"
                        >
                    <div v-if="state.validation_fields[InputT.second_name] === false" class="error">
                        Некорректрое значение
                    </div>
                </div>
                <div class="input-row">
                    <input 
                        v-model="state.user.first_name"
                        @focus="fSelectOnFocus"
                        @keydown.enter="fNextField('inputRole')"
                        @blur="fValidateText(state.user.first_name, InputT.first_name)"
                        @input="
                            state.validation_fields[InputT.first_name] === false
                            || (state.user.first_name.length > 3 )
                            ? fValidateText(state.user.first_name, InputT.first_name)
                            : null
                        "
                        :class="{'has-error': state.validation_fields[InputT.first_name] === false }"
                        class="input-field" 
                        ref="inputFirstName"
                        placeholder="Имя"
                        type="text"
                    >
                    <div v-if="state.validation_fields[InputT.first_name] === false" class="error">
                        Некорректрое значение
                    </div>
                </div>
                <div class="input-row">
                    <select 
                        v-model="state.user.role"
                        @focus="fOpenSelect($event)"
                        @change="fNextField('inputNumber')"
                        class="input-field"
                        ref="inputRole"
                        placeholder="Должность"
                    >
                        <option :value="RoleT.employee">
                            <span>{{ RoleRusT.employee }}</span>
                        </option>
                        <option :value="RoleT.manager">
                            <span>{{ RoleRusT.manager }}</span>
                        </option>
                    </select>
                </div>
                <div v-if="state.user.role === RoleT.manager" class="input-row">
                    <input
                        v-model="state.phone_masked"
                        @blur="fValidateNumber"
                        @input="
                            state.validation_fields[InputT.phone_number] === false 
                            ? fValidateNumber
                            : null
                        "
                        :class="{'has-error': state.validation_fields[InputT.phone_number] === false }"
                        class="input-field"
                        ref="inputNumber"
                        v-maska data-maska="+7 (###) ### ####"
                        placeholder="+7 (***) *** ****"
                    >
                    <div v-if="state.validation_fields[InputT.phone_number] === false" class="error">
                        Некорректрое значение
                    </div>
                </div>
                <button
                    @click="fSaveUser"
                    class="btn-confirm"
                    :class="{
                        'btn-confirm-disabled': !bAllFieldsValid
                    }" 
                    :disabled="!bAllFieldsValid"
                >
                    {{ bEditMode ? 'Изменить' : 'Создать' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .modal-wrapper{
        width: 100vw;
        height: 100vh;
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        .modal-body{
            margin: auto;
            background-color: #ffffff;
            min-width: 320px;
            min-height: 320px;
            border-radius: 4px;
        }
        .modal-header{
            position: relative;
            text-align: center;
            min-height: 50px;
            display: flex;
            .modal-title{
                font-size: 18px;
                margin: auto;
            }
        }
        .modal-content{
            display: flex;
            position: relative;
            flex-direction: column;

            .input-row{
                width: 100%;
                display: flex;
                position: relative;
                .error{
                    background: #ffffff;
                    color: red;
                    font-size: 12px;
                    position: absolute;
                    right: 25px;
                    padding: 3px;
                    pointer-events: none;
                }
            }

            .input-field{
                width: 100%;
                font-size: 16px;
                padding: 10px;
                margin: 10px;
                accent-color: #0f4fca;
                background-color: #ffffff;
                border-radius: 4px;
                border: black 1px solid;
            }
            .has-error{
                border-color: red;
                &:focus{
                    outline-color: red;
                }
            }
        }
        .btn{
            height: fit-content;
            width: fit-content;
            background: none;
            cursor: pointer;
            border: none;
            padding: 0;
        }
        .btn-confirm{
            margin: 10px 10px 10px auto;
            font-size: 18px;
            color: #ffffff;
            background-color: #0f4fca;
            border: none;
            border-radius: 4px;
            padding: 10px;
            cursor: pointer;
            user-select: none;
            &:hover{
                background-color: #2a65d3;
            }
            &-disabled{
                background-color: #6692e4;
                &:hover{
                    background-color: #6692e4;
                }
            }
        }
        .btn-close{
            position: absolute;
            right: 10px;
            top: 10px;
        }
        .icon-close{
            display: block;
            background-size: cover;
            height: 24px;
            width: 24px;
            background-image: url('../../assets/icons/close.svg');
        }
    }
</style>

<style>
    .disable-scroll{
        height: 100%;
        overflow: hidden;
    }
</style>
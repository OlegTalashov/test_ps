<script lang="ts" src="./ModalCreateUser.ts"></script>

<template>
    <div @click.stop="fCloseModal" class="modal-wrapper">
        <div @click.stop class="modal-body">
            <div class="modal-header">
                <button @click.stop="fCloseModal" class="btn btn-close">
                    <i class="icon-close" />
                </button>
                <p class="modal-title">{{ `${bEditMode ? 'Редактировать' : 'Добавить'}` }}<br> пользователя </p>
            </div>
            <div class="modal-content">
                <div class="avatar-container">
                    <input
                        @change="fUploadImage($event)"
                        title="Загрузить изображение"
                        id="input-image"
                        class="input-image"
                        accept="image/*"
                        type="file"
                    >
                    <label for="input-image"
                        v-if="!state.user.avatar_img_id"
                        class="avatar avatar-plug"
                    >
                        <i class="edit-icon" />
                    </label>
                    <div
                        v-else
                        @click="fOpenModalEditImg"
                        :style="{
                            'background-image': `url(${
                                userStore.user_avatars[state.user.avatar_img_id].img_sm_url
                                ?? userStore.user_avatars[state.user.avatar_img_id].img_url
                            })`
                        }"
                        :src="userStore.user_avatars[state.user.avatar_img_id].img_url"
                        class="avatar"
                    >
                        <i class="edit-icon" />
                    </div>
                    
                </div>
                <div class="input-row">
                    <input 
                        v-model="state.user.first_name"
                        @focus="fSelectOnFocus"
                        @keydown.enter="fNextField('inputSecondName')"
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
                    <input 
                        v-model="state.user.second_name"
                        @keydown.enter="fNextField('inputRole')"
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
                    <select 
                        v-model="state.user.role"
                        @focus="fOpenSelect($event)"
                        @change="fNextField('inputNumber')"
                        :disabled="bEditMode"
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
            cursor: auto;
            margin: auto;
            background-color: #ffffff;
            min-width: 320px;
            min-height: 320px;
            border-radius: 4px;
        }
        .modal-header{
            position: relative;
            text-align: center;
            min-height: 65px;
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

            .avatar-container{
                width: 100%;
                display: flex;
                height: 98px;
                .input-image{
                    display: none;
                }
                .avatar{
                    cursor: pointer;
                    overflow: visible;
                    position: relative;
                    height: 80px;
                    width: 80px;
                    margin: 8px auto;
                    border: 1px solid #2a64d5;
                    box-shadow: inset 0 0 10px #134197;
                    border-radius: 50%;
                    background-size: cover;
                    &:hover{
                        box-shadow: inset 0 0 20px #134197;
                    }&-plug{
                        background-image: url('../../assets/images/avatar-plug.png');
                    }
                }
                .edit-icon{
                    display: block;
                    height: 40px;
                    width: 40px;
                    position: absolute;
                    right: -10px;
                    top: 40px;
                    background-image: url('../../assets/icons/edit.svg');
                    background-size: contain;
                    opacity: 0.9;
                }
            }

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
                accent-color: red !important;

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
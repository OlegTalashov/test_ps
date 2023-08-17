<script lang="ts" src="./ModalEditAvatar.ts"></script>

<template>
    <div class="ModalEditAvatar">
        <div @click.stop="fCloseModal" class="modal-wrapper">
            <div @click.stop class="modal-body">
                <div
                    class="img-container"
                    ref="wrapper"
                    :style="{
                        height: state.visible_img_params.height ? `${state.visible_img_params.height}px` : 'fit-content',
                    }"
                >
                    <img class="image" ref="image" draggable="false" :src="state.image_local.img_url">
                    <div 
                        class="crop-border"
                        draggable="false"
                        :style="{
                            top: `${state.crop_position.y}px`,
                            left: `${state.crop_position.x}px`,
                            height: `${state.crop_size}px`,
                            width: `${state.crop_size}px`
                        }"
                    >
                        <div 
                            @mousedown="fStartMove"
                            @mousemove="fMove"
                            ref="elCrop"
                            class="crop-center"
                        />
                    </div>
                </div>
                <div class="footer">
                    <input
                        v-model="state.crop_size"
                        id="crop-size" 
                        class="range"
                        type="range"
                        step="5"
                        min="80"
                        :max="state.visible_img_params.height > state.visible_img_params.width
                            ? state.visible_img_params.width
                            : state.visible_img_params.height
                        "
                    >
                    {{ state.crop_size }}
                    <div class="buttons">
                        <input
                            @change="fUploadImage($event)"
                            title="Загрузить изображение"
                            id="input-new"
                            class="input-image"
                            accept="image/*"
                            type="file"
                        >
                        <label class="btn btn-input" for="input-new">Загрузить изображекние</label>
                        <button class="btn btn-save" @click="fCrop">Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ModalEditAvatar {
    .modal-wrapper {
        width: 100vw;
        height: 100vh;
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        .modal-body {
            cursor: auto;
            margin: auto;
            background-color: #ffffff;
            border-radius: 4px;
            padding: 10px;
        }
        .img-container{
            
            position: relative;
            overflow: hidden;
            .image{
                
                max-height: 80vh;
                max-width: 80vw;
                height: auto;
                width: auto;
                pointer-events: none;
                user-select: none;
            }
            .crop-border{
                position: absolute;
                overflow: hidden;
                overflow: auto;
                cursor: pointer;
                border: 2px solid rgb(0, 0, 0);
                padding: 20px;
                border-radius: 50%;
                box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
                user-select: none;
                

                .crop-center{
                    height: 100%;
                    width: 100%;
                    cursor: grab;
                }
            }
        }
        .buttons{
            display: flex;
        }
        .input-image{
            display: none;
        }
        .footer{
            
        }
        .range{
            min-width: 300px;
            padding: 10px 0;
        }
        .btn{
            font-size: 18px;
            border: none;
            border-radius: 4px;
            padding: 10px;
            cursor: pointer;
            user-select: none;

            &-input{
                background-color: #dab200;
                display: flex;
                align-items: center;
                
                max-height: 41px;
                margin: auto 0;
                &:hover{
                    background-color: #e7d52e;
                }
            }
            &-save{
                margin: 10px 10px 10px auto;
                color: #ffffff;
                background-color: #0f4fca;
                &:hover{
                    background-color: #2a65d3;
                }
            }
        }
    }
}
</style>
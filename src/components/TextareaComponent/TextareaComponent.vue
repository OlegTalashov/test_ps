<script lang="ts" src="./TextareaComponent.ts"></script>

<template>
    <div>
        <div class="textarea-container">
            <div class="textarea-body">
                <div v-if="display_icon" class="icon-container">
                    <i class="icon" :style="{
                        backgroundImage: src_icon ? `url(${src_icon})` : `url(${icon_default})`
                    }" />
                </div>
                <div class="input-box">
                    <textarea 
                        ref="elInput"
                        id="elInput"
                        :value="value"
                        @input="fUpdateValue($event)"
                        class="textaria-input"
                        :class="{ 'textaria-empty': !sInputValue.length }"
                    >
                    </textarea>
                    <label class="textarea-label" :class="{ 'label-empty': !sInputValue.length }" for="elInput">{{ label }}</label>
                    <div class="textarea-fade"></div>
                </div>
                <br>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.textarea-container {

    position: relative;
    display: flex;
    height: 100%;
    width: 100%;

    .icon-container {
        padding-top: 15px;
        width: 24px;
        margin-right: 15px;

        .icon {
            display: block;
            background-size: contain;
            height: 24px;
            width: 24px;
        }
    }

    .textarea-body {
        display: flex;
        width: 100%;
        height: 100%;

        .input-box {
            position: relative;
            height: 100%;
            width: 100%;
        }

        .textarea-fade {
            z-index: 90;
            position: absolute;
            top: 0;
            width: 100%;
            height: 40px;
            background: linear-gradient(to bottom,
                rgb(244, 244, 244) 0%,
                rgb(244, 244, 244) 60%,
                rgba(244, 244, 244, 0) 100%
            );
            transition: background-color 0.2s ease-in-out;
            border: none;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            pointer-events: none;
        }

        .textaria-input {
            z-index: 80;
            width: 100%;
            height: 100%;
            max-width: 100%;
            resize: vertical;
            min-height: 56px;
            padding: 30px 16px 5px 16px;
            border-style: solid;
            border-width: 0 0 1px 0;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            background-color: #f4f4f4;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            transition: background-color 0.2s ease-in-out;
            transition: border 0.1s ease-out;

            &:hover:not(:focus) {
                background-color: #eeeeee;
                border-bottom: 1px solid rgba(0, 0, 0, 1);
                background-size: 200% 100%;
                background-position: 0 100%;
                &~.textarea-fade{
                    background: linear-gradient(to bottom,
                        rgb(238, 238, 238) 0%,
                        rgb(238, 238, 238) 60%,
                        rgba(238, 238, 238, 0) 100%
                    );
                }
            }

            &:focus {
                outline: none;
                background-color: #dddddd;
                border-bottom: 2px solid rgb(0, 0, 0);
                background-position: 0 50%;
                &~.textarea-fade{
                    background: linear-gradient(to bottom,
                        rgb(221,221,221) 0%,
                        rgb(221,221,221) 60%,
                        rgba(221,221,221, 0) 100%
                    );
                }
            }

            &:focus+.textarea-label {
                color: #000000;
            }

            &:focus+.label-empty {
                color: #000000;
                font-size: 12px;
                margin: 0;
            }

            &+.label-empty {
                margin-top: 10px;
                font-size: 16px;
            }
        }

        .textarea-label {
            z-index: 100;
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 12px;
            color: #6e6e6e;
            transition: all .1s ease-in;
        }
    }
}
</style>
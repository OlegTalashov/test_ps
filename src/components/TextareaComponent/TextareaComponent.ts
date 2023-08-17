import { useUserStore } from "@/stores/UserStore";
import { defineComponent, reactive, computed, ref, toRefs, toRef } from "vue";

export default defineComponent({
    props: {
        value: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            required: false
        },
        display_icon: {
            type: Boolean,
            default: false,
        },
        src_icon: {
            type: String,
            required: false,
        },

    },
    emits: ['update:value'],
    data() {
        return {
            icon_default: require('../../assets/icons/edit.svg'),
        }
    },
    setup(props, { emit }) {
        const elInput = ref(null);
        const sInputValue = toRef(props, 'value');

        const state = reactive({
            props
        });

        const fUpdateValue = (e: Event) => {
            if (e) {
                const elInput = e.target as HTMLInputElement;
                emit('update:value', elInput.value)
            }
        }

        return {
            state,
            sInputValue,
            fUpdateValue,
        };
    }
});
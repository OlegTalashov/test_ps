import { UserI, UserRoleT, UserRoleRusT } from "@/interfaces/UserManagementI";
import { useUserStore } from "@/stores/UserStore";
import { computed, defineComponent, getCurrentInstance, onMounted, onUnmounted, reactive } from "vue";
import { vMaska } from "maska"

const vEmptyUser: UserI = {
    id: 0,
    first_name: '',
    second_name: '',
    role: UserRoleT.employee,
    phone_number: undefined,
};

enum InputTypesT {
    first_name = 'first_name',
    second_name = 'second_name',
    role ='role',
    phone_number = 'phone_number',
}

interface ModalCreateUserState {
    user: UserI,
    phone_masked: string,
    validation_fields: Record<string, boolean>,
}

export default defineComponent({
    directives: { maska: vMaska },
    setup(){
        const vm = getCurrentInstance()
        /** Хранилище Pinia */
        const userStore = useUserStore();
        const RoleT = UserRoleT;
        const RoleRusT = UserRoleRusT;
        const InputT = InputTypesT;
        const state: ModalCreateUserState = reactive({
            user: userStore.edit_user_id ? userStore.users[userStore.edit_user_id] : vEmptyUser,
            phone_masked: '',
            validation_fields: { role: true },
        });

        const bEditMode = computed<boolean>(() => Boolean(userStore.edit_user_id));
        const bAllFieldsValid = computed<boolean>(() => {
            let bFieldsValid = true;
            for (const key of Object.values(InputT)){
                console.log(key);
                
                const isValid = state.validation_fields[key];
                if (key === InputT.phone_number){
                    if (!isValid && state.user.role === UserRoleT.manager){
                        bFieldsValid = false;
                        console.log(key, 'invalid');

                        break
                    }
                } else if (!isValid){
                    bFieldsValid = false;
                    console.log(key, 'invalid');
                    break
                }
            }
            return bFieldsValid;
        });

        function fCloseModal(){
            userStore.edit_user_id = 0;
            userStore.modal_create_user_displayed = false;
        }

        function fSelectOnFocus(e: FocusEvent){
            const elTarget = e.target as HTMLInputElement;
            elTarget.select();
        }

        function fOpenSelect(e: FocusEvent){
            e.preventDefault()
            const elTarget = e.target as HTMLSelectElement;
            elTarget.click();
        }

        function fNextField(ref: string){
            if (vm){
                const elInput = vm.refs[ref] as HTMLInputElement;
                if (elInput){
                    elInput.focus();
                }
            }
        }

        function fValidateText(sText: string, sInputAlias: string){
            const reg = /^[a-zA-Zа-яА-Я]+$/;
            const sTextTrimmed = sText.trim();
            const isValid = reg.test(sTextTrimmed) && sTextTrimmed.length > 2;
            state.validation_fields[sInputAlias] = isValid;
        }

        function fValidateNumber(){
            const sPhoneNumberFiltered = state.phone_masked.replace(/[^0-9]/g, "");
            const nPhoneNumber = Number(sPhoneNumberFiltered);
            const isValidNumber = !isNaN(nPhoneNumber) && sPhoneNumberFiltered.length === 11;
            state.validation_fields[InputT.phone_number] = isValidNumber;
            if (isValidNumber){
                state.user.phone_number = nPhoneNumber;
            }
            return isValidNumber
        }

        function fSaveUser(){
            const isValidNumber = fValidateNumber();
            console.log(bAllFieldsValid.value);
            
            if (bAllFieldsValid.value){
                const vUser: UserI = state.user;
                if (bEditMode.value){
                    vUser.id = Object.values(userStore.users).length;
                }
                userStore.users[vUser.id] = vUser;
            }
        }

        onMounted(() => {
            /** Отключение скролла на времяпоказа модалки */
            document.body.classList.add('disable-scroll');
        })

        onUnmounted(() => {
            /** Возврат скролла */
            document.body.classList.remove('disable-scroll');
        })

        return {
            userStore,
            state,
            bEditMode,
            bAllFieldsValid,
            RoleT,
            RoleRusT,
            InputT,
            fCloseModal,
            fNextField,
            fSelectOnFocus,
            fOpenSelect,
            fValidateText,
            fValidateNumber,
            fSaveUser,
        };
    },
});
import { UserAvatarI } from "@/interfaces/UserManagementI";
import store, { useUserStore } from "@/stores/UserStore";
import { defineComponent, reactive, computed, getCurrentInstance, onMounted, onUnmounted } from "vue";

interface CropI {
    x: number,
    y: number,
    size: number
}

interface MousePointI {
    x: number,
    y: number,
}

interface ImgParamsI {
    width: number,
    height: number
}

interface ModalEditAvatarState {
    image_local: UserAvatarI,
    crop_position: CropI,
    visible_img_params: ImgParamsI,
    img_diff: number,
    start_move_point: MousePointI | null
    crop_element?: HTMLDivElement
}

export default defineComponent({
    setup() {
        const vm = getCurrentInstance();
        const userStore = useUserStore();
        const state: ModalEditAvatarState = reactive({
            image_local: { ...userStore.user_avatars[userStore.edit_avatar_id] },
            crop_position: {
                x: 0,
                y: 0,
                size: 200
            },
            visible_img_params: { height: 0, width: 0 },
            img_diff: 1,
            start_move_point: null,
        });

        function fCalcImgParams() {
            if (vm) {
                const elImg = vm.refs['image'] as HTMLImageElement;

                state.visible_img_params = {
                    height: elImg.clientHeight,
                    width: elImg.clientWidth
                }

                state.crop_position.size = elImg.clientHeight > elImg.clientWidth 
                    ? elImg.clientWidth 
                    : elImg.clientHeight;
                state.crop_position.x = 0;
                state.crop_position.y = 0;
                state.img_diff = elImg.naturalHeight / elImg.clientHeight;
            }
        }

        /** Загрузить изображение */
        function fUploadImage(e: Event){
            
            const elTarget = e.target as HTMLInputElement;
            if (elTarget.files?.length){
                const imgUrl = URL.createObjectURL(elTarget.files[0]);
                const idImg = userStore.edit_avatar_id;
                const vImageData: UserAvatarI = {
                    img_id: idImg,
                    img_url: imgUrl,
                    img_sm_url: '',
                }
                elTarget.value = '';
                
                state.image_local = {...vImageData};
                fCalcImgParams();
            }
        }

        function fCrop() {
            if (vm){
                const elImage = vm.refs['image'] as HTMLImageElement;

                if (elImage){
                    const canvas = document.createElement('canvas');
        
                    canvas.width = elImage.naturalHeight;
                    canvas.height = elImage.naturalWidth;
        
                    const context = canvas.getContext('2d');

                    if (context){
                        context.drawImage(
                            elImage, 
                            state.crop_position.x * state.img_diff, 
                            state.crop_position.y * state.img_diff,
                            state.crop_position.size * state.img_diff,
                            state.crop_position.size * state.img_diff,
                            0,
                            0,
                            state.crop_position.size * state.img_diff,
                            state.crop_position.size * state.img_diff,
                        );
                    }
        
                    const dataUrl = canvas.toDataURL('image/png', 1.0);
                    state.image_local.img_sm_url = dataUrl;
                    userStore.user_avatars[userStore.edit_avatar_id] = {... state.image_local };
                    userStore.edit_avatar_id = 0;
                }
            }

        }

        function fStartMove(e: MouseEvent) {
            if (state.crop_element){
                const rect = state.crop_element.getBoundingClientRect();
                state.start_move_point = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                }
            }
        }

        function fMove(e: MouseEvent) {
            if (state.start_move_point && state.crop_element) {
                e.preventDefault();

                const rect = state.crop_element.getBoundingClientRect()

                const moveX = (e.clientX - rect.left) - state.start_move_point.x;
                const moveY = (e.clientY - rect.top) - state.start_move_point.y;

                const targetX = state.crop_position.x + moveX;
                const targetY = state.crop_position.y + moveY;

                const maxX = state.visible_img_params.width - state.crop_position.size;
                const maxY = state.visible_img_params.height - state.crop_position.size;
                
                if (targetY < 0){
                    state.crop_position.y = 0;
                } 
                else if (targetY > maxY){
                    state.crop_position.y = maxY;
                }
                else {
                    state.crop_position.y += moveY;
                }

                if (targetX < 0){
                    state.crop_position.x = 0;
                } 
                else if (targetX > maxX){
                    state.crop_position.x = maxX;
                }
                else {
                    state.crop_position.x = targetX;
                }
            }
        }

        function fMouseUp(e: MouseEvent) {
            e.preventDefault();
            e.stopPropagation();
            state.start_move_point = null;
        }

        onMounted(() => {
            if (vm) {
                const elImg = vm.refs['image'] as HTMLImageElement;
                state.crop_element = vm.refs['elCrop'] as HTMLDivElement;
                
                if (elImg) {
                    if (!elImg.onload) {
                        elImg.onload = () => fCalcImgParams();
                    } else {
                        fCalcImgParams();
                    }
                }
            }
            document.addEventListener('resize', fCalcImgParams, { passive: true });
            document.addEventListener('mouseup', fMouseUp)
        });

        onUnmounted(() => {
            document.removeEventListener('resize', fCalcImgParams)
        });

        function fCloseModal() {
            userStore.edit_avatar_id = 0;
        }

        return {
            userStore,
            state,
            fCloseModal,
            fStartMove,
            fMove,
            fUploadImage,
            fCrop,
        };
    }
});
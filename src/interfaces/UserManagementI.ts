
export interface UserI {
    id: number,
    first_name: string,
    second_name: string,
    role: UserRoleT,
    phone_number?: number,
    avatar_img_id?: number,
}

export enum UserRoleT {
    employee = 'employee',
    manager = 'manager'
}

export enum UserRoleRusT {
    employee = 'работник',
    manager = 'руководитель'
}

export interface UserAvatarI {
    img_id: number,
    img_url: string,
    img_sm_url?: string,
}

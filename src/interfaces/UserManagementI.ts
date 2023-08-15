
export interface UserI {
    id: number,
    first_name: string,
    second_name: string,
    role: UserRoleT,
    phone_number?: number,
}

export enum UserRoleT {
    employee = 'employee',
    manager = 'manager'
}

export enum UserRoleRusT {
    employee = 'работник',
    manager = 'руководитель'
}

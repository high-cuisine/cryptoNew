export interface User {
    id: number,

    email: string,

    groups: Group[],

    date_joined: string,
    last_login: string,

    user_permissions: Permission[],
}

export interface Group {
    name: string,

    permissions: Permission[],
}

export interface Permission {
    name: string,
    codename: string,
}

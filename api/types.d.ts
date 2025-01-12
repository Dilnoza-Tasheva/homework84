export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface Task {
    user: Types.ObjectId;
    title: string;
    description: string;
    status: string;
}
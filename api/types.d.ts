export interface UserFields {
    username: string;
    password: string;
    token: srtring;
}

export interface Task {
    user: string;
    title: string;
    description: string;
    status: string;
}
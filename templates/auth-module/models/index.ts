export interface Group {
    name: string;
} 

export interface User {
    id: number,
    username: string;
    email: string;
    groups: Group[];
} 

export interface LocalData {
    user: User;
    token: string;
};


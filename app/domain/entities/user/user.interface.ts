export interface IUser {
    username: string;
    name: string;
    password: string;
    email: string;
    profilePicture: string;
    phoneNumber: string;
    usertype: string;
    followers: IUser[];
    followeds: IUser[];
    
    readonly friends: IUser[];
}

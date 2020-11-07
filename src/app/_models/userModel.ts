export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class UserRegister {
    FullName: string;
    Password: string;
    EmailAddress: string;
    OrgName: string;
}

export class AuthenticateModel {
    UserName: string;
    Password: string;
}

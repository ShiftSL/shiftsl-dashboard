export enum UserRole {
    HR_ADMIN = "HR_ADMIN",
    WARD_ADMIN = "WARD_ADMIN",
    DOCTOR_PERM = "DOCTOR_PERM",
    DOCTOR_TEMP = "DOCTOR_TEMP"
}

export interface User {
    id: number;
    uid: string; // Firebase auth UID
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    role: UserRole;
}

export interface UserDTO {
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    role: UserRole;
}

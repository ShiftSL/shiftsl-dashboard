export interface User {
    id: number;
    uid: string;
    firstName: string;
    lastName: string;
    phoneNo: string;
    email: string;
    role: UserRole;

}

export interface UserDTO {
    firstName: string;
    lastName: string;
    phoneNo: string;
    email: string;
    role: UserRole;
}

export enum UserRole {
    HR_ADMIN = "HR_ADMIN",
    WARD_ADMIN = "WARD_ADMIN",
    DOCTOR_PERM = "DOCTOR_PERM",
    DOCTOR_TEMP = "DOCTOR_TEMP"
}
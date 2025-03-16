export interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    phoneNo: string;
    email: string;
    role: "DOCTOR" | "HR_ADMIN" | "EMPLOYEE";
}
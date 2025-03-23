export interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    phoneNo: string;
    email: string;
    role: "DOCTOR_PERM" | "DOCTOR_TEMP"|"HR_ADMIN" | "EMPLOYEE";
    //optional data for analytics
    coveredShifts?: number;
    coveredHours?: number;
    leavesTaken?: number;
    hoursRemaining?: number;

}
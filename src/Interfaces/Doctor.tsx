export interface Doctor {
    id: bigint;
    firstName: string;
    lastName: string;
    email: string;
    role: "DOCTOR_PERM" | "DOCTOR_TEMP"|"HR_ADMIN" | "EMPLOYEE";
    phoneNo: string;
    //optional data for analytics
    coveredShifts?: number;
    coveredHours?: number;
    leavesTaken?: number;
    hoursRemaining?: number;
}
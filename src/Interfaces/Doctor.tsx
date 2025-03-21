export interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    phoneNo: string;
    email: string;
<<<<<<< HEAD
    role: "DOCTOR_PERM" | "DOCTOR_TEMP"|"HR_ADMIN" | "EMPLOYEE";
=======
    role: string; // check the role cause the backend is designed to understand whether it's a doctor, or an admin
    phone_no: string;
    //optional data for analytics
    coveredShifts?: number;
    coveredHours?: number;
    leavesTaken?: number;
    hoursRemaining?: number;
>>>>>>> origin/main
}
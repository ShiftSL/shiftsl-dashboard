export interface Doctor {
    id: bigint;
    firstName: string;
    lastName: string;
    email: string;
    role: string; // check the role cause the backend is designed to understand whether it's a doctor, or an admin
    phoneNo: string;
    //optional data for analytics
    coveredShifts?: number;
    coveredHours?: number;
    leavesTaken?: number;
    hoursRemaining?: number;
}
export interface LeaveRequest {
    id: bigint;
    shiftOfRequest: {
        date: string;  // "03/02/2025"
        time: string;  // "7pm to 7am"
    };
    requestType: string;  // "Casual Leave"/ "Sick Leave"
    duration: string;  // "2 Days"
    status: "Pending" | "Approved" | "Rejected";
}

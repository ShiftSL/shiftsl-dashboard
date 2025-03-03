export interface ShiftExchange {
    id: bigint;
    shiftOfRequest: {
        date: string;  // Example: "03/02/2025"
        time: string;  // Example: "7 am to 1 pm"
    };
    exchangeShift: {
        date: string;  // Example: "05/02/2025"
        time: string;  // Example: "1 pm to 7 pm"
    };
    timeLeft: string;  // Example: "3 Days"
    status: "Pending" | "Approved" | "Rejected";  // Ensures only valid statuses
}

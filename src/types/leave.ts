import {Shift} from "./shift.ts";
import {User} from "./user.ts";

export interface Leave{
            type: leaveType,
            cause: string,
            shift: Shift,
            doctor: User,
            status: leaveStatus,
            id: number

}
export enum leaveType {
    CASUAL="CASUAL",
    SICK="SICK"
}
export enum leaveStatus{
    PENDING="PENDING",
    APPROVED="APPROVED",
    REJECTED="REJECTED"
}
export interface leaveDTO{
    type: leaveType,
    cause: string,
    shiftId: number,
    doctorId: number,
}
import {list} from "postcss";
import {User} from "./user.ts";
import {Ward} from "./ward.ts";

export interface shiftDTO{
    totalDoctors: number, // should be between 3 or 6
    startTime: string,
    endTime: string,
    doctorIds: list<number>
}
export interface Shift{
    id: number,
    totalDoctors: number,
    noOfDoctors: number,
    startTime: string,
    endTime: string,
    ward: Ward,
    doctors: list<User>
}

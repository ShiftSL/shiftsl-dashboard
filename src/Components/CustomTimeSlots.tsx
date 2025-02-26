import {CalendarAppSingleton} from "@schedule-x/shared";
import {ViewConfig} from "@schedule-x/shared";
import {JSX} from "react";
interface Props{
    $app: CalendarAppSingleton
    id: String
}

const CustomTimeSlots = (props: Props)=>{
    const Shifts = [
        {label: "7 AM - 1 PM", startHour: 7, endHour: 13},
        {label: "1 PM - 7 PM", startHour: 13, endHour: 19},
        {label: "7 PM - 7 AM", startHour: 19, endHour: 7},
    ]
    return(
        <div className="customTimeSlots">
            {Shifts.map((shift, index) => (
                <div key={index} className="time-slot">
                    <h3>{shift.label}</h3>
                </div>
            ))}
        </div>
    )
}
// export const createCustomTimeSlots = (): ViewConfig<(props: Props) => JSX.Element> => {
//     return {
//         name: "CustomTimeSlot",
//         label: "Time Slot",
//         component: CustomTimeSlots,
//     };
// };
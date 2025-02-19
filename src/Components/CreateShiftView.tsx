// import { createViewDay } from "@schedule-x/calendar";
// import { CalendarAppSingleton, ViewConfig } from "@schedule-x/shared";
// import React, {JSX} from "react";
//
// const createShiftView = (): ViewConfig<(props: { $app: CalendarAppSingleton; id: string }) => JSX.Element> => {
//     return {
//         name: "shiftView",
//         label: "Shift View",
//         component: ({$app, id}) => {
//             const shifts = [
//                 {label: "7 AM - 1 PM", startHour: 7, endHour: 13},
//                 {label: "1 PM - 7 PM", startHour: 13, endHour: 19},
//                 {label: "7 PM - 7 AM", startHour: 19, endHour: 7},
//             ];
//
//             return (
//                 <div className="custom-shift-view">
//                     {shifts.map((shift, index) => (
//                         <div key={index} className="shift-slot">
//                             <h3>{shift.label}</h3>
//                         </div>
//                     ))}
//                 </div>
//             );
//         },
//         render(onElement: HTMLElement, $app: CalendarAppSingleton) {
//             // Attach the component to the DOM if needed
//
// export default createShiftView;


import {useState,useEffect} from "react";
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import add from "../assests/add_circle.png"
import AdjustEventPositions from "../Hooks/AdjustEventPositions.tsx";
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'

import { createEventsServicePlugin } from '@schedule-x/events-service'
import AssignDoctorForm from "./AssignDoctorForm"; // Corrected import statement

// Comment to update
import {ShiftFormProps, ShiftFormData} from "../Interfaces/Types.tsx"
import '@schedule-x/theme-default/dist/index.css'
import '../CSS/Calendar.css'
import Shift from "./Shift.tsx";
import {Employee} from "../Interfaces/Employee.tsx";
import {Box} from "@mui/material";
import useEventPositionAdjustment from "../Hooks/AdjustEventPositions.tsx";
import adjustEventPositions from "../Hooks/AdjustEventPositions.tsx";

interface CalenderProps {
    employeeType: "doctor" | "nurse";
}
function Calendar({employeeType}:CalenderProps) {
    useEventPositionAdjustment();
    const eventsService = useState(() => createEventsServicePlugin())[0]
    // const [eventsService] = useState(createEventsServicePlugin);
    const [showForm, setshowForm] = useState(false);
    const [shifts, setShifts] = useState<ShiftFormData[]>([])
    const [employee, setEmployees] = useState<Map<string, Employee>>(new Map());
    

    const handleCreateEvent = (formData: { start: string; end: string }) => {
        eventsService.add({
            id: 1,
            // title: formData.title,
            title: "New Shift",
            start: formData.start,
            end: formData.end,
            // people: formData.people,
            people: [],
            employeeType,
            config: {
                className: "custom-multi-day-event",
            }
        });
        adjustEventPositions();
            // Verify event was added
            createEventsServicePlugin().getAll().map(events => {
                console.log("All events after adding:", events);
            });

            // // Update local state
            // setnewEvent((prev) => [...prev, formData]);
            // setShifts((prev) => [...prev, formData]);
        setshowForm(false);
        console.log("Shift Created:", formData);
    };



    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const allEvents = await eventsService.getAll();
                const formattedShifts: ShiftFormData[] = allEvents.map((event: any) => ({
                    id: event.id,
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    people: event.people ?? [], // Ensure it's an array
                    employeeType: event.employeeType,
                }));

                setShifts(formattedShifts);

                console.log(shifts);

                console.log("\n Shifts and Assigned Doctors");

                allEvents.forEach((event) => {
                    console.log(`\nEvent: ${event.title}`);
                    console.log(` Start: ${event.start}`);
                    console.log(` End: ${event.end}`);
                   if (event.people && event.people.length > 0) {
                         const assignedEmployees = event.people
                            .map(employeeId => employee.get(employeeId))
                            .filter(employee => employee !== undefined)
                            .map(employee => `\n  [id: ${employee.id}] ${employee.first_name}`);
                    
                            console.log(" Assigned Employee:", assignedEmployees.join(", "));
                   } else {
                                        
                        console.log("No Employees assigned");
                    }
                });
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        // Only run fetchEvents when doctors Map is populated
        if (employee.size > 0) {
            fetchEvents();
        }
        // fetchEvents();

    }, [eventsService, employee,employeeType]);
    const calendar = useCalendarApp({

        views: [ createViewWeek(),
            createViewMonthGrid(), createViewMonthAgenda(),
        ],
        // events:shifts.filter(shift=>shift.employeeType ===employeeType),
        events:shifts.filter(shift=>{
            console.log("Filtering shift with employeeType:", shift.employeeType);
            return shift.employeeType === employeeType;

        }
    ),
        
        // console.log("Shift Created:", formData);
        plugins: [eventsService]
      })
    return (
        <div>
            <button onClick={() => setshowForm(true)}><img src={add}/></button>
            {showForm && (
                <AssignDoctorForm
                    onSubmit={handleCreateEvent}
                    onCancel={() => setshowForm(false)}
                    employeeType={employeeType}
                />
            )}
            {/* <ScheduleXCalendar  calendarApp={calendar}/> */}
            {calendar && <ScheduleXCalendar calendarApp={calendar} />}
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
                <>
                {shifts.map((s,index)=>(<Shift key={index} shift={s} employeeType={employeeType}/>))}
                </>
            </Box>

        </div>

    )
}

export default Calendar;

import {useState,useEffect} from "react";
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import add from "../assests/add_circle.png"

import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'

import { createEventsServicePlugin } from '@schedule-x/events-service'
import {createDragAndDropPlugin} from "@schedule-x/drag-and-drop";
import AssignDoctorForm from "./AssignDoctorForm"; // Corrected import statement

// Comment to update
import {ShiftFormProps, ShiftFormData} from "../Interfaces/Types.tsx"
import '@schedule-x/theme-default/dist/index.css'
import '../CSS/Calendar.css'
import Shift from "./Shift.tsx";
import {Doctor} from "../Interfaces/Doctor.tsx";
import {Box} from "@mui/material";

function Calendar() {
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const [showForm, setshowForm] = useState(false);
    const [newEvent, setnewEvent] = useState<ShiftFormData[]>([]);
    const [shifts, setShifts] = useState<ShiftFormData[]>([])
    const [doctors, setDoctors] = useState<Map<string, Doctor>>(new Map());

    const handleCreateEvent = (formData: ShiftFormData) => {
        eventsService.add({
            id: "1",
            title: formData.title,
            start: formData.start,
            end: formData.end,
            people: formData.people,
            config: {
                color: '#2AED8D',
            }
        });

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
                }));

                setShifts(formattedShifts);

                console.log(shifts);

                console.log("\n Shifts and Assigned Doctors");

                allEvents.forEach((event) => {
                    console.log(`\nEvent: ${event.title}`);
                    console.log(` Start: ${event.start}`);
                    console.log(` End: ${event.end}`);
                    if (event.people && event.people.length > 0) {
                        const assignedDoctors = event.people
                            .map(doctorId => doctors.get(doctorId))
                            .filter(doctor => doctor !== undefined)
                            .map(doctor => `\n  [id: ${doctor.id}] ${doctor.first_name}`);

                        console.log(" Assigned Doctors:", assignedDoctors.join(", "));
                    } else {
                        console.log("No doctors assigned");
                    }
                });
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        // Only run fetchEvents when doctors Map is populated
        if (doctors.size > 0) {
            fetchEvents();
        }
        // fetchEvents();

    }, [eventsService, doctors]);
    const calendar = useCalendarApp({
        views: [ createViewWeek(),
            createViewMonthGrid(), createViewMonthAgenda(),
        ],
        events:[],
        plugins: [eventsService]
    })
    return (
        <div>
            <button onClick={() => setshowForm(true)}><img src={add}/></button>
            {showForm && (
                <AssignDoctorForm
                    onSubmit={handleCreateEvent}
                    onCancel={() => setshowForm(false)}
                />
            )}
            <ScheduleXCalendar  calendarApp={calendar}/>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
                <>
                {shifts.map((s,index)=>(<Shift key={index} shift={s}/>))}
                </>
            </Box>

        </div>

    )
}

export default Calendar;
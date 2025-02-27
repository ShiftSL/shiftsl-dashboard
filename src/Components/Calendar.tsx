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
import {ShiftFormProps, ShiftFormData} from "../Types.tsx"
import '@schedule-x/theme-default/dist/index.css'
import '../CSS/Calendar.css'

function Calendar() {
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const dragdropService = useState(()=>createDragAndDropPlugin())[0]
    const [showForm, setshowForm] = useState(false);
    const [newEvent, setnewEvent] = useState<ShiftFormData[]>([]);



    const [doctors, setDoctors] = useState<Map<string, { id: string; name: string }>>(new Map());
    useEffect(() => {

    }, []);

    const calendar = useCalendarApp({

        views: [ createViewWeek(),
            createViewMonthGrid(), createViewMonthAgenda(),
            ],

        events: [
            // Events means a Shift. It has the Ward Name, start and end date time, and doctors assigned

        ],
        plugins: [eventsService, dragdropService]
    })
    const handleCreateEvent = (formData: ShiftFormData) => {
        setnewEvent((prev) => [...prev, formData]);
        setshowForm(false);
        console.log("Shift Created:", formData);
    };
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const allEvents = await eventsService.getAll();
                console.log("\n Shifts and Assigned Doctors");

                allEvents.forEach((event) => {
                    console.log(`\nEvent: ${event.title}`);
                    console.log(` Start: ${event.start}`);
                    console.log(` End: ${event.end}`);
                    if (event.people && event.people.length > 0) {
                        const assignedDoctors = event.people
                            .map(doctorId => doctors.get(doctorId))
                            .filter(doctor => doctor !== undefined)
                            .map(doctor => `\n  [id: ${doctor.id}] ${doctor.name}`);

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
    }, [eventsService, doctors]);

    return (
        <div>

            <button onClick={() => setshowForm(true)}><img src={add}/></button>
            {showForm && (
                <AssignDoctorForm
                    onSubmit={handleCreateEvent}
                    onCancel={() => setshowForm(false)}
                />
            )}
            <ScheduleXCalendar calendarApp={calendar}/>

        </div>

    )
}

export default Calendar;
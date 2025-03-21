import {useState, useEffect, useRef} from "react";
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import add from "../assests/add_circle.png"
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'

import { createEventsServicePlugin } from '@schedule-x/events-service'
import AssignDoctorForm from "./AssignDoctorForm"; // Corrected import statement

// Comment to update
import {ShiftFormData} from "../Interfaces/Types.tsx"
import '@schedule-x/theme-default/dist/index.css'
import '../CSS/Calendar.css'

import useEventPositionAdjustment from "../Hooks/AdjustEventPositions.tsx";
import adjustEventPositions from "../Hooks/AdjustEventPositions.tsx";
import axios from "axios";

function Calendar() {
    useEventPositionAdjustment()
    const hasLoadedEvents = useRef(false);
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const [showForm, setshowForm] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleCreateEvent = async (formData: ShiftFormData) => {
        try{
            const convertToISO = (dateTime: string) => {
                const [date, time] = dateTime.split(" ");
                return new Date(`${date}T${time}:00Z`).toISOString();
            };
            const formattedStart = convertToISO(formData.start);
            let formattedEnd = convertToISO(formData.end);
            if (formData.start.includes("19:00")){
                const addOneDay = (date: string) => { // Function to add one day to a date
                    const [year, month, day] = date.split("-");
                    const nextDate = new Date(Number(year), Number(month) - 1, Number(day) + 1);
                    return nextDate.toISOString().split("T")[0];
                }
                const [date] = formData.start.split(" "); // Extract the date
                const nextDay = addOneDay(date);
                formattedEnd=nextDay+"T07:00:00Z";
            }
            const response = await axios.post("/api/shift/create/2", { //TODO: Update url with Doctor param
                totalDoctors: formData.people.length, // should be between 3 or 6
                startTime: formattedStart,
                endTime: formattedEnd,
                doctorIds: formData.people
            });
            console.log("Shift successfully created in backend:", response.data);
            setRefreshTrigger(prev => prev + 1);
        } catch (e){console.error("error sending to data Backend: "+e)}

        setshowForm(false);

    };


    useEffect(() => {
        if (hasLoadedEvents.current) return;
        const fetchEvents = async () => {
            try {
                const currentEvents = eventsService.getAll();
                if (currentEvents && currentEvents.length > 0) {
                    console.log("Clearing existing events:", currentEvents.length);
                    currentEvents.forEach(event => {
                        eventsService.remove(event.id);
                    });
                }
                const response = await axios.get("/api/shift");
                const shifts = response.data;
                console.log("Shifts from backend:", shifts);
                // Passing the fetched data to the front end library


                shifts.forEach((shift: any) => {
                    const doctorNames = shift.doctors
                        .map((doc: any) => `Dr. ${doc.firstName.charAt(0)} ${doc.lastName}`)
                        .join(", ");

                    eventsService.add({
                        id: shift.id,
                        title: `${doctorNames}`, // 👈 Set the doctor names here
                        start: shift.startTime.replace("T", " ").slice(0, 16),
                        end: shift.endTime.replace("T", " ").slice(0, 16),
                    });
                });

            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        // Only run fetchEvents when doctors Map is populated
       fetchEvents();
        hasLoadedEvents.current = true;

    }, [eventsService, refreshTrigger]);

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
        </div>

    )
}

export default Calendar;
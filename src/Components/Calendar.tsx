import { useState, useEffect, useRef } from "react";
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'

import {
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'

import { createEventsServicePlugin } from '@schedule-x/events-service'

// Comment to update
import { ShiftFormData } from "../Interfaces/Types.tsx"
import '@schedule-x/theme-default/dist/index.css'
import '../CSS/Calendar.css'

import useEventPositionAdjustment from "../Hooks/AdjustEventPositions.tsx";

import AssignDoctorForm from "./AssignDoctorForm";
import {shiftApi} from "../service/api.ts";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.tsx";

function Calendar() {
    useEventPositionAdjustment()
    const hasLoadedEvents = useRef(false);
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const [showForm, setShowForm] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedShiftId, setSelectedShiftId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleCreateEvent = async (formData: ShiftFormData) => {
        try {
            const convertToISO = (dateTime: string) => {
                const [date, time] = dateTime.split(" ");
                return new Date(`${date}T${time}:00Z`).toISOString();
            };
            const formattedStart = convertToISO(formData.start);
            let formattedEnd = convertToISO(formData.end);
            if (formData.start.includes("19:00")) {
                const addOneDay = (date: string) => { // Function to add one day to a date
                    const [year, month, day] = date.split("-");
                    const nextDate = new Date(Number(year), Number(month) - 1, Number(day) + 1);
                    return nextDate.toISOString().split("T")[0];
                }
                const [date] = formData.start.split(" "); // Extract the date
                const nextDay = addOneDay(date);
                formattedEnd = nextDay + "T07:00:00Z";
            }

            const response = await shiftApi.createShift(1, {
                totalDoctors: formData.people.length, // should be between 3 or 6
                                startTime: formattedStart,
                                endTime: formattedEnd,
                                doctorIds: formData.people.map(id => Number(id))
            });
            console.log("Shift successfully created in backend:", response.data);
            setRefreshTrigger(prev => prev + 1);
        } catch (e) { console.error("error sending to data Backend: " + e) }

        setShowForm(false);

    };

    useEffect(() => {
        if (hasLoadedEvents.current) return;

        hasLoadedEvents.current = true; // 👈 Prevent duplicate fetching early

        (async () => {
            try {
                setIsLoading(true);
                const response = await shiftApi.getAllShifts();

                const shifts = response.data;
                console.log("Shifts from backend:", shifts);

                shifts.forEach((shift: any) => {
                    const doctorNames = shift.doctors
                        .map((doc: any) => `Dr. ${doc.firstName.charAt(0)} ${doc.lastName}`)
                        .join(", ");

                    const formattedStart = shift.startTime.replace("T", " ").slice(0, 16);
                    const formattedEnd = shift.endTime.replace("T", " ").slice(0, 16);

                    console.log("Adding shift:", shift.id, formattedStart, formattedEnd);

                    eventsService.add({
                        id: shift.id,
                        title: `${doctorNames}` + '\n' + shift.id,
                        start: formattedStart,
                        end: formattedEnd,
                    });
                });

            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [eventsService, refreshTrigger]);


    const handleDeleteConfirm = async () => {
        if (selectedShiftId !== null) {
            try {
                await shiftApi.deleteShift(selectedShiftId);
                eventsService.remove(selectedShiftId);
                console.log("Shift deleted");
            } catch (err) {
                console.error("Error deleting shift:", err);
            } finally {
                setDialogOpen(false);
                setSelectedShiftId(null);
            }
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedShiftId(null);
    };


    const calendar = useCalendarApp({
        views: [createViewWeek(),
            createViewMonthGrid(), createViewMonthAgenda(),
        ],
        events: [],
        plugins: [eventsService],
        callbacks: {
            onEventClick:async (event) => {
                console.log("Shift clicked", event);
                setSelectedShiftId(Number(event.id));
                setDialogOpen(true);
            },
            onClickDateTime:(clickedDateTime) => {
                console.log("Date time clicked: ", clickedDateTime);
                setShowForm(true);

            }
        }
    })

    return (
        <div>
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Loading shifts...</p>
                </div>
            )}

            {showForm &&
                (<AssignDoctorForm onSubmit={handleCreateEvent} onCancel={() => setShowForm(false)} />)}
                <ScheduleXCalendar calendarApp={calendar} />
                <ConfirmDeleteDialog open={dialogOpen} shiftId={selectedShiftId} onClose={handleDialogClose} onConfirm={handleDeleteConfirm}/>
        </div>

    )
}

export default Calendar;
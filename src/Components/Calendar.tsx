import { useState, useEffect } from "react"
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react"
import {
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar"
import { createEventsServicePlugin } from "@schedule-x/events-service"
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop"
import "@schedule-x/theme-default/dist/index.css"
import "../CSS/Calendar.css"
import Header from "./Header" // Import the Header component

function Calendar() {
  const eventsService = useState(() => createEventsServicePlugin())[0]
  const dragdropService = useState(() => createDragAndDropPlugin())[0]

  const [doctors, setDoctors] = useState(new Map<String, { id: number; name: String }>())
  useEffect(() => {
    const doctorsMap = new Map([
      // TODO: Connect the GET API Point to the Backend to Fetch the Doctors List.
      // TODO: Note: Better to save the backend data in a Map and Go with it.
      ["1", { id: 1001, name: "Dr. Jon Snow" }],
      ["2", { id: 1002, name: "Dr. Brandon Stark" }],
      ["3", { id: 1003, name: "Dr. Tyrion Lannister" }],
      ["4", { id: 1004, name: "Dr. Daenerys Targaryen" }],
      ["5", { id: 1005, name: "Dr. Arya Stark" }],
      ["6", { id: 1006, name: "Dr. Sansa Stark" }],
      ["7", { id: 1007, name: "Dr. Cersei Lannister" }],
      ["8", { id: 1008, name: "Dr. Jaime Lannister" }],
      ["9", { id: 1009, name: "Dr. Samwell Tarly" }],
      ["10", { id: 1010, name: "Dr. Brienne Tarth" }],
    ])
    setDoctors(doctorsMap)
  }, [])

  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      // Events means a Day's Worth Shifts. A Day has 3 Shifts for Now
      {
        id: "1",
        title: "Shift1",
        start: "2025-10-01 07:00",
        end: "2025-10-01 13:00",
        people: ["1", "3"],
      },
      {
        id: "2",
        title: "Shift2",
        start: "2025-10-01 13:00",
        end: "2025-10-01 19:00",
        people: ["6", "4"],
      },
      {
        id: "3",
        title: "Shift3",
        start: "2025-10-01 19:00",
        end: "2025-10-02 07:00",
        people: ["8", "1"],
      },
    ],
    plugins: [eventsService, dragdropService],
  })
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await eventsService.getAll()
        console.log("\n Shifts and Assigned Doctors")

        allEvents.forEach((event) => {
          console.log(`\nEvent: ${event.title}`)
          console.log(` Start: ${event.start}`)
          console.log(` End: ${event.end}`)
          if (event.people && event.people.length > 0) {
            const assignedDoctors = event.people
              .map((doctorId) => doctors.get(doctorId))
              .filter((doctor) => doctor !== undefined)
              .map((doctor) => `\n  [id: ${doctor.id}] ${doctor.name}`)

            console.log(" Assigned Doctors:", assignedDoctors.join(", "))
          } else {
            console.log("No doctors assigned")
          }
        })
      } catch (error) {
        console.error("Error fetching events:", error)
      }
    }

    // Only run fetchEvents when doctors Map is populated
    if (doctors.size > 0) {
      fetchEvents()
    }
  }, [eventsService, doctors])

  return (
    <div>
      <Header /> {/* Add the Header component */}
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
export default Calendar
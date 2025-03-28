import React, {useEffect, useState} from "react";
import { ShiftFormProps, ShiftFormData } from "../Interfaces/Types.tsx";
import '../CSS/AssignDoctorForm.css'
import {Doctor} from "../Interfaces/Doctor.tsx";
import {userApi} from "../service/api.ts";

const shiftOptions = [
    { label: "7 AM - 1 PM", startHour: 7, endHour: 13 },
    { label: "1 PM - 7 PM", startHour: 13, endHour: 19 },
    { label: "7 PM - 7 AM", startHour: 19, endHour: 7 },
]; // Shift Options to Choose From


const AssignDoctorForm: React.FC<ShiftFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState<ShiftFormData>({
        id: initialData?.id ||0,
        title: initialData?.title || "",
        start: initialData?.start || "",
        end: initialData?.end || "",
        people: initialData?.people ?? [],
    });

    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedShift, setSelectedShift] = useState<string>("");
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    const fetchDoctors = async () => {
        try {
            const response = await userApi.getAllUsers();
            if (Array.isArray(response.data)) {
                setDoctors(response.data);
            } else {
                console.error("Unexpected API response:", response.data);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    // Handle doctor selection
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDoctors = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prev) => ({ ...prev, people: selectedDoctors }));
    };

    // Handle Date Selection
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
        updateShiftTiming(e.target.value, selectedShift);
    };

    // Handle Shift Selection
    const handleShiftChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedShift(e.target.value);
        updateShiftTiming(selectedDate, e.target.value);
    };

    // Updates start & end time dynamically based on selected date & shift
    const updateShiftTiming = (date: string, shift: string) => {
        if (!date || !shift) return;
        const shiftDetails = shiftOptions.find((s) => s.label === shift);
        if (!shiftDetails) return;
        const formattedStart = `${date} ${shiftDetails.startHour.toString().padStart(2, '0')}:00`;

        if (shiftDetails.label === "7 PM - 7 AM") {
            const nextDay = addOneDay(date);

            const nightShiftPart1 = {
                title: formData.title,
                start: formattedStart,
                end: `${date} 23:59`, // Ends just before midnight
                people: formData.people
            };

            const nightShiftPart2 = {
                title: formData.title,
                start: `${nextDay} 00:00`, // Starts at midnight on the next day
                end: `${nextDay} 07:00`, // Ends at 7 AM
                people: formData.people
            };

            setFormData((prev) => ({
                ...prev,
                title: formData.title,
                start: nightShiftPart1.start,
                end: nightShiftPart1.end, // Sets the first shift
                people: formData.people
            }));

            console.log("Night Shift Split:", nightShiftPart1, nightShiftPart2);

            return [nightShiftPart1, nightShiftPart2];
        }
        const formattedEnd = `${date} ${shiftDetails.endHour.toString().padStart(2, '0')}:00`;
        setFormData((prev) => ({ ...prev, start: formattedStart, end: formattedEnd, people: formData.people}));
    };

    // If shift goes past midnight, add 1 day to the date
    const addOneDay = (date: string): string => {
        const d = new Date(date);
        d.setDate(d.getDate() + 1);
        return d.toISOString().split("T")[0];
    };

    // Handle Form Submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newShifts = updateShiftTiming(selectedDate, selectedShift);
        if (Array.isArray(newShifts)) {
            // If the shift was split, submit only the first part
            console.log("Submitting split night shift:", newShifts[0]);
            onSubmit(newShifts[0]);  // First shift (7 PM - 11:59 PM)
        } else {
            // For regular shifts, submit the formData
            console.log("Submitting regular shift:", formData);
            onSubmit(formData);
        }
        onCancel();
        // setTimeout(() => {
        //     window.location.reload();
        // }, 500);
    };

    return (
        <div className="form-container">
            <h3>{"Create New Shift"}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Select Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </div>

                <div>
                    <label htmlFor="shift">Select Shift</label>
                    <select id="shift" name="shift" value={selectedShift} onChange={handleShiftChange}>
                        <option value="" disabled>Select a shift</option>
                        {shiftOptions.map((shift) => (
                            <option key={shift.label} value={shift.label}>
                                {shift.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="people">Assigned Doctors</label>
                    <select
                        id="people"
                        name="people"
                        value={Array.isArray(formData.people) ? formData.people : []}
                        onChange={handleSelectChange}
                        multiple
                    >
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                Dr. {doctor.firstName} {doctor.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="selected-doctors">
                    {formData.people.map((id) => {
                        const doctor = doctors.find((doctor) => doctor.id.toString() === id); // 🔍 Find doctor by ID
                        return doctor ? (
                            <span key={doctor.id} className="selected-doctor">
                Dr. {doctor.firstName} {doctor.lastName}
            </span>
                        ) : null;
                    })}
                </div>

                <button type="submit">{"Create Shift"}</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default AssignDoctorForm;


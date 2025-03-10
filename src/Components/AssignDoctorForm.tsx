import React, { useState } from "react";
import { ShiftFormProps, ShiftFormData } from "../Interfaces/Types.tsx";
import '../CSS/AssignDoctorForm.css'
import doctordata from '../jsonfiles/doctors.json'

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

    const doctorsMap = new Map(doctordata.map((doctor) => [doctor.id, doctor]));
    const doctorList = doctordata;

    // handle input changes for the title
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

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
        const formattedEnd = `${shiftDetails.startHour > shiftDetails.endHour ? addOneDay(date) : date} ${shiftDetails.endHour.toString().padStart(2, '0')}:00`;

        setFormData((prev) => ({ ...prev, start: formattedStart, end: formattedEnd }));
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
        console.log("Submitting Shift Form Data:", formData);
        onSubmit(formData);
    };

    return (
        <div className="form-container">
            <h3>{initialData ? "Edit Shift" : "Create New Shift"}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Ward</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

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
                        {doctorList.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                Dr. {doctor.first_name} {doctor.last_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="selected-doctors">
                    {formData.people.map((id) => {
                        const doctor = doctorsMap.get(id);
                        return doctor ? (
                            <span key={doctor.id} className="selected-doctor">
                                {doctor.first_name} {doctor.last_name}
                            </span>
                        ) : null;
                    })}
                </div>

                <button type="submit">{initialData ? "Update Shift" : "Create Shift"}</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default AssignDoctorForm;


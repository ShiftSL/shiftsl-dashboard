import React, { useState } from "react";
import { ShiftFormProps, ShiftFormData } from "../Types"; // Corrected import statement
import '../CSS/AssignDoctorForm.css'
import doctordata from '../assests/doctors.json'
const AssignDoctorForm: React.FC<ShiftFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState<ShiftFormData>({
        title: initialData?.title || "",
        start: initialData?.start || "",
        end: initialData?.end || "",
        people: initialData?.people ?? [],
    });

    const doctorsMap = new Map(doctordata.map((doctor)=>[doctor.id, doctor]))

    const doctorList = doctordata;
// Function to handle the changes that happen in Input Elements Ward: Title Start: start End: end
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
// Function to handle the changes that happen in Select Input Element AKA People/ Doctors
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDoctors = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prev) => ({ ...prev, people: selectedDoctors }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                    <label htmlFor="start">Start</label>
                    <input
                        type="datetime-local"
                        id="start"
                        name="start"
                        value={formData.start}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label htmlFor="end">End</label>
                    <input
                        type="datetime-local"
                        id="end"
                        name="end"
                        value={formData.end}
                        onChange={handleChange}
                    />
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
                                {doctor.name}
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


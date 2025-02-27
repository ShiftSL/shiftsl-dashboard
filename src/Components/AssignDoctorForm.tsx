import React, { useState } from "react";
import { ShiftFormProps, ShiftFormData } from "../Types"; // Corrected import statement
import '../CSS/AssignDoctorForm.css'
const AssignDoctorForm: React.FC<ShiftFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState<ShiftFormData>({
        title: initialData?.title || "",
        start: initialData?.start || "",
        end: initialData?.end || "",
        people: initialData?.people ?? [],
    });

    const doctorsMap = new Map([
        ["1", { id: "1", name: "Dr. Jon Snow" }],
        ["2", { id: "2", name: "Dr. Brandon Stark" }],
        ["3", { id: "3", name: "Dr. Tyrion Lannister" }],
        ["4", { id: "4", name: "Dr. Daenerys Targaryen" }],
        ["5", { id: "5", name: "Dr. Arya Stark" }],
        ["6", { id: "6", name: "Dr. Sansa Stark" }],
        ["7", { id: "7", name: "Dr. Cersei Lannister" }],
        ["8", { id: "8", name: "Dr. Jaime Lannister" }],
        ["9", { id: "9", name: "Dr. Samwell Tarly" }],
        ["10", { id: "10", name: "Dr. Brienne Tarth" }],
    ]);

    const doctorList = Array.from(doctorsMap.values());
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
                                {doctor.name}
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


/* TODO:
     Issues To Be Checked:
     3. CSS wise not at all coordinated (Ojitha)
 */
/* Test */
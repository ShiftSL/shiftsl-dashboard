import {User} from "../types/user.ts";

export interface ShiftFormProps {
    onSubmit: (formData: ShiftFormData) => void;
    onCancel: () => void;
    initialData?: ShiftFormData; // Optional to allow new event creation
    doctors: User[];
}

export interface ShiftFormData {
    title: string;
    start: string; // Expected format: dd-mm-yy hh-mm
    end: string;
    people: string[];
}
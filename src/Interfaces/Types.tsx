export interface ShiftFormProps {
    onSubmit: (formData: { start: string; end: string }) => void;
    onCancel: () => void;
    initialData?: ShiftFormData; // Optional to allow new event creation
}

export interface ShiftFormData {
    id: number;
    title: string;
    start: string; // Expected format: dd-mm-yy hh-mm
    end: string;
    people: string[];
}
import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

// Fixed Transition component with proper typing
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmDeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    shiftId: number | null;
}

export default function ConfirmDeleteDialog({
                                                open,
                                                onClose,
                                                onConfirm,
                                                shiftId,
                                            }: ConfirmDeleteDialogProps) {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Delete Shift?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to delete shift {shiftId}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    );
}
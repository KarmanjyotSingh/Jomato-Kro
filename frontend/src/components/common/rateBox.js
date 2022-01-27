import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios"
export default function RatingFormDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        let n = props.numRated
        let r = props.rating
        console.log(n, r)
        let y = document.getElementById(props.id + "rate").value
        console.log(y);
        let newRating = (n * r + y) / (n + 1)
        console.log(newRating);

        axios
            .put("http://localhost:4000/food/rate", { id: props.id, newRating: newRating, n: n + 1 })
            .then(res => {
                console.log(res);
                handleClose();
                alert("Rating submitted!");
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <div>
            <Button disabled={props.disabled} variant="outlined" onClick={handleClickOpen}>
                Rate Your Order
            </Button>
            <Dialog
                open={open} onClose={handleClose}>
                <DialogTitle>Rate</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Rate Your Order !
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id={props.id + "rate"}
                        label="Rating"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

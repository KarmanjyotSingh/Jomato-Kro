import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { ListItemText } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Favorite from '@mui/icons-material/Favorite';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import List from '@mui/material/List';


{/* <Table>
<TableHead>
    <TableRow>
        <TableCell>Addon Name</TableCell>
        <TableCell>Addon Price</TableCell>
    </TableRow>
</TableHead>
<TableBody>
    {props.addon_name.map((name, index) => (
        <TableRow key={index}>
            <Checkbox name={name} price={props.addon_price[index]} idx={index} />
            <TableCell>{name}</TableCell>
            <TableCell>{props.addon_price[index]}</TableCell>
        </TableRow>
    ))}
</TableBody>
</Table> */}

function ControlledCheckbox2(props) {
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (checked) {
            // remove the addon 
            // update the PRICE
            // tempBill = props.bill
            // tempBill = tempBill - props.price
            // props.setBill(tempBill)

            // // update the ADDON_NAME
            // tmpAddon = [...props.addon_name]
            // tmpPrice = [...props.addon_price]
            // for (var i = 0; i < tmpAddon.length; i++) {
            //     if (tmpAddon[i] == props.addon_name[i]) {
            //         tmpAddon.splice(i, 1);
            //         tmpPrice.splice(i, 1);
            //         break;
            //     }
            // }
        }
        else {
            // add the addon ?
            axios
                .post("http://localhost:4000/food/addfav", { name: props.name, email: props.email, price: props.price, vendor_shop: props.shop })
                .then((res) => {
                    console.log(res);
                    if (res.status == 200)
                        alert("Added to favorites");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <Checkbox
            checked={checked}
            onChange={handleChange}
            icon={<Favorite />}
            checkedIcon={<Favorite />}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);
    const [bill, setBill] = React.useState(0);
    const [AddOns, setAddOns] = React.useState([{ name: "", price: 0 }]);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log(document.getElementById("name").value)
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Place An Order</DialogTitle>
                <DialogContent type="submit">
                    <DialogContentText>
                        Tasty Food At Your Doorsteps
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="item name"
                        type="text"
                        value={props.name}
                        fullWidth
                        variant="standard"
                        disabled={true} />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="shop"
                        label="shop"
                        type="text"
                        value={props.shop}
                        fullWidth
                        variant="standard"
                        disabled={true} />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="vendor-email"
                        label="vendor email address"
                        type="email"
                        value={props.vendor_email}
                        fullWidth
                        variant="standard"
                        disabled={true} />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="buyer-email"
                        label="buyer email address"
                        type="email"
                        value={props.buyer_email}
                        fullWidth
                        variant="standard"
                        disabled={true} />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="quantity"
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <nav aria-label="main mailbox folders">
                            <ul
                                style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {props.addon_name.map((name, index) => (
                                    <li key={index}>
                                        <ControlledCheckbox2 bill={bill} setBill={setBill} AddOnList={AddOns} setAddOn={setAddOns} name={name} price={props.addon_price[index]} idx={index} />
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </Box>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="bill"
                        label="Bill"
                        type="number"
                        value={bill}
                        onChange={(e) => setBill(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Place Order</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

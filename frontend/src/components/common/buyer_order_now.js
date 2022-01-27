import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import EditMenu from "./edit_menu";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

import DialogContentText from '@mui/material/DialogContentText';
import { ListItemText } from "@mui/material";
import RupeeIcon from '@mui/icons-material/CurrencyRupee';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

import Favorite from '@mui/icons-material/Favorite';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

function ControlledCheckbox(props) {
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (checked) {
            axios
                .post("http://localhost:4000/food/remove_fav", { name: props.name, email: props.email })
                .then((res) => {
                    console.log(res);
                    if (res.status == 200)
                        alert("Removed from favorites");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
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

function ControlledCheckbox2(props) {
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (checked) {
            console.log("Removing")
            for (var i = 0; i < props.AddOns.length; i++) {
                if (props.AddOns[i].name == props.name) {
                    props.AddOns.splice(i, 1);
                    break;
                }
            }
            console.log("removed")
            console.log(props.AddOns)
            // remove the addon 
            // update the PRICE
            let tempBill = props.bill
            tempBill = tempBill - props.price
            props.setBill(tempBill)

            console.log("removed" + "     " + tempBill)

        }
        else {
            console.log("Adding")
            let temp = [...props.AddOns]
            temp[props.AddOns.length] = { name: props.name, price: props.price }

            let tempBill = props.bill
            tempBill = tempBill + props.price
            props.setBill(tempBill)
            console.log(tempBill)

            props.setAddOns(temp)
            //    console.log(props.AddOns)
            //  console.log("Added")

        }
    };

    return (
        <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}

function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);
    const [bill, setBill] = React.useState(props.price);
    const [AddOns, setAddOns] = React.useState([]);

    const [name, setName] = React.useState(props.name)
    const [price, setPrice] = React.useState(props.price)
    const [shop, setShop] = React.useState(props.shop)
    const [buyer_email, setBuyerEmail] = React.useState(props.buyer_email)
    const [vendor_email, setVendorEmail] = React.useState(props.vendor_email)

    // console.log(AddOns)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        //  console.log(document.getElementById("name").value)
        setOpen(false);
    };
    const handleSubmit = () => {
        let tempDate = new Date();
        let addon_name = [], addon_price = []
        for (var i = 0; i < AddOns.length; i++) {
            addon_name.push(AddOns[i].name)
            addon_price.push(AddOns[i].price)
        }
        const query = {
            item_name: name,
            vendor_shop: shop,
            buyer_email: buyer_email,
            vendor_email: vendor_email,
            quantity: quantity,
            placed_time: (tempDate.getHours() + ":" + tempDate.getMinutes().toString()),
            bill: bill * quantity,
            addon_name: addon_name,
            addon_price: addon_price
        }
        console.log(query)

        axios
            .post("http://localhost:4000/order/place_order", query)
            .then((res) => {
                console.log(res);
                if (res.status == 200)

                    alert("Order Placed");
            })
            .catch((err) => {
                console.log(err);
            });


        setOpen(false);
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Order Now
            </Button>
            <Dialog id={props.id} open={open} onClose={handleClose}>
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
                        value={name}
                        fullWidth
                        variant="standard"
                        disabled={true} />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="shop"
                        label="shop"
                        type="text"
                        value={shop}
                        fullWidth
                        variant="standard"
                        disabled={true} />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="vendor-email"
                        label="vendor email address"
                        type="email"
                        value={vendor_email}
                        fullWidth
                        variant="standard"
                        disabled={true} />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="buyer-email"
                        label="buyer email address"
                        type="email"
                        value={buyer_email}
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
                    <Grid label="Addon">
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ul
                                style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <div>
                                    {props.addon_name.map((name, index) => (
                                        <li key={index}>
                                            <div>
                                                <ControlledCheckbox2 bill={bill} setBill={setBill} AddOns={AddOns} setAddOns={setAddOns} name={name} price={props.addon_price[index]} />
                                                {name}
                                                {"          "}
                                                {props.addon_price[index]}
                                            </div>
                                        </li>

                                    ))}
                                </div>
                            </ul>
                        </Box>
                    </Grid>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="bill"
                        label="Bill"
                        type="number"
                        disabled={true}
                        value={bill}
                        onChange={(e) => setBill(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Place Order</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const UsersList = (props) => {
    const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [edit_menu, setEditMenu] = useState("0");
    localStorage.setItem("edit_menu", "0");


    useEffect(() => {
        axios
            .get("http://localhost:4000/food/orderItems")
            .then((response) => {
                setUsers(response.data);
                setSortedUsers(response.data);
                setSearchText("");
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleEdit(props) {

        localStorage.setItem("item_name_editing", props.name);
        if (edit_menu === "0") {
            setEditMenu("1");
        } else {
            setEditMenu("0");
        }


    }

    const sortChange = () => {
        let usersTemp = users;
        const flag = sortName;
        usersTemp.sort((a, b) => {
            if (a.date != undefined && b.date != undefined) {
                return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
            } else {
                return 1;
            }
        });
        setUsers(usersTemp);
        setSortName(!sortName);
    };

    const customFunction = (event) => {
        console.log(event.target.value);
        setSearchText(event.target.value);
    };

    return (
        edit_menu === "0" ? (
            <div>
                <Grid container>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Sr No.</TableCell>
                                        <TableCell>Item Name</TableCell>
                                        <TableCell>
                                            Price
                                        </TableCell>
                                        <TableCell>
                                            Vendor Shop
                                        </TableCell>
                                        <TableCell>
                                            Add-Ons
                                        </TableCell>
                                        <TableCell>
                                            Tags
                                        </TableCell>
                                        <TableCell>
                                            Favorites
                                        </TableCell>
                                        <TableCell>
                                            Rating
                                        </TableCell>
                                        <TableCell>
                                            Order
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ind}</TableCell>
                                            <TableCell>{user.name}
                                            </TableCell>
                                            <TableCell>{user.price}</TableCell>
                                            <TableCell>{user.vendor_shop}</TableCell>
                                            <TableCell>
                                                {

                                                    user.addon_name.map((addon, ind) => (
                                                        <div key={ind}>
                                                            <ul>
                                                                <li>
                                                                    {addon}{"  "}
                                                                    {user.addon_price[ind]}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    ))
                                                }
                                            </TableCell>
                                            <TableCell>{user.tags.map((name, ind) => (
                                                <div key={ind}>
                                                    <ul>
                                                        <li>
                                                            {name}
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))
                                            }
                                            </TableCell>
                                            <TableCell>
                                                <ControlledCheckbox key={user._id} name={user.name} shop={user.vendor_shop} email={user.vendor_email} price={user.price} />
                                            </TableCell>
                                            <TableCell>
                                                {user.rating}

                                            </TableCell>
                                            <TableCell>
                                                <FormDialog id={user._id} name={user.name} price={user.price} shop={user.vendor_shop} vendor_email={user.vendor_email} addon_name={user.addon_name} buyer_email={localStorage.getItem("email")} addon_price={user.addon_price} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div >
        ) : (<EditMenu />));
};

export default UsersList;

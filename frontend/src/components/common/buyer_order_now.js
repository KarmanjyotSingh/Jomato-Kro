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
import RateBox from "./rateBox"
import Veg from "../images/veg.png";
import Nonveg from "../images/non-veg.png";
import DialogContentText from '@mui/material/DialogContentText';
import { ListItemText } from "@mui/material";
import RupeeIcon from '@mui/icons-material/CurrencyRupee';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Favorite from '@mui/icons-material/Favorite';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

function ControlledCheckbox(props) {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (checked) {
            axios
                .post("http://localhost:4000/food/remove_fav", { name: props.name, email: localStorage.getItem("email") })
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
                .post("http://localhost:4000/food/addfav", { name: props.name, email: localStorage.getItem("email"), vendor_email: props.email, price: props.price, vendor_shop: props.shop })
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

    React.useEffect(() => {
        axios
            .post("http://localhost:4000/food/favorites", { email: localStorage.getItem("email") })
            .then((response) => {
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].name == props.name) {
                        setChecked(true)
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


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
            tempBill = tempBill - props.price * props.quantity
            props.setBill(tempBill)

            console.log("removed" + "     " + tempBill)

        }
        else {
            console.log("Adding")
            let temp = [...props.AddOns]
            temp[props.AddOns.length] = { name: props.name, price: props.price }

            let tempBill = props.bill
            tempBill = tempBill + props.price * props.quantity
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
    console.log(bill)
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
            bill: bill,
            addon_name: addon_name,
            addon_price: addon_price
        }
        console.log(query)
        axios
            .post("http://localhost:4000/buyer/wallet_balance", { email: localStorage.getItem("email") })
            .then((wal) => {
                let balance = wal.data
                if (balance >= query.bill) {
                    axios
                        .put("http://localhost:4000/buyer/sub_wallet_balance", { email: localStorage.getItem("email"), wallet: query.bill })
                        .then((res) => {
                            axios
                                .post("http://localhost:4000/order/place_order", query)
                                .then((res) => {
                                    console.log(res);
                                    if (res.status == 200) {
                                        alert("Order Placed");
                                    }
                                })
                                .catch((err) => {
                                    axios
                                        .put("http://localhost:4000/buyer/add_wallet_balance", { email: localStorage.getItem("email"), wallet: query.bill })
                                        .then((res) => {
                                            console.log(res);
                                            alert("Order Failed !! Amount Refunded!")
                                        })
                                        .catch((err) => {
                                            alert("Gross system erorr! System Crashed ;(")
                                        });

                                    console.log(err);
                                });
                        }
                        )
                        .catch((err) => {

                            console.log(err);
                            alert("Order Failed")
                        }
                        );
                }
                else {
                    alert("Insufficient Balance !!")
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Unable To Place Order" + err)
            });



        setOpen(false);
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Order Now
            </Button>
            <Dialog id={props.id} open=
                {(!props.disabled && open)} onClose={handleClose}>
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
                        onChange={(e) => {
                            let tempBill = bill

                            tempBill = tempBill + (e.target.value - quantity) * price
                            setQuantity(e.target.value)
                            setBill(tempBill)

                        }}
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
                                                <ControlledCheckbox2 quantity={quantity} mrp={props.price} bill={bill} setBill={setBill} AddOns={AddOns} setAddOns={setAddOns} name={name} price={props.addon_price[index]} />
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
    const [sclosed, setclose] = useState([]);
    const [sopen, setopen] = useState([]);
    const [CLOSEDARR, setCLOSEDARR] = useState([]);
    const [OPENARR, setOPENARR] = useState([]);
    const [sortRate, setSortRate] = useState(true);
    const [search, setSearch] = useState("")
    localStorage.setItem("edit_menu", "0");

    useEffect(() => {
        axios
            .get("http://localhost:4000/food/orderItems")
            .then((response) => {
                axios
                    .get("http://localhost:4000/shops")
                    .then(res => {
                        let openShops = []
                        let closedShops = []
                        let open = []
                        let closed = []
                        for (var i = 0; i < response.data.length; i++) {
                            if (res.data.open.includes(response.data[i].vendor_email, 0)) {
                                open.push(response.data[i])
                                if (!openShops.includes(response.data[i].vendor_email, 0)) {
                                    openShops.push(response.data[i].vendor_email)
                                }
                            }
                            else {
                                closed.push(response.data[i])
                                if (!closedShops.includes(response.data[i].vendor_email, 0)) {
                                    closedShops.push(response.data[i].vendor_email)
                                }
                            }
                        }
                        setclose(closedShops)
                        setCLOSEDARR(closed)
                        setOPENARR(open)
                        setopen(openShops)
                        console.log(closedShops)
                        console.log(openShops)
                        let final = [...open, ...closed]
                        setUsers(final);
                        setSortedUsers(response.data);
                        setSearchText("");
                    })
                    .catch(err => {
                        console.log(err)
                        alert("Failed to fetch Data" + err)
                    });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
            });
        ;
    }, []);
    function handleEdit(props) {

        localStorage.setItem("item_name_editing", props.name);
        if (edit_menu === "0") {
            setEditMenu("1");
        } else {
            setEditMenu("0");
        }


    }

    const sortPrice = () => {
        let otemp = [...OPENARR]
        let ctemp = [...CLOSEDARR]
        const flag = sortName;
        otemp.sort((a, b) => {
            if (a.price != undefined && b.price != undefined) {
                return (1 - flag * 2) * (a.price - b.price);
            } else {
                return 1;
            }
        });
        ctemp.sort((a, b) => {
            if (a.price != undefined && b.price != undefined) {
                return (1 - flag * 2) * (a.price - b.price);
            } else {
                return 1;
            }
        });
        setOPENARR(otemp)
        setCLOSEDARR(ctemp)
        let temp = [...OPENARR, ...CLOSEDARR]
        setUsers(temp);
        setSortName(!sortName);
    };

    const sortRateF = () => {
        let otemp = [...OPENARR]
        let ctemp = [...CLOSEDARR]
        const flag = sortRate;
        otemp.sort((a, b) => {
            if (a.rating != undefined && b.rating != undefined) {
                return (1 - flag * 2) * (a.rating - b.rating);
            } else {
                return 1;
            }
        });
        ctemp.sort((a, b) => {
            if (a.rating != undefined && b.rating != undefined) {
                return (1 - flag * 2) * (a.rating - b.rating);
            } else {
                return 1;
            }
        });
        setOPENARR(otemp)
        setCLOSEDARR(ctemp)
        let temp = [...OPENARR, ...CLOSEDARR]
        setUsers(temp);
        setSortRate(!sortRate);
    };

    const customFunction = (event) => {
        console.log(event.target.value);
        setSearch(event.target.value);
    };
    console.log(sclosed)
    console.log(sopen)
    return (
        edit_menu === "0" ? (
            <Grid>
                <Grid container>
                    <Grid item xs={12} md={9} lg={9}>
                        <List component="nav" aria-label="mailbox folders">
                            <TextField
                                id="standard-basic"
                                label="Search"
                                value={search}
                                fullWidth
                                onChange={customFunction}
                            />
                        </List>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item Name</TableCell>
                                        <TableCell>Food Type</TableCell>
                                        <TableCell>
                                            <div>
                                                <Button onClick={sortPrice}>
                                                    {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                                </Button>
                                                Price
                                            </div>
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
                                            <Button onClick={sortRateF}>
                                                {sortRate ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                            </Button>
                                            Rating
                                        </TableCell>
                                        <TableCell>
                                            Order
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, ind) => (
                                        <TableRow key={ind}
                                            bgcolor={sclosed.includes(user.vendor_email) ? "lightgrey" : "white"}
                                        >

                                            <TableCell>{user.name}
                                            </TableCell>
                                            <TableCell>
                                                {user.food_type == "veg" ? <img src={Veg} alt="veg" height="20px" width="20px" /> : <img src={Nonveg} alt="nonveg" height="20px" width="20px" />
                                                }</TableCell>
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
                                                <FormDialog disabled={sclosed.includes(user.vendor_email)} id={user._id} name={user.name} price={user.price} shop={user.vendor_shop} vendor_email={user.vendor_email} addon_name={user.addon_name} buyer_email={localStorage.getItem("email")} addon_price={user.addon_price} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid >
        ) : (<EditMenu />));
};

export default UsersList;

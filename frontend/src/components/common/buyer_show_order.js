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
import veg from "../images/veg.png";
import nonveg from "../images/non-veg.png";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/LocalDining';
import CheckBox from "./checkbox"
const UsersList = (props) => {
    const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [edit_menu, setEditMenu] = useState("0");
    localStorage.setItem("edit_menu", "0");

    useEffect(() => {
        axios
            .post("http://localhost:4000/order/myorder", { buyer_email: localStorage.getItem("email") })
            .then((response) => {
                setUsers(response.data);
                setSortedUsers(response.data);
                setSearchText("");
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
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
                                            Time-Placed
                                        </TableCell>
                                        <TableCell>
                                            Status
                                        </TableCell>

                                        <TableCell>
                                            Rating
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ind}</TableCell>
                                            <TableCell>{user.item_name}</TableCell>
                                            <TableCell>{user.bill}</TableCell>
                                            <TableCell>{user.vendor_shop}</TableCell>
                                            <TableCell>
                                                {
                                                    user.addon_name.map((addon, ind) => (
                                                        <div key={ind}>
                                                            {addon}{"  "}
                                                        </div>
                                                    ))
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {user.placed_time}
                                            </TableCell>
                                            <TableCell>
                                        
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    disabled={(user.status === "READY FOR PICKUP") ? false : true}
                                                    onClick={() => {
                                                        if (user.status === "READY FOR PICKUP") {
                                                            {
                                                                axios
                                                                    .put("http://localhost:4000/order/changestate", { _id: user._id, state: "COMPLETED" })
                                                                    .then((res) => {
                                                                        console.log(res);
                                                                    })
                                                                    .catch((err) => {
                                                                        console.log(err);
                                                                    });

                                                            }
                                                        }
                                                    }}
                                                >
                                                    {user.status}
                                                </Button>


                                            </TableCell>
                                            <TableCell>
                                                {user.rating}
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

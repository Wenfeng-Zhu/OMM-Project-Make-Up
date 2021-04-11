import React, {useEffect, useState} from "react";
import {makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";


const useStyles = makeStyles({
    table: {
        minWidth: 200,
    },
});

export default function UsersList() {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        fetch('http://localhost:5000/users/usersList')
            .then(res => res.json())
            .then(result => {
                setIsLoaded(true);
                setRows(result);
            }, (error) => {
                console.log(error)
            })
    }, [])
    if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Password&nbsp;(After encryption)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.email}>
                                <TableCell component="th" scope="row">
                                    {row.email}
                                </TableCell>
                                <TableCell align="right">{row.username}</TableCell>
                                <TableCell align="right">{row.password}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

}



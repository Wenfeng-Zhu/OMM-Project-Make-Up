import {Snackbar} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function Warning(props) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setOpen(false);
    };
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.type}>
                This is a success message!
            </Alert>
        </Snackbar>
    )
}
export default Warning

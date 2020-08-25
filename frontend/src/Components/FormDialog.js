import React from 'react';
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function FormDialog(props) {
    const otp = props.otp;
    const [open, setOpen] = React.useState(true);
    const [subOtp, setSubOtp] = React.useState('')  
    const [otpError, setOtpError] = React.useState('')
    const [resetPassword, setResetPassword] = React.useState(false)
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e) => {
        setSubOtp(e.target.value)
    }
    const handleSubmit = () => {
        console.log(otp === Number(subOtp));
        if (otp === Number(subOtp)) {
            setResetPassword(true)
            setOtpError('')
        }
        else {
            setOtpError('Incorrect OTP');
        }
    }
    return (
        <div>
            {resetPassword?<Redirect to="/resetPassword" />:null}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Verification</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the otp that has been sent to your email address
                    </DialogContentText>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="otp"
                        label="OTP"
                        type="email"
                        
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type='submit' onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                    <div><span className = 'text-danger'>{otpError}</span></div>
                        
                </DialogActions>
            </Dialog>
        </div>
    );
}
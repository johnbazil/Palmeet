import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FormControl, InputLabel, Input, withStyles } from '@material-ui/core';
const userBackendUrl = 'http://localhost:2000/user'
const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
})

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passRes: {
                email : '',
                newPassword: '',
                confirmPassword: ''
            },
            passResErrorMessage: {
                email : '',
                newPassword: '',
                confirmPassword: ''
            },
            passResValid: {
                email : false,
                newPassword: false,
                confirmPassword: false,
                buttonActive: false
            },
            email: this.props.email,
            loadLogin: false,
            errorMessage: '',
            spin: true
        }
    }

    resetHandleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
        this.validateField(name, value)
    }
    resetValidateField = (name, value) => {
        var message;
        var { passResErrorMessage } = this.state;
        var { passResValid } = this.state;
        switch (name) {
            case 'email':
                let emailRegex = new RegExp(/^[A-z][A-z0-9.]+@[a-z]+\.[a-z]{2,3}$/)
                value === "" ? message = "Please enter your email Id" : emailRegex.test(value) ? message = '' : message = 'Invalid Email ID';
                break;
            case 'newPassword':
                let passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*[!@#$&*%&])(?=.*[0-9])(?=.*[a-z]).{7,20}$/);
                value === "" ? message = "Please enter your password" : passwordRegex.test(value) ? message = '' : message = 'Invalid password';
                break;
            case 'confirmPassword':
                value === "" ? message = "Please enter your password" : this.state.passRes.newPassword === value ? message = '' : message = 'Please enter the same password';
                break;
            default:
                break;
        }
        passResErrorMessage[name] = message;
        message === '' ? passResValid[name] = true : passResValid[name] = false;
        passResValid.buttonActive = passResValid.email && passResValid.newPassword && passResValid.confirmPassword;
        this.setState({ passResErrorMessage: passResErrorMessage, passResValid: passResValid })
    }
    changePassword = () => {
        let form = {}
        form.email = this.state.passRes.email;
        form.password = this.state.passRes.newPassword
        axios.post(userBackendUrl+'/changePassword', form)
            .then(response => {
                this.setState({ loadLogin: true })
            })
            .catch(error => {
                this.setState({ errorMessage: error.response ? error.response.data.message : error.message })
            })
    }

    Copyright = () => {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://palmeet.com/">
                    Palmeet
        </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    render() {
        const { email,  newPassword, confirmPassword } = this.state.passRes
        const { passResErrorMessage } = this.state;
        const { classes } = this.props;
        if (sessionStorage.getItem('userId') || localStorage.getItem('userId')) {
            return <Redirect to='/home' />
        }
        if (this.state.loadLogin) {
            return <Redirect to='/login' />
        }
        else {
            return (
                <div className="col-md-lg-4 offset-md-lg-4 col-xs-sm-12 my-auto ">
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Reset Password
                            </Typography>
                            <form className={classes.form} onSubmit={this.changePassword} >
                                <FormControl margin='normal' required fullWidth>
                                    <InputLabel htmlFor='email' >Email Address</InputLabel>
                                    <Input autoComplete='email' autoFocus
                                        id='email' name='email' value={email} onChange={this.handleChange} />
                                    <span className='text-danger'>{passResErrorMessage.email}</span>
                                </FormControl>
                                <FormControl margin='normal' required fullWidth>
                                    <InputLabel htmlFor='newPassword' >New Password</InputLabel>
                                    <Input type='password'
                                        id='newPassword' name='newPassword' value={newPassword} onChange={this.resetHandleChange} />
                                    <span className='text-danger'>{passResErrorMessage.newPassword}</span>
                                </FormControl>
                                <FormControl margin='normal' required fullWidth>
                                    <InputLabel htmlFor='confirmPassword' >Confirm Password</InputLabel>
                                    <Input type='password'
                                        id='confirmPassword' name='confirmPassword' value={confirmPassword} onChange={this.resetHandleChange} />
                                    <span className='text-danger'>{passResErrorMessage.confirmPassword}</span>
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                                <Link href="/login" variant="body2">
                                    {"Go to login Page"}
                                </Link>
                            </form>
                        </div>
                        <Box mt={8}>
                            {this.Copyright}
                        </Box>
                    </Container>
                </div>
            );
        }
    }
}
export default withStyles(styles)(ResetPassword)
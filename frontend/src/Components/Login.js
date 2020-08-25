import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FormControl, InputLabel, Input, withStyles } from '@material-ui/core';
import FormDialog from './FormDialog';
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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                password: '',
            },
            formErrorMessage: {
                email: '',
                password: ''
            },
            formValid: {
                email: false,
                password: false,
                buttonActive: false
            },
            successMessage: '',
            errorMessage: '',
            loadRegister: false,
            spin: true,
            rememberMe: false,
            forgotPassword: false,
            resetPassword: false,
            otpError: '',
            otp: ''
        }
    }

    componentWillMount = () => {
        localStorage.clear()
    }
    handleCheck = (e) => {
        this.setState({ rememberMe: e.target.checked })
    }

    handleClick = () => {
        this.forgotPass();
    }
    forgotPass = () => {
        console.log(this.state.form.email);
        axios.get(userBackendUrl + '/forgotpassword/' + this.state.form.email)
            .then(response => {
                console.log(response.data);
                this.setState({ otp: response.data, forgotPassword: true })
            })
            .catch(error => {
                this.setState({ otpError: error.response ? error.response.data.message : error.message })
            })
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
        this.validateField(name, value)
    }
    validateField = (name, value) => {
        var message;
        var { formErrorMessage } = this.state;
        var { formValid } = this.state;
        switch (name) {
            case 'email':
                let emailRegex = new RegExp(/^[A-z][A-z0-9.]+@[a-z]+\.[a-z]{2,3}$/)
                value === "" ? message = "Please enter your email Id" : emailRegex.test(value) ? message = '' : message = 'Invalid Email ID';
                break;
            case 'password':
                let passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*[!@#$&*%&])(?=.*[0-9])(?=.*[a-z]).{7,20}$/);
                value === "" ? message = "Please enter your password" : passwordRegex.test(value) ? message = '' : message = 'Invalid password';
                break;
            default:
                break;
        }
        formErrorMessage[name] = message;
        message === '' ? formValid[name] = true : formValid[name] = false;
        formValid.buttonActive = formValid.email && formValid.password;
        this.setState({ formErrorMessage: formErrorMessage, formValid: formValid })
    }
    submitSignIn = (e) => {
        e.preventDefault();
        const loginData = { email: this.state.form.email, password: this.state.form.password }
        axios.post(userBackendUrl + '/login', loginData)
            .then(response => {
                sessionStorage.setItem('userId', response.data.userId);
                sessionStorage.setItem('userName', response.data.userName);
                if (this.state.rememberMe) {
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('userName', response.data.userName);
                }
                this.setState({ successMessage: "Successfully logged in" });

            })
            .catch(error => {
                if (error.response) {
                    this.setState({ errorMessage: error.response.data.message })
                }
                else {
                    this.setState({ errorMessage: error.message })
                }
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
        const { email, password } = this.state.form;
        const { formErrorMessage } = this.state;
        const { classes } = this.props;
        if (sessionStorage.getItem('userId') || localStorage.getItem('userId')) {
            return <Redirect to='/home' />
        }
        if (this.state.successMessage !== '') {
            return <Redirect to='/register' />
        }
        else {
            return (
                <div className="col-md-lg-4 offset-md-lg-4 col-xs-sm-12 ">
                    <Container component="main" className="m-auto" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            {console.log(this.state.forgotPassword)}
                            {this.state.forgotPassword ? <FormDialog otp={this.state.otp} email={this.state.form.email} /> : null}
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Login to continue
                            </Typography>
                            <form className={classes.form} onSubmit={this.submitSignIn} >
                                <FormControl margin='normal' required fullWidth>
                                    <InputLabel htmlFor='email' >Email Address</InputLabel>
                                    <Input autoComplete='email' autoFocus
                                        id='email' name='email' value={email} onChange={this.handleChange} />
                                    <span className='text-danger'>{formErrorMessage.email}</span>
                                </FormControl>
                                <FormControl margin='normal' required fullWidth>
                                    <InputLabel htmlFor='passord' >Password</InputLabel>
                                    <Input type='password'
                                        id='password' name='password' value={password} onChange={this.handleChange} />
                                    <span className='text-danger'>{formErrorMessage.password}</span>
                                </FormControl>
                                <FormControlLabel
                                    control={<Checkbox value="remember" onChange={this.handleCheck} color="primary" />}
                                    label="Remember me"
                                /><br />
                                <span className='text-danger'>{this.state.errorMessage} </span>
                                <span className='text-danger'>{this.state.successMessage} </span>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link><Link onClick={this.handleClick} variant="body2">
                                            {'Forgot password?'}
                                        </Link></Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
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
export default withStyles(styles)(Login)
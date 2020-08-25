import React, { Component } from "react";
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import { Redirect } from 'react-router-dom';
import { Link, withStyles, Box } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
const userBackendUrl = 'http://localhost:2000/user';
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
    },
})
class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginform: {
                name: "",
                email: "",
                contactNo: "",
                password: ""
            },
            loginformErrorMessage: {
                name: "",
                email: "",
                contactNo: "",
                password: ""
            },
            loginformValid: {
                name: false,
                email: false,
                contactNo: false,
                password: false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            loadlogin: false,
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { loginform } = this.state;
        this.setState({
            loginform: { ...loginform, [name]: value }
        });
        this.validateField(name, value);
        // console.log(this.state.loginform[name], name);
    }

    register = () => {
        const { loginform } = this.state;
        console.log(loginform);
        axios.post(userBackendUrl+'/register', loginform)
            .then(response => {
                this.setState({ loadlogin: true, successMessage: response.data })

            }).catch(error => {
                console.log(error);
                let errorstatus = error.message.substr(-3,);
                if (Number(errorstatus) === 406) {
                    this.setState({ errorMessage: "The Email Id has already been registered" })
                }
                else {
                    this.setState({ errorMessage: "Registration failed! Please try again" })
                }
            })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.register();
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.loginformErrorMessage;
        let formValid = this.state.loginformValid;
        switch (fieldName) {
            case "name":
                let nameRegex = /^[A-z]([A-z \s]+)[A-z]$/
                if (!value || value === "") {
                    fieldValidationErrors.name = "Please enter your name";
                    formValid.name = false;
                } else if (!value.match(nameRegex)) {
                    fieldValidationErrors.name = "Name should contain only alphabets and space";
                    formValid.name = false;
                } else {
                    fieldValidationErrors.name = "";
                    formValid.name = true;
                }
                break;
            case "email":
                let emailRegex = /^([a-z 0-9]+)@([a-z]+)(\.com)$/
                if (!value || value === "") {
                    fieldValidationErrors.email = "Please enter your Email ID";
                    formValid.email = false;
                } else if (!value.match(emailRegex)) {
                    fieldValidationErrors.email = "Email ID should be in the format example@emp.com";
                    formValid.email = false;
                } else {
                    fieldValidationErrors.email = "";
                    formValid.email = true;
                }
                break;
            case "contactNo":
                let cnoRegex = /^[1-9]\d{9}$/
                if (!value || value === "") {
                    fieldValidationErrors.contactNo = "Please enter your contact Number";
                    formValid.contactNo = false;
                } else if (!value.match(cnoRegex)) {
                    fieldValidationErrors.contactNo = "Contact number should be a valid 10 digit number";
                    formValid.contactNo = false;
                } else {
                    fieldValidationErrors.contactNo = "";
                    formValid.contactNo = true;
                }
                break;
            case "password":
                if (!value || value === "") {
                    fieldValidationErrors.password = "Password is manadatory";
                    formValid.password = false;
                } else if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/) && value.match(/[!@#$%^&*]/))) {
                    fieldValidationErrors.password = "Please Enter a valid password"
                    formValid.password = false;
                } else {
                    fieldValidationErrors.password = "";
                    formValid.password = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive = formValid.contactNo && formValid.password && formValid.name && formValid.email;
        this.setState({
            loginformErrorMessage: fieldValidationErrors,
            loginformValid: formValid
        });
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
        const { classes } = this.props;
        if (this.state.loadlogin === true) {
            return <Redirect to={'/login'} />
        }
        else {
            return (
                <div className="col-md-lg-4 offset-md-lg-4 col-xs-sm-12 ">
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}  >
                            <Avatar className={classes.avatar}>
                                <PersonAddIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">Join Us</Typography>
                            <form className={classes.form} onSubmit={this.handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    onChange={this.handleChange}
                                />
                                {this.state.loginformErrorMessage.name ? (<span className="text-danger">{this.state.loginformErrorMessage.name}</span>) : null}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Id"
                                    name="email"
                                    autoComplete="email"
                                    onChange={this.handleChange}
                                />
                                {this.state.loginformErrorMessage.email ? (<span className="text-danger">{this.state.loginformErrorMessage.email} </span>) : null}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="contactNo"
                                    label="Contact Number"
                                    name="contactNo"
                                    onChange={this.handleChange}
                                />
                                {this.state.loginformErrorMessage.contactNo ? (<span className="text-danger">{this.state.loginformErrorMessage.contactNo}</span>) : null}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handleChange}
                                />
                                {this.state.loginformErrorMessage.password ? (<span className="text-danger">{this.state.loginformErrorMessage.password} </span>) : null}
                                <p style={{ textAlign: "left" }}>* marked feilds are mandatory </p><br />
                                {this.state.errorMessage ? (<div><span className="text-danger">{this.state.errorMessage} </span></div>) : null}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={!this.state.loginformValid.buttonActive}
                                >
                                    Register
                                </Button>
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

export default withStyles(styles)(Register);
import React, { Component } from 'react'
import Footer from '../../components/Footer';
import {
    Container,
    Form
} from './styles';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ fromErrors, ...rest }) => {
    let valid = true;

    //validate form errors being empty
    Object.values(fromErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    //valdate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false); 
    });
    return valid;
};

class Contact extends Component {
    state = {
        firstName: null,
        lastName: null,
        email: null, 
        formErrors: {
            firstName: "",
            lastName: "",
            email: "",
        }
    };
    
    handleSubmit = e => {
        e.preventDefault();

        if(formValid(this.state)) {
            console.log(`
            --SUBMITTING--
            First Name: ${this.state.firstName}
            Last Name: ${this.state.lastName}
            Email: ${this.state.email}
            Password: ${this.state.password}
            `);
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };
    
    handleChange = e => {
        e.preventDefault();
        const {name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch(name) {
            case "firstName": 
                formErrors.firstName =
                  value.length < 3 ? "minimum 3 Characters required" : "";
                break;
            case "lastName": 
                formErrors.lastName = 
                   value.length < 3 ? "minimum 3 Characters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                  ? ""
                  : "invalid email address";
                break;
            case "password": 
                formErrors.password = 
                    value.length < 6 ? "minimum 6 Characters required" : "";
                break;
            default: 
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }

    render() {
        const { formErrors } = this.state;

        return (
            <>
              <Container>
                  <Form onSubmit = {this.handleSubmit} noValidate>
                    <div className="header">
                     <div className="header__name">
                        <label htmlFor="firstName">*First Name</label>
                        <input 
                            className={formErrors.firstName.length > 0 ? "error" : null}
                            name="firstName"
                            type="text"
                            onChange= {this.handleChange}
                        />
                        {formErrors.firstName.length > 0 && (
                            <span className="errorMessage">{formErrors.firstName}</span>
                        )}
                     </div>
                     
                     <div className="header__name">
                        <label htmlFor="lastName">*Last Name</label>
                        <input 
                          className={formErrors.lastName.length > 0 ? "error" : null}
                          name="lastName"
                          type="text"
                          onChange={this.handleChange}
                        />
                        {formErrors.lastName.length > 0 && (
                            <span className="errorMessage">{formErrors.lastName}</span>
                        )}
                     </div>
                    </div>

                    <label htmlFor="email">*Email</label>
                    <input 
                        className={formErrors.email.length > 0 ? "error" : null}
                        type="email"
                        name="email"
                        noValidate
                        onChange={this.handleChange}
                    />
                    {formErrors.email.length > 0 && (
                        <span className="errorMessage">{formErrors.email}</span>
                    )}

                    <label htmlFor="subject">*Subject</label>
                    <input name="subject" />

                    <label htmlFor="comment">*Comment</label>
                    <textarea name="comment" col="30" row="15"></textarea>

                    <button type="submit">submit</button>
                  </Form>
              </Container>  
              <Footer />
            </>
        )
    }
}
export default Contact ;
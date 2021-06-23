import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import FormElement from "@paprika/form-element";
import Input from "@paprika/input";
import Heading from "@paprika/heading";
import Button from "@paprika/button";
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";
import { config } from "../../config";

import './SignUp.css';

const { Label, Content, Error } = FormElement;

const db = firebase.firestore();

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null);    
  const [emailAddress, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [pw, setPw] = useState(null);
  const [confirmPw, setConfirmPw] = useState(null);
  const [error, setError] = useState(false);
  const [formError, setFormError] = useState({ show: false, message: '' });

  const history = useHistory();

  function checkPassword() {
    if(pw) {
      if(pw === confirmPw && pw.length >= 6) {
        setError(false);
      } else {
        setError(true);
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();    
    config.auth().createUserWithEmailAndPassword(emailAddress, pw).then(
      (userCredential) => {
        const user = userCredential.user;

        if (user) {
          user.updateProfile({
            displayName: name
          });
        }

        db.collection('userCollection').doc(user.uid).set(
          {
            uid: user.uid,
            firstLastName: name,
            email: emailAddress,
            phoneNumber: phone,
            role: "Not assigned"
          }
        );

        setCurrentUser(true);
      }
    ).catch((error) => {
      setFormError({ show: !formError.show, message: error.message });
    })
  };

  function isButtonDisabled() {
    if(name && emailAddress && phone && confirmPw && pw && !error) {
      return false;
    } else {
      return true;
    }
  }

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Heading level={1}>Sign Up</Heading>
      <form>
        <FormElement isRequired size={FormElement.types.size.LARGE}>
          <Label>Email address</Label>
          <Content>
            {a11yProps => (
              <Input size={Input.types.size.LARGE} type="email" name="email" placeholder="Email address" {...a11yProps} onChange={(e) => setEmail(e.target.value)} />
            )}
          </Content>
        </FormElement>
        <FormElement isRequired size={FormElement.types.size.LARGE}>
          <Label>Password</Label>
          <Content>
            {a11yProps => (
              <Input size={Input.types.size.LARGE} type="password" name="password" placeholder="Password" {...a11yProps} onChange={(e) => setPw(e.target.value)} />
            )}
          </Content>
        </FormElement>
        <FormElement isRequired size={FormElement.types.size.LARGE}>
          <Label>Confirm Password</Label>
          <Content>
            {a11yProps => (
              <Input size={Input.types.size.LARGE} onBlur={() => checkPassword()} type="password" name="password_confirm" placeholder="Confirm password" {...a11yProps} onChange={(e) => setConfirmPw(e.target.value)} />
            )}
          </Content>
          {error && <Error>Passwords are not the same and password must be greater than 6 characters</Error>}
        </FormElement>
        <FormElement isRequired size={FormElement.types.size.LARGE}>
          <Label>Phone number</Label>
          <Content>
            {a11yProps => (
              <Input size={Input.types.size.LARGE} type="tel" name="phoneNumber" placeholder="Phone number" {...a11yProps} onChange={(e) => setPhone(e.target.value)}/>
            )}
          </Content>
        </FormElement>
        <FormElement isRequired size={FormElement.types.size.LARGE}>
          <Label>First and last name</Label>
          <Content>
            {a11yProps => (
              <Input size={Input.types.size.LARGE} type="text" name="firstLastName" placeholder="First and last name" {...a11yProps} onChange={(e) => setName(e.target.value)}/>
            )}
          </Content>
          {formError.show && (
            <Error>
              {formError.message}
            </Error>
          )}
        </FormElement>
        <p>Note: Phone number, name and email is saved for covid tracing.</p>
        <Button size={Button.types.size.LARGE} kind="primary" type="submit" onClick={handleSubmit} isDisabled={isButtonDisabled()}>Sign up</Button>
        <Button style={{"marginLeft": "16px"}} size={Button.types.size.LARGE} onClick={() => history.push('/')}>Back to Log in</Button>
      </form>
    </>
  );
};

export default SignUp;

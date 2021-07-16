import React, { useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Button from "@paprika/button";
import FormElement from "@paprika/form-element";
import Heading from "@paprika/heading";
import Input from "@paprika/input";
import { AuthContext } from "../Auth/Auth";
import { config } from "../../config";

import './Home.css';

const { Label, Content, Error } = FormElement;

const Home = () => {
  const history = useHistory();

  const [formEmail, setFormEmail] = React.useState(null);
  const [formPw, setFormPw] = React.useState(null);
  const [wrongPw, setWrongPw] = React.useState({ show: false, message: ""});

  const handleSubmit = (e) => {
    e.preventDefault();
    config.auth().signInWithEmailAndPassword(formEmail, formPw).then(
      (userCredential) => {
        console.log(userCredential);
      }).catch((error) => {
        setWrongPw({ show: !wrongPw.show, message: error.message });
    });
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="home-page">
      <header>
        <Heading level={1}>RGAC Sunday Service</Heading>
      </header>
      <FormElement size={FormElement.types.size.LARGE}>
        <Label>Email address</Label>
        <Content>
          {a11yProps => (
            <Input size={Input.types.size.LARGE} type="email" onChange={(e) => setFormEmail(e.target.value)} placeholder="Email address" {...a11yProps} />
          )}
        </Content>
      </FormElement>
      <FormElement size={FormElement.types.size.LARGE}>
        <Label>Password</Label>
        <Content>
          {a11yProps => (
            <Input size={Input.types.size.LARGE} type="password" onChange={(e) => setFormPw(e.target.value)} placeholder="Password" {...a11yProps} />
          )}
        </Content>
        {wrongPw.show && (
          <Error>
            {wrongPw.message}
          </Error>
        )}
      </FormElement>
      <Button size={Button.types.size.LARGE} kind="primary" onClick={handleSubmit}>Log in</Button>
      <Button style={{"margin-left": "16px"}} size={Button.types.size.LARGE} onClick={() => history.push('/signup')}>
        Sign Up
      </Button>
    </div>
  );
};

export default Home;

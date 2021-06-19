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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      config.auth().signInWithEmailAndPassword(formEmail, formPw);
    } catch (error) {
      alert(error);
    }
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="home-page">
      <header>
        <Heading level={1}>RGAC Tuesday Basketball
        </Heading>
        <Button onClick={() => history.push('/signup')}>
          Sign Up
        </Button>
      </header>
      <FormElement>
        <Label>Email address</Label>
        <Content>
          {a11yProps => (
            <Input type="email" onChange={(e) => setFormEmail(e.target.value)} placeholder="Email address" {...a11yProps} />
          )}
        </Content>
      </FormElement>
      <FormElement>
        <Label>Password</Label>
        <Content>
          {a11yProps => (
            <Input type="password" onChange={(e) => setFormPw(e.target.value)} placeholder="Password" {...a11yProps} />
          )}
        </Content>
      </FormElement>
      <Button kind="primary" onClick={handleSubmit}>Log in</Button>
    </div>
  );
};

export default Home;

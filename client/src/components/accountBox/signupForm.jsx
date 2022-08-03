import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import Auth from"../../utils/auth";
export function SignupForm(props) {
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const { switchToSignin } = useContext(AccountContext);
  const [userinfo, setUserinfo] = useState({});

  async function signup(event) {
    console.log(userinfo);
    const emailvalid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userinfo.email);
    if (!emailvalid) {
      alert("Please enter a valid email address");
      return;
    }
    if (userinfo.password !== userinfo.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { data } = await addUser({
        variables: { ...userinfo },
      });
      Auth.login(data.addUser.token);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function onchange(event) {
    const { name, value } = event.target;
    setUserinfo({ ...userinfo, [name]: value });
  }
  if (error) {
    return <h1>Error {error}</h1>;
  }
  return (
    <BoxContainer>
      <FormContainer>
        <Input
          onChange={onchange}
          value={userinfo.username}
          type="text"
          name="username"
          placeholder="User Name"
        />
        <Input
          onChange={onchange}
          value={userinfo.email}
          type="email"
          name="email"
          placeholder="Email"
        />
        <Input
          onChange={onchange}
          value={userinfo.password}
          type="password"
          name="password"
          placeholder="Password"
        />
        <Input
          onChange={onchange}
          value={userinfo.confirmPassword}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton onClick={signup} type="submit">
        Signup
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

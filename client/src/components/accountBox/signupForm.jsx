import React, { useContext, useState } from "react";
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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
const [userinfo, setUserinfo] = useState({});
function signup (event) {
console.log (userinfo);
if( /(.+)@(.+){2,}\.(.+){2,}/.test(userinfo.email) ){
console.log("email is valid");
  // valid email
} else {
  // invalid email
  console.log("email is invalid");
}
}

function onchange (event) {
  const { name, value } = event.target;
  setUserinfo ({...userinfo, [name]: value});
}



  return (
    <BoxContainer>
      <FormContainer>

        <Input onChange={onchange} value={userinfo.fullName} type="text" name="fullName" placeholder="Full Name" />
        <Input onChange={onchange} value={userinfo.email}type="email" name="email" placeholder="Email" />
        <Input onChange={onchange} value={userinfo.password}type="password" name="password" placeholder="Password" />
        <Input onChange={onchange} value={userinfo.confirmPassword}type="password" name="confirmPassword" placeholder="Confirm Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton onClick={signup} type="submit">Signup</SubmitButton>
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

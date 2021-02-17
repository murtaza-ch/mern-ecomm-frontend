import { Button, Col, Form, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { googleAuth, login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FormContainer from "../components/FormContainer";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const disptach = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    disptach(login(email, password));
  };

  // send Facebook token
  const sendFacebookToken = (userID, accessToken) => {
    // axios
    //   .post(`${process.env.REACT_APP_API_URL}/facebooklogin`, {
    //     userID,
    //     accessToken,
    //   })
    //   .then((res) => {
    //     informParent(res);
    //   })
    //   .catch((err) => {
    //     toast.error("Facebook Auth Error!");
    //   });
  };

  // send google token
  const sendGoogleToken = (tokenID) => {
    disptach(googleAuth(tokenID));
  };

  // if success we need to authenticate the user and redirect
  const informParent = (response) => {
    console.log(response);
    // authenticate(response, () => {
    //   isAuth() && isAuth.role === "admin"
    //     ? history.push("/admin")
    //     : history.push("/active");
    // });
  };

  // Get response from google
  const responseGoogle = (response) => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };

  // Get response from facebook
  const responseFacebook = (response) => {
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken);
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
        <Row>
          <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="btn btn-primary"
              >
                <span className="ml-4">Sign In with Google</span>
              </button>
            )}
          ></GoogleLogin>
          <FacebookLogin
            appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
            autoLoad={false}
            callback={responseFacebook}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="btn btn-primary"
              >
                <span className="ml-4">Sign In with Facebook</span>
              </button>
            )}
          ></FacebookLogin>
        </Row>
      </Form>

      <Row>
        <Col>
          {" "}
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;

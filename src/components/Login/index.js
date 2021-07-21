import { Button, Col, Row, Typography } from "antd";
import React from "react";
import firebase, { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";

const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const Login = () => {
  const handleLogin = async (provider) => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
    console.log(additionalUserInfo);
    console.log(user);
    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName?.toLowerCase()),
      });
    }
  };

  return (
    <Row justify="center" style={{ height: 800 }}>
      <Col span={8}>
        <Title style={{ textAlign: "center" }} level={3}>
          Chat App
        </Title>
        <Button onClick={() => handleLogin(googleProvider)} style={{ width: "100%", marginBottom: 15 }}>
          Login by Google
        </Button>
        <Button onClick={() => handleLogin(fbProvider)} style={{ width: "100%" }}>
          Login by Facebook
        </Button>
      </Col>
    </Row>
  );
};

export default Login;

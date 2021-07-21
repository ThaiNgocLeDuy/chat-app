import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/config";

export const AuthContext = createContext();

const iconLoading = <LoadingOutlined style={{ fontSize: 100 }} />;

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        setIsLoading(false);
        history.push("/");
        return;
      }

      // reset user info
      setUser({});
      setIsLoading(false);
      history.push("/login");
    });

    // clean function
    return () => {
      unsubscibed();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? (
        <Spin
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          indicator={iconLoading}
        />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

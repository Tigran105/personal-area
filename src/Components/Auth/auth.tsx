import React, { useEffect, useState } from "react";
import "./auth.scss";
import Title from "antd/lib/typography/Title";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { IUser } from "../../Types/user";
import { login, registration } from "../../Redux/actionCreater";
import { isAuthorized } from "../../Redux/auth";
import { useNavigate } from "react-router";
import { setMessage } from "../../Redux/notification";

const Auth = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const [componentType, changeComponentType] = useState<boolean>(true);

  useEffect(() => {
    dispatch(isAuthorized());
  }, [dispatch]);

  useEffect(() => {
    if (isLogin) {
      navigator("/");
    }
  }, [isLogin, navigator]);

  const onFinish = ({
    email,
    password,
    confirmPassword,
  }: Omit<IUser, "id">) => {
    if (componentType) {
      return dispatch(login({ email, password }));
    }
    if (password !== confirmPassword) {
      return dispatch(setMessage("Check your passwords"));
    }
    return dispatch(registration({ email, password }));
  };

  return (
    <div className="auth-main">
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Title className="module-title">
          {componentType ? "Login" : "Registration"}
        </Title>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        {!componentType && (
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please check your password!",
              },
            ]}
          >
            <Input type="password" placeholder="Confirm Password" />
          </Form.Item>
        )}

        <Form.Item className="buttons">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {componentType ? "Log in" : "Sign Up"}
          </Button>
        </Form.Item>
        <button
          className="component-type"
          onClick={() => changeComponentType(!componentType)}
        >
          {componentType ? "register now!" : "Already have account?"}
        </button>
      </Form>
    </div>
  );
};

export default Auth;

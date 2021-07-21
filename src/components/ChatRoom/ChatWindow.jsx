import { UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/services";
import useFirestore from "../../hooks/useFirestore";
import Message from "./Message";

const { Group } = Avatar;

const { Item } = Form;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const HeaderStyled = styled.div`
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 16px;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyle = styled.div`
  display: flex;
  align-items: center;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const ChatWindow = () => {
  const { selectedRoom, members, setIsInviteMemberVisible } =
    React.useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = React.useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    addDocument("message", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });
    //reset field after submit
    form.resetFields(["message"]);

    // focus to input again after submit
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  };

  const messageConditions = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirestore("message", messageConditions);

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom.name}</p>
              <span className="header__description">
                {selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyle>
              <Button
                onClick={() => setIsInviteMemberVisible(true)}
                type="text"
                icon={<UserAddOutlined />}
              >
                Invite
              </Button>
              <Group maxCount={2} size="small">
                {members.map((member) => (
                  <Tooltip key={member.id} title={member.displayName}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Group>
            </ButtonGroupStyle>
          </HeaderStyled>

          <ContentStyled>
            <MessageListStyled>
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Item name="message">
                <Input
                  ref={inputRef}
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  bordered={false}
                  autoComplete="off"
                  placeholder="Enter message..."
                />
              </Item>
              <Button onClick={handleOnSubmit} type="primary">
                Send
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Please choose room"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </WrapperStyled>
  );
};

export default ChatWindow;

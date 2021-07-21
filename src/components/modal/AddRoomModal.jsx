import { Form, Input, Modal } from "antd";
import React from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/services";

const { Item, useForm } = Form;

const AddRoomModal = () => {
  const { isAddRoomVisible, setIsAddRoomVisible } =
    React.useContext(AppContext);
  const {
    user: { uid },
  } = React.useContext(AuthContext);

  const [form] = useForm();

  const handleOnOk = () => {
    addDocument("rooms", { ...form.getFieldsValue(), members: [uid] });

    //reset all fields
    form.resetFields();

    setIsAddRoomVisible(false);
  };

  const handleOnCancel = () => {
    //reset all fields
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title="Create Room"
        visible={isAddRoomVisible}
        onOk={handleOnOk}
        onCancel={handleOnCancel}
      >
        <Form layout="vertical" form={form}>
          <Item label="Room Name" name="name">
            <Input placeholder="Enter room name" />
          </Item>
          <Item label="Description" name="description">
            <Input placeholder="Enter description" />
          </Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRoomModal;

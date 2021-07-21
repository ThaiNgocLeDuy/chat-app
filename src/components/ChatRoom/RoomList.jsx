import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

const RoomList = () => {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
    useContext(AppContext);
  console.log({ rooms });

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="List of Rooms Chat" key="1">
        {rooms.map((room) => (
          <LinkStyled onClick={() => setSelectedRoomId(room.id)} key={room.id}>
            {room.name}
          </LinkStyled>
        ))}

        <Button
          onClick={handleAddRoom}
          type="text"
          icon={<PlusSquareOutlined />}
          className="add-room"
        >
          Add Room
        </Button>
      </PanelStyled>
    </Collapse>
  );
};

export default RoomList;

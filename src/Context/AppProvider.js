import React from "react";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isAddRoomVisible, setIsAddRoomVisible] = React.useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] =
    React.useState(false);
  const [selectedRoomId, setSelectedRoomId] = React.useState("");

  const {
    user: { uid },
  } = React.useContext(AuthContext);

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore("rooms", roomsCondition);

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const usersCondition = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFirestore("users", usersCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        members,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModal from "./components/modal/AddRoomModal";
import InviteMembersModal from "./components/modal/InviteMembersModal";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/" exact>
              <ChatRoom />
            </Route>
          </Switch>
          <AddRoomModal />
          <InviteMembersModal />
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import web3 from "./web3";
import lottery from "./lottery";
import ManagerFunctions from "./ManagerFunctions";
import CustomerFunctions from "./CustomerFunctions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  UncontrolledDropdown,
  Navbar,
  NavbarBrand,
  Button,
} from "reactstrap";

function App() {
  const [manager, setManager] = useState();
  const [currentUser, setCurrentUser] = useState();

  const getAccounts = async () => {
    const accnts = await web3.eth.getAccounts();
    setCurrentUser(accnts?.[0]);
  };

  useEffect(() => {
    const getManager = async () => {
      return await lottery.methods.manager().call();
    };
    getManager().then((data) => setManager(data));
  }, []);

  return (
    <div style={{ margin: "0 10px 0 10px" }}>
      <ToastContainer />
      <Navbar className="parentCompany" color="light" light>
        <Nav className="me-auto" navbar>
          <NavbarBrand href="/">Insurance Co.</NavbarBrand>
        </Nav>

        <UncontrolledDropdown className="me-2" direction="left">
          <DropdownToggle caret color="primary">
            Settings
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>
              User :{" "}
              {currentUser
                ? currentUser
                : "Click Update to select user from metamask"}
            </DropdownItem>
            <DropdownItem disabled>Manager : {manager}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={getAccounts}>Update User</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Navbar>
      <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
        {manager === currentUser ? (
          <ManagerFunctions account={currentUser} />
        ) : (
          <CustomerFunctions account={currentUser} />
        )}
      </div>
    </div>
  );
}

export default App;

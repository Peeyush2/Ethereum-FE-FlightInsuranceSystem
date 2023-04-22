import React, { useEffect, useState } from "react";
import lottery from "./lottery";
import web3 from "./web3";
import {
  Collapse,
  Alert,
  Button,
  Input,
  FormGroup,
  Form,
  Row,
  Col,
  Spinner,
  Label,
} from "reactstrap";
import TableData from "./TableData";
import { toast } from "react-toastify";

const policy_buy_price = "0.01";

function CustomerFunctions({ account }) {
  const [loading, setLoading] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [purchasedPolicy, setPurchasedPolicy] = useState();
  const [balance, setBalance] = useState("0");
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setBalance(0);
    setLoading(false);
    setPurchasedPolicy();
    setOpen(false);
    setPolicies([]);
  }, [account]);

  const getBalance = async () => {
    setLoading(true);
    const balanceData = await web3.eth.getBalance(account);
    setBalance(web3.utils.fromWei(balanceData, "ether"));
    setLoading(false);
  };
  const fetchPurchasedPolicyData = async () => {
    let data = await lottery.methods.view_purchased_policy().call({
      from: account,
    });
    data = data?.filter(
      (d) =>
        d?.passenger_address !== "0x0000000000000000000000000000000000000000"
    );
    setPurchasedPolicy(data);
  };
  const fetchPolicy = async () => {
    if (policies?.length) return;
    setLoading(true);
    const data = await lottery.methods.viw_available_policy().call();
    setPolicies(data);
    setLoading(false);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const passenger_name = e.target.elements["Passenger Name"].value;
    const flight_number = e.target.elements["Flight Number"].value;
    const departure_date = e.target.elements["Departure Date"].value;
    const departure_city = e.target.elements["departure city"].value;
    const destination_city = e.target.elements["destination city"].value;
    try {
      await lottery.methods
        .purchase_policy(
          passenger_name,
          flight_number,
          departure_date,
          departure_city,
          destination_city
        )
        .send({
          from: account,
          value: web3.utils.toWei(policy_buy_price, "ether"),
        });
      toast("Success!", { type: "success" });
    } catch (err) {
      toast("Transaction Error!", { type: "error" });
    }

    setLoading(false);
  };
  if (!account) return <div> Select Account </div>;
  return (
    <div>
      <h4>Hello Customer! </h4>
      {loading && (
        <Button style={{ marginBottom: "10px" }} color="primary" disabled>
          <Spinner size="sm">Loading...</Spinner>
          <span> Loading</span>
        </Button>
      )}
      <div>
        <Button
          color="primary"
          onClick={() => {
            setOpen((prev) => !prev);
            fetchPolicy();
          }}
          style={{
            marginBottom: "1rem",
          }}
        >
          View our policy
        </Button>
        <Collapse isOpen={isOpen} horizontal>
          <Alert
            style={{
              width: "500px",
            }}
          >
            {policies}
          </Alert>
        </Collapse>
      </div>

      <hr />

      <Form onSubmit={submitForm}>
        <h6> Buy Policy Now! </h6>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="Passenger Name">Name</Label>
              <Input
                id="Passenger Name"
                name="Passenger Name"
                placeholder="Name"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="Flight Number">Flight Number</Label>
              <Input
                id="Flight Number"
                name="Flight Number"
                placeholder="Flight Number"
                type="text"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <FormGroup>
              <Label for="departure city">Departure city</Label>
              <Input id="departure city" name="departure city" />
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Label for="destination city">Destination City</Label>
              <Input id="destination city" name="destination city" />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="Departure Date">Departure Date</Label>
              <Input id="Departure Date" name="Departure Date" type="date" />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary">Buy Now!</Button>
      </Form>
      <hr />
      <h6> Already bought the policy? Check the status here! </h6>
      <div>
        <Button color="primary" onClick={fetchPurchasedPolicyData}>
          {" "}
          Fetch purchased policy data{" "}
        </Button>
        {purchasedPolicy?.length && (
          <TableData policyDatas={[purchasedPolicy]} />
        )}
      </div>

      <hr />
      <div>
        <Button color="primary" onClick={getBalance}>
          {" "}
          Get Balance{" "}
        </Button>
        <Label> Your Balance is : {balance} </Label>
      </div>
    </div>
  );
}

export default CustomerFunctions;

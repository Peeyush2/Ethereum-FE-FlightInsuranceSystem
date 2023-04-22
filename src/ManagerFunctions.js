import React, { useState } from "react";
import web3 from "./web3";
import lottery from "./lottery";
import TableData from "./TableData";
import { Button, Spinner } from "reactstrap";
import { toast } from "react-toastify";

function ManagerFunctions({ account }) {
  const [policiyTakers, setPolicyTakers] = useState();
  const [loading, setLoading] = useState(false);
  const viewAllPolicy = async () => {
    let data = await lottery.methods.view_all_policies().call({
      from: account,
    });
    data = data?.filter(
      (d) =>
        d?.passenger_address !== "0x0000000000000000000000000000000000000000"
    );
    setPolicyTakers(data);
    if (!data?.length) toast("No data found", { type: "warning" });
  };

  const manualVerify = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:4000", {
        mode: "no-cors",
      });
      toast("Success!", { type: "success" });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2> Welcome Manager! </h2>
      <Button color="primary" onClick={viewAllPolicy}>
        {" "}
        View All Policy Holders{" "}
      </Button>
      <TableData policyDatas={policiyTakers} />
      <hr />
      <Button color="primary" onClick={manualVerify}>
        {" "}
        Trigger Manual Verify{" "}
      </Button>
      {loading && <Spinner />}
    </div>
  );
}

export default ManagerFunctions;

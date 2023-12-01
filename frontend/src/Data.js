import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import "primereact/resources/themes/lara-light-indigo/theme.css";

import "primereact/resources/primereact.min.css";
import axios from "axios";

const Data = () => {
  const [allUsers, setAllUsers] = useState([]);

  const [dialogVisible, setDialogVisible] = useState(false);

  const getAllUsers = () => {
    axios
      .get("http://localhost:5000/getUser")
      .then((res) => setAllUsers(res.data))

      .catch((err) => console.log(err.message));
  };

  const dialogFooterTemplate = () => {
    return (
      <Button
        label="Ok"
        icon="pi pi-check"
        onClick={() => setDialogVisible(false)}
      />
    );
  };

  useEffect(() => {
    getAllUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h1>Users Data</h1>
      <div className="card" style={{ marginBottom: "8rem" }}>
        <Button
          style={{ padding: "0.5rem" }}
          label="Show"
          icon="pi pi-external-link"
          onClick={() => setDialogVisible(true)}
        />
        <Dialog
          header="Flex Scroll"
          visible={dialogVisible}
          style={{ width: "75vw" }}
          maximizable
          modal
          contentStyle={{ height: "300px" }}
          onHide={() => setDialogVisible(false)}
          footer={dialogFooterTemplate}
        >
          <DataTable
            value={allUsers}
            scrollable
            scrollHeight="flex"
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="name" header="Name"></Column>
            <Column field="phone" header="Phone"></Column>
            <Column field="email" header="email"></Column>
          </DataTable>
        </Dialog>
      </div>
    </>
  );
};

export default Data;

import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { orders, scooters } from "./datatablesource";
import { useRouter } from 'next/router'
import Styles from "./datatable.module.css";
import { scooterAction } from "./actionTable";

const Datatable = ({ data, title }) => {
  // const path = window.location.pathname.split("/")[2];
  const router = useRouter()
  const path = router.pathname;
  // add switch statement to handle different paths
  const switchFunction = () => {
    switch (path) {
      case "/scooters":
        return scooters.concat(scooterAction);
      case "/orders":
        return orders.concat();
      default:
    }
  };

  return (
    <div className={Styles.datatable}>
      <div className={Styles.title}>
        <div className={Styles.datatableTitle}>{title}</div>
      </div>
      <DataGrid
        className={Styles.datagrid}
        getRowId={(row) => row._id}
        rows={data}
        columns={switchFunction()}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;

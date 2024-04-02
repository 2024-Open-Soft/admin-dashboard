import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import createToast from "../utils/createToast";

const Subscriptionsdirect = (value) => {
  const dispatch = useDispatch();

  const handleClicked = (e) => {
    // // console.log("value : ", value);
  };
  return (
    <Button
      onClick={handleClicked}
      sx={{ m: 0, width: "115%", mr: 10, ml: -1.5, mb: 0.5 }}
    >
      View
    </Button>
  );
};

const dateFormatter = (params) => {
  return new Date(params.value).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+81", country: "Japan" },
];

const SubscriptionsTable = ({ setValue }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const anotherdata = useSelector((state) => state.usersubscription.data);
  const subs = anotherdata?.subscriptions;

  // // console.log("another : ", anotherdata);

  const [userSubscription, setUserSubscription] = useState();

  useEffect(() => {
    const parseData = JSON.parse(JSON.stringify(subs))?.map((sub) => {
      return {
        plan: sub?.plan,
        startDate: sub?.startDate,
        endDate: sub?.endDate,
        status: sub?.status,
        subscriptions: sub,
        id: sub?.planId,
      };
    });
    setUserSubscription(parseData);
  }, [subs]);

  const colDefs = useMemo(
    () => [
      {
        field: "plan",
        width: 340,
        checkboxSelection: true,
        headerCheckboxSelection: true,
      },
      {
        headerName: "Start Date",
        field: "startDate",
        valueFormatter: dateFormatter,
      },
      {
        headerName: "End Date",
        field: "endDate",
        valueFormatter: dateFormatter,
      },
      {
        field: "status",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: [
            "TO_BE_PAID",
            "ACTIVE",
            "ON_HOLD",
            "EXPIRED",
            "PAYMENT_ERROR",
          ],
        },
      },
      {
        headerName: "Subscriptions",
        field: "subscriptions",
        cellRenderer: Subscriptionsdirect,
        suppressHeaderMenuButton: true,
        suppressHeaderFilterButton: true,
        suppressFloatingFilterButton: true,
        sortable: false,
        editable: false,
      },
    ],
    []
  );

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridApi.getSelectedRows();
    setSelectedRows(selectedNodes);
  }, [gridApi]);

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  }, []);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      editable: true,
      resizable: true,
    }),
    []
  );

  const onCellValueChanged = useCallback((params) => {
    // // console.log("Cell value changed:", params.data);
    try {
      // // console.log("Cell value changed:", params);
      const response = axios
        .put(
          `admin/user/${anotherdata.id}`,
          {
            subscriptions: [
              ...subs.filter((sub) => sub?.planId !== params.data.id),
              params.data,
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          // // console.log("response : ", response);
          createToast("Subscription Updated", "success");
        })
        .catch((err) => {
          // console.log(err);
          if (err?.response?.data?.error === "Token Expired") {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
          createToast(err?.response?.data?.error, "error");
        });
    } catch (err) {
      // console.log(err);
      createToast(err?.response?.data?.error, "error");
    }
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ width: "100%", height: "450px" }}>
      <AgGridReact
        rowData={userSubscription}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
        pagination={true}
        onCellValueChanged={onCellValueChanged}
      />
      <p>Selected Rows Count: {selectedRows.length}</p>
    </div>
  );
};

export default SubscriptionsTable;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Subscriptionsdirect = (value) => {
  const dispatch = useDispatch();

  const handleClicked = (e) => {
    console.log("value : ", value);
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
  const subs = useSelector(
    (state) => state.usersubscription.data
  )?.subscriptions;

  const [userSubscription, setUserSubscription] = useState();

  useEffect(() => {
    const parseData = JSON.parse(JSON.stringify(subs))?.map((sub) => {
      return {
        plan: sub?.plan,
        startDate: sub?.startDate,
        endDate: sub?.endDate,
        status: sub?.status,
        subscriptions: sub,
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
    console.log("Cell value changed:", params);
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

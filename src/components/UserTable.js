import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const CompanyLogoRenderer = ({ value }) => (
  <span
    style={{
      display: "flex",
      alignItems: "center",
    }}
  >
    {value && (
      <img
        alt={`${value} Logo`}
        src={`https://www.ag-grid.com/example-assets/space-company-logos/${value.toLowerCase()}.png`}
        style={{
          width: "25px",
          maxHeight: "50%",
          marginRight: "12px",
          filter: "brightness(1.1)",
        }}
      />
    )}
    <p
      style={{
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </p>
  </span>
);

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+81", country: "Japan" },
];

const UserTable = () => {
  const [rowData, setRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const colDefs = useMemo(
    () => [
      {
        field: "User",
        width: 340,
        checkboxSelection: true,
        headerCheckboxSelection: true,
      },
      {
        field: "email",
      },
      {
        field: "phone",
        cellEditor: "agNumberCellEditor",
        cellEditorParams: {
          min: 0,
        },
      },
      {
        headerName: "Country Code",
        field: "countrycode",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: countryCodes.map((code) => code.code),
          valueListGap: 20,
        },
      },
      {
        field: "Screentime",
        width: 130,
        cellEditor: "agNumberCellEditor",
        cellEditorParams: {
          min: 0,
        },
      },
      {
        field: "plan",
        width: 125,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["Basic", "Standard", "Premium", "Platinum"],
          valueListGap: 20,
        },
      },
      {
        field: "payment",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["Success", "Failed", "Pending"],
        },
      },
    ],
    []
  );

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/space-mission-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

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
        rowData={rowData}
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

export default UserTable;

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
        alt=""
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

const VideoImageRenderer = ({ value }) => (
  <span
    style={{
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
    }}
  >
    <img
      alt={`${value} Mission`}
      src={
        value?.url ||
        `https://ichef.bbci.co.uk/news/1024/cpsprodpb/CE00/production/_132663725_gettyimages-2013351367.jpg`
      }
      style={{
        width: 150,
        height: "100px",
        objectFit: "cover",
        objectPosition: "top",
        padding: 10,
        boxSizing: "border-box",
      }}
    />
    <p
      style={{
        width: 150,
        height: 100,
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {value?.description || value}
    </p>
  </span>
);

const dateFormatter = (params) => {
  return new Date(params.value).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const GridExample = () => {
  const [rowData, setRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const colDefs = useMemo(
    () => [
      {
        field: "video",
        width: 340,
        cellRenderer: VideoImageRenderer,
        checkboxSelection: true,
        headerCheckboxSelection: true,
      },
      {
        field: "views",
        width: 130,
        cellRenderer: CompanyLogoRenderer,
      },
      {
        field: "likes",
        width: 125,
      },
      {
        field: "dislikes",
        width: 125,
      },
      {
        field: "date",
        valueFormatter: dateFormatter,
      },
      {
        field: "price",
        width: 130,
        valueFormatter: (params) => `£${params.value.toLocaleString()}`,
      },
      { field: "type" },
      { field: "collection" },
      { field: "director" },
      { field: "actor" },
      { field: "write" },
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
    <div className="ag-theme-quartz" style={{ width: "100%", height: "100%" }}>
      <AgGridReact
        rowHeight={100}
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

export default GridExample;

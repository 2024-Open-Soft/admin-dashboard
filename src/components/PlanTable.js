import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Button } from "@mui/material";

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

const DeleteButton = (value) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`admin/plan/${value?.data?.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      console.log("response : ", response);
    }
    catch (err) {
      console.log(err);
    }
  };
  return (
    <Button
      onClick={handleDelete}
      sx={{ m: 0, width: "115%", mr: 10, ml: -1.5, mb: 0.5 }}
    >
      <DeleteOutlineOutlinedIcon sx={{ color: "black"}}/>
    </Button>
  );
};

const PlanTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const getAllPlans = async () => {
    // console.log("token : ", localStorage.getItem("token"));
    const response = await axios
      .get("/plan", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
    let data = response?.data;
    if (Array.isArray(data) && data.length > 0) {
      return await data.map((plan) => {
        const maxResolution = plan?.features?.filter(
          (feature) => feature.name === "max-resolution"
        )[0];
        const maxDevices = plan?.features?.filter(
          (feature) => feature.name === "max-devices"
        )[0];

        return {
          id: plan?._id,
          plan: plan?.name,
          price: plan?.price,
          "discount%": plan?.discountPercentage,
          "max-resolution": parseInt(maxResolution?.value.replace("p", "")),
          "max-devices": parseInt(maxDevices?.value),
        };
      });
    }
    return response;
  };

  const { data: rowData, error } = useQuery({
    queryKey: ["all-plans"],
    queryFn: getAllPlans,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const colDefs = useMemo(
    () => [
      {
        field: "plan",
        width: 340,
        checkboxSelection: true,
        headerCheckboxSelection: true,
      },
      {
        field: "price",
        width: 230,
        valueFormatter: (params) => `$${params.value.toLocaleString()}`,
        cellEditor: "agNumberCellEditor",
        cellEditorParams: {
          min: 0,
        },
      },
      {
        field: "discount%",
        width: 125,
        cellEditor: "agNumberCellEditor",
        cellEditorParams: {
          min: 0,
        },
      },
      {
        headerName: "Max Resolution",
        field: "max-resolution",
        width: 225,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: [144, 240, 360, 480, 720, 1080, 1440],
          valueListGap: 20,
        },
      },
      {
        headerName: "Max Devices",
        field: "max-devices",
        width: 200,
      },
      {
        headerName: "Delete",
        field: "delete",
        cellRenderer: DeleteButton,
        suppressHeaderMenuButton: true,
        suppressHeaderFilterButton: true,
        suppressFloatingFilterButton: true,
        sortable: false,
        editable: false,
      },
      // {
      //   field: "discount",
      //   width: 125,
      //   cellEditor: "agNumberCellEditor",
      //   cellEditorParams: {
      //     min: 0,
      //   },
      // },
    ],
    []
  );

  // useEffect(() => {
  //   fetch("https://www.ag-grid.com/example-assets/space-mission-data.json")
  //     .then((result) => result.json())
  //     .then((rowData) => setRowData(rowData));
  // }, []);

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
    try {
      console.log("Cell value changed:", params);
      const response = axios.put(`admin/plan/${params.data.id}`, {
        name: params.data.plan,
        price: params.data.price,
        discountPercentage: params.data["discount%"],
        maxResolution: params.data["max-resolution"],
        maxDevices: params.data["max-devices"],
      },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    }
    catch (err) {
      console.log(err);
    }
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

export default PlanTable;

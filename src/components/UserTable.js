import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUserSubscription } from "../redux/reducers/UserSubscription";
import { subscriptionstartAndEndDate } from "./utility";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import createToast from "../utils/createToast";

const Subscriptionsdirect = (value) => {
  const dispatch = useDispatch();
  const handleClicked = (e) => {
    e.preventDefault();
    // console.log("value : ", value);
    const subscriptions = value?.data?.subscriptions?.map((sub) => {
      const { startDate, endDate } = subscriptionstartAndEndDate(sub);
      // console.log("startDate : ", startDate, "endDate : ", endDate);
      return {
        plan: sub?.plan,
        startDate,
        endDate,
        status: sub?.status,
      };
    });
    dispatch(
      setUserSubscription({
        id: value?.data?.id,
        user: value?.data?.user,
        subscriptions: subscriptions || undefined,
      })
    );
    value?.data?.setValue("4");
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

const DeleteButton = (value) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`admin/user/${value?.data?.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      console.log("response : ", response);
      createToast("User Deleted Successfully", "success");
    }
    catch (err) {
      console.log(err);
      createToast(err?.response?.data?.error, "error");
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

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+81", country: "Japan" },
];

const UserTable = ({ setValue }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const getAllUsers = async () => {
    console.log("token : ", localStorage.getItem("token"));
    const response = await axios
      .get("/admin/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .catch((err) => {
        console.log(err);
        createToast(err?.response?.data?.error, "error");
        throw new Error(err);
      });
    console.log('res : ', response)
    let data = response.data?.data?.users;
    console.log("hello");
    if (Array.isArray(data) && data.length > 0) {
      createToast(response?.data?.message, "success");
      return await data.map((user) => {
        return {
          id: user?._id,
          user: user?.name,
          email: user?.email,
          phone: user?.phone,
          countrycode: user?.countrycode || "+91",
          screentime: user?.screentime || 10,
          subscriptions: user?.subscriptions,
          setValue,
        };
      });
    }
    console.log("no no no");
    console.log("data : ", data);
    console.log("yes yes yes");
    createToast(response?.data?.message, "success");
    return data;
  };

  const { data: rowData, error } = useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // console.log("rowData : ", rowData);
  // console.log("error : ", error);

  const colDefs = useMemo(
    () => [
      {
        field: "user",
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
          values: ["+91", "+1", "+44", "+61", "+81"],
          valueListGap: 20,
        },
      },
      {
        headerName: "Screen Time (in hours)",
        field: "screentime",
        width: 200,
        cellEditor: "agNumberCellEditor",
        cellEditorParams: {
          min: 0,
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
      //   headerName: "Latest Plan",
      //   field: "plan",
      //   width: 125,
      //   cellEditor: "agSelectCellEditor",
      //   cellEditorParams: {
      //     values: ["Basic", "Standard", "Premium", "Platinum"],
      //     valueListGap: 20,
      //   },
      // },
      // {
      //   field: "payment",
      //   cellEditor: "agSelectCellEditor",
      //   cellEditorParams: {
      //     values: [
      //       "TO_BE_PAID",
      //       "ACTIVE",
      //       "ON_HOLD",
      //       "EXPIRED",
      //       "PAYMENT_ERROR",
      //     ],
      //   },
      // },
      // {
      //   headerName: "Active",
      //   field: "active",
      //   cellEditor: "agSelectCellEditor",
      //   cellEditorParams: {
      //     values: ["True", "False", "Upcoming"],
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
      const response = axios.put(`admin/user/${params.data.id}`, {
        name: params.data.user,
        email: params.data.email,
        phone: params.data.phone,
        countryCode: params.data.countrycode,
      },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        createToast("User Updated Successfully", "success");
    }
    catch (err) {
      console.log(err);
      createToast(err?.response?.data?.error, "error");
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

export default UserTable;

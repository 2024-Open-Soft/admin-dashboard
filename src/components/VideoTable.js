import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { movieCertifications } from "../data";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import createToast from "../utils/createToast";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Button } from "@mui/material";

const DeleteButton = (value) => {
  const handleDelete = async (e) => {
    console.log("vale : ", value);
    e.preventDefault();
    try {
      const response = await axios.delete(
        `admin/movie/${value?.data?.id}/${value?.colDef?.field}/delete`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log("response : ", response);
      createToast(`${value?.colDef?.field} Deleted Successfully`, "success");
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.error === "Token Expired") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      createToast(err?.response?.data?.error, "error");
    }
  };
  return (
    <Button
      onClick={handleDelete}
      sx={{ m: 0, width: "115%", mr: 10, ml: -1.5, mb: 0.5 }}
    >
      <DeleteOutlineOutlinedIcon sx={{ color: "black" }} />
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

const VideoTable = () => {
  // const [rowData, setRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const getAllMovies = async () => {
    console.log("token : ", localStorage.getItem("token"));
    const response = await axios
      .get("/admin/movie", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.error === "Token Expired") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        createToast(err?.response?.data?.error, "error");
        throw new Error(err);
      });
    console.log("res : ", response);
    let data = response.data?.data?.movies || [];
    console.log("hello");

    console.log("data : ", data);

    if (Array.isArray(data) && data.length > 0) {
      createToast(response?.data?.message, "success");
      return await data.map((movie) => {
        return {
          id: movie?._id,
          title: movie?.title || "N/A",
          plot: movie?.plot || "N/A",
          date: movie?.released || 0,
          rated: movie?.rated || "N/A",
          actors: movie?.cast?.join(", ") || "N/A",
          writers: movie?.writers?.join(", ") || "N/A",
          year: movie?.year || 0,
          IMDB: movie?.imdb?.rating || 0,
          languages: movie?.languages?.join(", ") || "N/A",
        };
      });
    }
    console.log("no no no");
    console.log("data : ", data);
    console.log("yes yes yes");
    createToast(response?.data?.message, "error");
    return data;
  };

  const { data: rowData, error } = useQuery({
    queryKey: ["all-movies"],
    queryFn: getAllMovies,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const colDefs = useMemo(
    () => [
      {
        field: "title",
        width: 340,
        // cellRenderer: VideoImageRenderer,
        checkboxSelection: true,
        headerCheckboxSelection: true,
      },
      {
        field: "plot",
        width: 350,
        cellEditor: "agLargeTextCellEditor",
      },
      {
        field: "date",
        valueFormatter: dateFormatter,
      },
      {
        field: "rated",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: movieCertifications.map((cert) => cert.type),
          valueListGap: 20,
        },
      },
      // { field: "director" },
      { field: "actors" },
      { field: "writers" },
      {
        field: "year",
        width: 125,
        cellEditor: "agNumberCellEditor",
        cellEditorParams: {
          min: 1850,
        },
      },
      {
        field: "IMDB",
      },
      { field: "languages" },
      {
        headerName: "Delete Movie",
        field: "movie",
        cellRenderer: DeleteButton,
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

  const onPaginationChanged = useCallback(() => {
    // const currentPage = gridApi.paginationGetCurrentPage() + 1;
    // console.log("Current Page:", currentPage);
  }, [gridApi]);

  const onCellValueChanged = useCallback(async (params) => {
    console.log("Cell value changed:", params);
    try {
      const response = axios
        .put(`/admin/movie/${params.data.id}`, params.data, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          console.log("res : ", res);
          createToast("Movie Updated", "success");
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.data?.error === "Token Expired") {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
          createToast(err?.response?.data?.error, "error");
        });
    } catch (err) {
      console.log(err);
      createToast(err?.response?.data?.error, "error");
    }
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ width: "100%", height: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
        pagination={true}
        onCellValueChanged={onCellValueChanged}
        onPaginationChanged={onPaginationChanged}
      />
      <p>Selected Rows Count: {selectedRows.length}</p>
    </div>
  );
};

export default VideoTable;

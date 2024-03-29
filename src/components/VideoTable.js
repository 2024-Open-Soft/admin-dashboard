import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { movieCertifications } from "../data";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

// const VideoImageRenderer = ({ value }) => (
//   <span
//     style={{
//       display: "flex",
//       justifyContent: "start",
//       alignItems: "center",
//     }}
//   >
//     <p
//       style={{
//         width: 150,
//         height: 100,
//         textOverflow: "ellipsis",
//         overflow: "hidden",
//         whiteSpace: "nowrap",
//       }}
//     >
//       {value?.description || value}
//     </p>
//   </span>
// );

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
        throw new Error(err);
      });
    console.log("res : ", response);
    let data = response.data?.data?.movies || [];
    console.log("hello");

    console.log("data : ", data);

    if (Array.isArray(data) && data.length > 0) {
      return await data.map((movie) => {
        return {
          id: movie?._id,
          title: movie?.title || "N/A",
          plot: movie?.plot || "N/A",
          date: movie?.released || 0,
          genre: movie?.genres?.join(", ") || "N/A",
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
      // {
      //   field: "views",
      //   width: 130,
      //   cellEditor: "agNumberCellEditor",
      //   cellEditorParams: {
      //     min: 0,
      //   },
      // },
      {
        field: "date",
        valueFormatter: dateFormatter,
      },
      // {
      //   field: "dislikes",
      //   width: 125,
      //   cellEditor: "agNumberCellEditor",
      //   cellEditorParams: {
      //     min: 0,
      //   },
      // },
      // {
      //   field: "price",
      //   width: 130,
      //   valueFormatter: (params) => `$${params.value.toLocaleString()}`,
      //   cellEditor: "agNumberCellEditor",
      //   cellEditorParams: {
      //     min: 0,
      //   },
      // },
      {
        field: "genre",
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
      // {
      //   field: "description",
      //   cellEditor: "agLargeTextCellEditor",
      //   cellEditorPopup: true,
      //   cellEditorParams: {
      //     maxLength: 100,
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
    console.log("Cell value changed:", params);
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
      />
      <p>Selected Rows Count: {selectedRows.length}</p>
    </div>
  );
};

export default VideoTable;

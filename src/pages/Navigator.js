import React, { Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import Error from "../components/Error";
import { fetchUserData } from "../components/fetchUser";
import Home from "./Home";
import Check from "../components/Check";

const LazySignUp = lazy(() => import("./SignUp"));
const LazyLogin = lazy(() => import("./Login"));
const LazyAdmin = lazy(() => import("./AdminPage"));
const LazyUpload = lazy(() => import("./Upload"));
const Navigator = () => {
  const dispatch = useDispatch();

  const navItems = [
    {
      path: "/signup",
      element: (
        <Suspense fallback={<h1>Loading</h1>}>
          <LazySignUp />
        </Suspense>
      ),
      protected: false,
      errorElement: <Error />,
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<h1>Loading</h1>}>
          <LazyLogin />
        </Suspense>
      ),
      protected: false,
      errorElement: <Error />,
    },
    {
      path: "/database",
      element: (
        <Suspense fallback={<h1>Loading</h1>}>
          <LazyAdmin />
        </Suspense>
      ),
      protected: false,
      errorElement: <Error />,
    },
    {
      path: "/upload",
      element: (
        <Suspense fallback={<h1>Loading</h1>}>
          <LazyUpload />,
        </Suspense>
      ),
      protected: false,
      errorElement: <Error />,
    },
    {
      path: "/check",
      element: (
        <Suspense fallback={<h1>Loading</h1>}>
          <Check />,
        </Suspense>
      ),
      protected: false,
      errorElement: <Error />,
    },
  ];

  React.useEffect(() => {
    fetchUserData(dispatch);
  }, [localStorage.getItem("userToken")]);

  return (
    <Routes>
      <Route element={<Home />} path="/">
        {navItems
          .filter((ele) => !ele.protected)
          .map((ele, i) => (
            <Route key={i} element={ele.element} path={ele.path} />
          ))}
        <Route element={<RequireAuth />}>
          {navItems
            .filter((ele) => ele.protected)
            .map((ele, i) => (
              <Route key={i} element={ele.element} path={ele.path} />
            ))}
        </Route>
        <Route
          element={<h1 style={{ margin: "auto" }}>Page does not exist</h1>}
          path="*"
        />
      </Route>
    </Routes>
  );
};

export default Navigator;

import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navigator from "./pages/Navigator";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#313131",
    },
    secondary: {
      main: "#424242",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize1: {
      fontSize: "0.75rem",
    },
    fontSize2: {
      fontSize: "14px",
    },
    fontSize3: {
      fontSize: "1rem",
    },
    fontSize4: {
      fontSize: "1.2rem",
    },
  },
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Navigator />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

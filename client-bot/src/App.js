import React from "react";
import "./App.css";
import FirstPage from "./VIEWS/FirstPage";
import MainPage from "./VIEWS/MainPage";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        backgroundColor: "black",
        height: "100vh",
      }}
    >
      <Switch>
        <Route component={MainPage} path="/main" />
        <Route component={FirstPage} path="/" />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

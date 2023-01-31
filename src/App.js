import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 21;
  apiKey = "739e423a31c541a5aea5f2fdd99c0512"
  state={progress: 0,
  mode: "light",};
  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  toggleMode = () => {
    if (this.state.mode === "dark") {
      this.setState({
        mode: "light",
      });
      document.body.style.backgroundColor = "white";
      document.body.style.color= "black";
      // showAlert("Light mode has been Enabled!",'success')
    } if(this.state.mode === "light"){
      this.setState({
        mode: "dark",
      });
      document.body.style.backgroundColor = "#042743";
      document.body.style.color= "white";
      // }
      // showAlert("Dark mode has been Enabled!",'success')
    }
  };

  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      
      />
        <Navbar toggleMode={this.toggleMode} mode={this.state.mode}/>
          <Routes>
            <Route
              path="/"
              element={<News mode={this.state.mode} apiKey={this.apiKey} setProgress={this.setProgress} key="general" page="1" pageSize={this.pageSize} country="in" category="general" />}
            />
            <Route
              path="/business"
              element={<News mode={this.state.mode} apiKey={this.apiKey} setProgress={this.setProgress} key="business" page="1" pageSize={this.pageSize} country="in" category="business" />}
            />
            <Route
              path="/science"
              element={<News mode={this.state.mode} apiKey={this.apiKey} setProgress={this.setProgress} key="science" page="1" pageSize={this.pageSize} country="in" category="science" />}
            />
            <Route
              path="/general"
              element={<News mode={this.state.mode} apiKey={this.apiKey} setProgress={this.setProgress} key="general" page="1" pageSize={this.pageSize} country="in" category="general" />}
            />
            <Route
              path="/sports"
              element={<News mode={this.state.mode} apiKey={this.apiKey} setProgress={this.setProgress} key="sports" page="1" pageSize={this.pageSize} country="in" category="sports" />}
            />
            <Route
              path="/health"
              element={<News mode={this.state.mode} apiKey={this.apiKey} setProgress={this.setProgress} key="health" page="1" pageSize={this.pageSize} country="in" category="health" />}
            />
            <Route
              path="/entertainment"
              element={<News mode={this.state.mode} apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" page="1" pageSize={this.pageSize} country="in" category="entertainment" />}
            />
            <Route
              path="/technology"
              element={<News mode={this.state.mode} apiKey={this.apiKey} setProgress={this.setProgress} key="technology" page="1" pageSize={this.pageSize} country="in" category="technology" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

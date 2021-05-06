import React from "react";
import UserList from "./users/UserList.jsx";
import UserAdd from "./users/UserAdd.jsx";
import BuildingAdd from "./buildings/BuildingAdd.jsx";
import BuildingList from "./buildings/BuildingList.jsx";

class Blank extends React.Component {
  render() {
    return <div> {JSON.stringify(this.props)} </div>;
  }
}

export default [
  {
    path: "/buildings/add",
    component: BuildingAdd,
    routes: [],
  },
  {
    path: "/buildings/list",
    component: BuildingList,
    routes: [],
  },
  {
    path: "/users/list",
    component: UserList,
    routes: [],
  },
  {
    path: "/users/add",
    component: UserAdd,
    routes: [],
  },
  {
    path: "/",
    component: Blank,
    routes: [],
  },
];

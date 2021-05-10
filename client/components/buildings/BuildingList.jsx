import React from "react";
import BuildingPaginator from "./BuildingPaginator.jsx";

export default class BuildingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      limit: 10,
      total: 0,
      buildings: [],
    };
  }

  fetchBuildings(skip, limit) {
    fetch(`http://localhost:8080/api/buildings?skip=${skip}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState((state) => {
          state.buildings = data.buildings;
          return state;
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.fetchBuildings(0, 10);
  }

  get rows() {
    const trs = [];
    for (const building of this.state.buildings) {
      trs.push(
        <tr key={building._id}>
          <td>{building.company}</td>
          <td>{building.address}</td>
        </tr>
      );
    }
    /*
    for (const k in this.state.buildings) {
        trs.push(
          <tr>
            <td>{this.state.buildings[k].company}</td>
            <td>{this.state.buildings[k].address}</td>
          </tr>
        );
      }
*/
    return trs;
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Company
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputEmail3" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Address
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputPassword3" />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </form>
        <BuildingPaginator total={8} skip={0} limit={10} />
        <table className="table" id="dataTable">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>{this.rows}</tbody>
        </table>
      </div>
    );
  }
}

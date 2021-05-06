import React from "react";

export default class BuildingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
    };
  }
  componentDidMount() {
    fetch("http://localhost:8080/api/buildings")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState((state) => {
          state.buildings = data.buildings;
          return state;
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
        <table className="table" id="dataTable">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>{this.rows}</tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

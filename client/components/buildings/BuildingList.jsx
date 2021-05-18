import React from "react";
import BuildingPaginator from "./BuildingPaginator.jsx";
import BuildingFilter from "./BuildingFilter.jsx";

export default class BuildingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      limit: 10,
      total: 0,
      company: "",
      address: "",
      buildings: [],
    };

    this.fetchBuildings = this.fetchBuildings.bind(this);
    this.changeSkipAndLimit = this.changeSkipAndLimit.bind(this);
    this.changeCompanyAndAddress = this.changeCompanyAndAddress.bind(this);
    this.companySearch = this.companySearch.bind(this);
    this.addressSearch = this.addressSearch.bind(this);
  }

  fetchBuildings(skip, limit, company, address) {
    fetch(
      `http://localhost:8080/api/buildings?skip=${skip}&limit=${limit}&company=${company}&address=${address}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState((state) => {
          state.skip = skip;
          state.limit = limit;
          state.total = data.total;
          state.company = company;
          state.address = address;
          state.buildings = data.buildings;
          return state;
        });
      })
      .catch((error) => console.log(error));
  }

  changeSkipAndLimit(skip, limit) {
    const { company, address } = this.state;
    this.fetchBuildings(skip, limit, company, address);
  }

  changeCompanyAndAddress(company, address) {
    const { skip, limit } = this.state;
    this.fetchBuildings(skip, limit, company, address);
  }

  componentDidMount() {
    this.fetchBuildings(0, 10, "", "");
  }
  companySearch(texto) {
    this.setState({ company: texto });
    console.log("textocompany", texto);
  }
  addressSearch(texto) {
    this.setState({ address: texto });
    console.log("texto address", texto);
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
        <BuildingFilter
          company={this.state.company}
          address={this.state.address}
          companySearch={this.companySearch}
          addressSearch={this.addressSearch}
          fetch={this.changeCompanyAndAddress}
        />
        <BuildingPaginator
          total={this.state.total}
          skip={this.state.skip}
          limit={this.state.limit}
          fetch={this.changeSkipAndLimit}
        />

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

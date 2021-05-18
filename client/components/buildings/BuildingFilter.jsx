import React from "react";

export default class BuildingFilter extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.companyInput = this.companyInput.bind(this);
    this.addressInput = this.addressInput.bind(this);
  }

  companyInput(event) {
    event.preventDefault();
    this.props.companySearch(event.target.value); //  el texto del input
  }

  addressInput(event) {
    event.preventDefault();
    this.props.addressSearch(event.target.value); //  el texto del input
  }

  /*submitForm(event) {
    const company = parseInt(event.target.getAttribute("company"));
    const address = parseInt(event.target.getAttribute("address"));

    this.props.fetch(company, address);
  }*/

  submitForm() {
    const company = this.props.company;
    const address = this.props.address;
    console.log("company", company);
    console.log("address", address);
    this.props.fetch(company, address);
  }
  render() {
    return (
      <form>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Company
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="company"
              className="form-control"
              onChange={this.companyInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Address
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="address"
              className="form-control"
              onChange={this.addressInput}
              id="inputPassword3"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-primary"
              company={this.props.company}
              address={this.props.address}
              onClick={this.submitForm}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    );
  }
}

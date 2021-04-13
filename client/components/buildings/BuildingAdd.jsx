import React from "react";

export default class BuildingAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entity: {
        company: "",
        address: "",
      },
      notification: {
        message: "Texto de prueba dentro del estado xxxx",
        type: "", // danger success
      },
    };

    this.fieldChanged = this.fieldChanged.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.messageChanged = this.messageChanged.bind(this);
    this.typeChanged = this.typeChanged.bind(this);
  }

  fieldChanged(event) {
    event.preventDefault();
    const newValue = event.target.value; //  el texto del input
    const name = event.target.name;
    this.setState((state) => {
      state.entity[name] = newValue;
      return state;
    });
    console.log(name, newValue);
  }
  messageChanged(event) {
    event.preventDefault();
    const message = event.target.value;
    this.setState((state) => {
      state.notification.message = message;
      return state;
    });
  }

  typeChanged(event) {
    event.preventDefault();
    const type = event.target.value;
    this.setState((state) => {
      state.notification.type = type;
      return state;
    });
  }

  submitForm(event) {
    event.preventDefault();
    fetch("http://localhost:8080/api/buildings", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.entity), // en el body debe ir un objeto, revisar en navegador por network
    })
      .then((response) => {
        if (response.ok) {
        } else {
        }
        console.log("response", response);
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        this.setState((state) => {
          state.notification.message = `edificio creado con el id: ${data._id}`;
          state.notification.type = "success";
          return state;
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState((state) => {
          state.notification.message = error.toString();
          state.notification.type = "danger";
          return state;
        });
      });
  }

  notificationDiv() {
    if (this.state.notification.type === null) {
      return null;
    }

    return (
      <div
        className={`alert alert-${this.state.notification.type}`}
        role="alert"
      >
        {this.state.notification.message}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.notificationDiv()}
        <input type="text" onChange={this.messageChanged} />
        <select onChange={this.typeChanged}>
          <option value="danger"> error </option>
          <option value="success"> exito </option>
        </select>

        <form>
          <div className="mb-3">
            <label htmlFor="company" className="form-label">
              Company
            </label>
            <input
              type="text"
              name="company"
              className="form-control"
              onChange={this.fieldChanged}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              onChange={this.fieldChanged}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.submitForm}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

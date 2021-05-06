import React from "react";
import $ from "jquery";
import "datatables.net/js/jquery.dataTables.js";
import "datatables.net-bs4/js/dataTables.bootstrap4.js";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";

export default class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.table = null;
    this.jquery = this.jquery.bind(this);
    this.error = this.error.bind(this);
  }

  componentDidMount() {
    this.table = this.jquery();
  }

  jquery() {
    return $("#dataTable").DataTable({
      serverSide: true,
      ajax: {
        url: "http://localhost:8080/api/users/",
        searching: false,
        method: "GET",
        data: (query) => query,
        dataFilter: (json) => json,
        error: this.error,
      },
      columns: [
        { data: "_id" },
        { data: "firstName" },
        { data: "lastName" },
        {
          data: "email",
          render: (data, type, row, meta) => {
            console.log("row", row);
            return (
              '<a href="/front/user/edit/' + row._id + '">' + data + "</a>"
            );
          },
        },
        { data: "createdAt" },
        { data: "updatedAt" },
      ],
    });
  }

  error(jqXHR, textStatus, errorThrown) {
    console.error(errorThrown);
  }

  render() {
    return (
      <div>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">User list</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Email</th>
                    <th>Creado</th>
                    <th>Modificado</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

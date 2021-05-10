import React from "react";

export default class BuildingPaginator extends React.Component {
  constructor(props) {
    super(props);

    // props a recibir: total de elementos (ejm 612), limit y skip actuales
  }

  get totalPages() {
    return Math.ceil(this.props.total / this.props.limit);
  }

  get currentPage() {
    return (this.props.skip + this.props.limit) / this.props.limit;
  }

  get isFirst() {
    return this.currentPage === 1; // devuelve true cuando la pagina es 1
  }

  get isLast() {
    return this.currentPage === this.totalPages;
  }

  get firstClassName() {
    if (this.isFirst) {
      return "page-item disabled";
    } else {
      return "page-item";
    }
  }

  get lastClassName() {
    if (this.isLast) {
      return "page-item disabled";
    } else {
      return "page-item";
    }
  }
  render() {
    return this.props.total === 0 ? (
      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item disabled">
            <a className="page-link">No se han encontrado edificios</a>
          </li>
        </ul>
      </nav>
    ) : (
      <nav aria-label="...">
        <ul className="pagination">
          <li className={this.firstClassName}>
            <a
              className="page-link"
              href="#"
              tabIndex="-1"
              aria-disabled="true"
            >
              Primera
            </a>
          </li>
          <li className={this.firstClassName}>
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              {this.currentPage}
            </a>
          </li>
          <li className={this.lastClassName}>
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
          <li className={this.lastClassName}>
            <a className="page-link" href="#">
              Último
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

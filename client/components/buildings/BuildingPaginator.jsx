import React from "react";

export default class BuildingPaginator extends React.Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
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

  changePage(event) {
    const skip = parseInt(event.target.getAttribute("skip"));
    const limit = parseInt(event.target.getAttribute("limit"));
    this.props.fetch(skip, limit);
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
              tabIndex="-1"
              href="#"
              aria-disabled="true"
              skip={0}
              limit={this.props.limit}
              onClick={this.changePage}
            >
              Primera
            </a>
          </li>
          <li className={this.firstClassName}>
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              skip={(this.currentPage - 2) * this.props.limit}
              limit={this.props.limit}
              onClick={this.changePage}
            >
              &laquo;
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              {this.currentPage}
            </a>
          </li>
          <li className={this.lastClassName}>
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              skip={this.currentPage * this.props.limit}
              limit={this.props.limit}
              onClick={this.changePage}
            >
              &raquo;
            </a>
          </li>
          <li className={this.lastClassName}>
            <a
              className="page-link"
              href="#"
              skip={(this.totalPages - 1) * this.props.limit}
              limit={this.props.limit}
              onClick={this.changePage}
            >
              Último
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

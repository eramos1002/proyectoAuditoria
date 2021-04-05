import React from 'react';

export default class UserAdd extends React.Component {
    constructor(props) {
        super(props);

        console.log('props', props);

        this.state = {
            entity: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }
        };

        this.changeField = this.changeField.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    changeField(event) {
        event.preventDefault();
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.setState({ entity: { [fieldName]: fieldValue }});
    }

    submitUser(event) {
        event.preventDefault();
        console.log('Enviado! this.state', this.state);
    }

    render() {
        return (
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">New User</h6>
                </div>
                <div className="card-body" onSubmit={this.submitUser}>
                    <form>
                        <div className="form-group">
                            <label htmlFor="firstNameField">First Name</label>
                            <input name="firstName" type="text" className="form-control" id="firstNameField" placeholder="First Name" onChange={this.changeField}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastNameField">Last Name</label>
                            <input name="lastName" type="text" className="form-control" id="lastNameField" placeholder="Last Name" onChange={this.changeField}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="emailField">Email</label>
                            <input name="email" type="email" className="form-control" id="emailField" placeholder="Email" onChange={this.changeField}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="passwordField">Password</label>
                            <input name="password" type="password" className="form-control" id="passwordField" placeholder="Password" onChange={this.changeField}/>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteUser } from '../../actions/user.action';
import { startOperation } from '../../actions/operation.action';

class UserTable extends React.Component {

  onShowUpdateUserForm(user) {
    this.props.startOperation(user);
  }

  onShowCreateUserForm() {
    this.props.startOperation({name: '', surname: '',patronymic: '', email: '', city: '', street: '', house: '', flat: '',userRole: '', login: '', password: '', salt: ''});
  }

  deleteUser(user) {
    this.props.deleteUser(user);
  }

  render() {
    let rows = this.props.users.map((user, index) => {
      if(this.props.userRole === "ADMIN") {
        return (
          <tr key={user.id}>
            <th scope='row'> {index + 1} </th>
            <td> {user.name}</td>
            <td> {user.surname}</td>
            <td> {user.patronymic}</td>
            <td> {user.login}</td>
            <td> {user.userRole}</td>
            <td>
              <div className='btn-toolbar text-center'>
                <button className='btn btn-primary' onClick={this.onShowUpdateUserForm.bind(this, user)}>Update</button>
                <button className='btn btn-danger' onClick={this.deleteUser.bind(this, user)}>Delete</button>
              </div>
            </td>
          </tr>
        )
      }

      if(this.props.userRole === "COMPANY_OWNER") {
        return (
          <tr key={user.id}>
            <th scope='row'> {index + 1} </th>
            <td> {user.name}</td>
            <td> {user.surname}</td>
            <td> {user.patronymic}</td>
            <td> {user.login}</td>
            <td> {user.userRole}</td>
            <td>
              <div className='btn-toolbar text-center'>
                <button className='btn btn-primary' onClick={this.onShowUpdateUserForm.bind(this, user)}> Open </button>
              </div>
            </td>
          </tr>
        )
      }
    });

    let adminActions =
      <td colSpan={3}>
        <button className='btn btn-default' onClick={this.onShowCreateUserForm.bind(this)}>Create new user
        </button>
      </td>;

    let ownerActions = null;
    let userActions = null;
    let role = this.props.userRole;
    userActions = role === "ADMIN" ? adminActions : userActions;
    userActions = role === "COMPANY_OWNER" ? ownerActions : userActions;
    return (
      <div>
        <h1>List of users</h1>
        <table className='table table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>surname</th>
            <th>patronymic</th>
            <th>login</th>
            <th>userRole</th>
            <th>actions</th>
          </tr>
          </thead>
          <tbody>
          {rows}
          <tr>
            {userActions}
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

UserTable.propTypes = {
  users: React.PropTypes.array.isRequired,
  startOperation: React.PropTypes.func.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  userRole: React.PropTypes.String
};


let mapStateToProps = function (state) {
  return {
    userRole: state.userRole.userRole
  };
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch),
    deleteUser: bindActionCreators(deleteUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);

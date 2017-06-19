import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteUser } from '../../actions/user.action';
import { startOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles';
import { sentenceCase } from 'change-case';

class UserTable extends React.Component {

  onShowUpdateUserForm(user) {
    this.props.startOperation(user);
  }

  onShowCreateUserForm() {
    this.props.startOperation({
      name: '',
      surname: '',
      patronymic: '',
      email: '',
      city: '',
      street: '',
      house: '',
      flat: '',
      userRole: '',
      login: '',
      password: '',
      salt: ''
    });
  }

  deleteUser(user) {
    this.props.deleteUser(user);
  }

  render() {
    let rows = this.props.users.map((user, index) => {
      if(this.props.userRole === Role.ADMIN) {
        return (
          <tr key={user.id}>
            <th scope='row'> {index + 1} </th>
            <td> {user.name}</td>
            <td> {user.surname}</td>
            <td> {user.patronymic}</td>
            <td> {sentenceCase(user.userRole)}</td>
            <td>
              <div className='btn-toolbar text-center'>
                <button className='btn btn-primary' onClick={this.onShowUpdateUserForm.bind(this, user)}>Update</button>
                <button className='btn btn-danger' onClick={this.deleteUser.bind(this, user)}>Delete</button>
              </div>
            </td>
          </tr>
        )
      }

      if(this.props.userRole === Role.COMPANY_OWNER) {
        return (
          <tr key={user.id}>
            <th scope='row'> {index + 1} </th>
            <td> {user.name}</td>
            <td> {user.surname}</td>
            <td> {user.patronymic}</td>
            <td> {sentenceCase(user.userRole)}</td>
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
        <button className='btn btn-default' onClick={this.onShowCreateUserForm.bind(this)}> Create </button>;

    let ownerActions = null;
    let userActions = null;
    let role = this.props.userRole;
    userActions = role === Role.ADMIN ? adminActions : userActions;
    userActions = role === Role.COMPANY_OWNER ? ownerActions : userActions;
    return (
      <div>
        <h3>List of users</h3>
        <table className='table table-striped table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Patronymic</th>
            <th>User role</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        {userActions}
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

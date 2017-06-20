import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import UserForm from './user-form';
import UserTable from './user-table';
import { cancelOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles'

class UserComponent extends React.Component {

  componentWillUnmount() {
    if(this.props.userRole === Role.COMPANY_OWNER || this.props.userRole === Role.ADMIN) {
      this.props.cancelCurrentOperation();
    }
  }

  render() {
    let content = this.props.currentUser ? (
        <div className='row'>
          <div className='col-sm-4'>
            <UserForm changes={this.props.changes} user={this.props.currentUser}/>
          </div>
          <div className='col-sm-8'>
            <UserTable users={this.props.users}/>
          </div>
        </div>
      ) : (
        <div className='container col-sm-10'>
          <div className='col align-self-center'>
            <UserTable users={this.props.users}/>
          </div>
        </div>
      );
    return (
      <div className='container'>
        {content}
      </div>
    );
  }
}

let mapStateToProps = function (state) {
  return {
    users: state.users.users,
    currentUser: state.operation.modifiedValue,
    changes: state.operation.changes,
    userRole: state.userRole.userRole
  };
};

function mapDispatchToProps(dispatch) {
  return {
    cancelCurrentOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);


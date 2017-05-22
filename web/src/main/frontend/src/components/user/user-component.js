import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import UserForm from './user-form';
import UserTable from './user-table';

class UserComponent extends React.Component {

  render() {
    let content = this.props.currentUser ? (
        <div className='row'>
          <div className='col-sm-6'>
            <UserForm changes={this.props.changes} user={this.props.currentUser}/>
          </div>
          <div className='col-sm-6'>
            <UserTable users={this.props.users}/>
          </div>
        </div>
      ) : (
        <div className='row'>
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
    changes: state.operation.changes
  };
};

export default connect(mapStateToProps, () => {})(UserComponent);


import React from 'react';
import Input from '../common/text-input';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from '../common/select';
import { loadRoles } from '../../actions/userRole.action';
import { updateUser, makeNewUser } from '../../actions/user.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';

class UserForm extends React.Component {

  componentDidMount() {
    this.props.loadUsersRoles();
  }

  handleNameChange(event) {
    this.props.updateOperation('name', event.target.value);
  }

  handleSurnameChange(event) {
    this.props.updateOperation('surname', event.target.value);
  }

  handlePatronymicChange(event) {
    this.props.updateOperation('patronymic', event.target.value);
  }

  handleEmailChange(event) {
    this.props.updateOperation('email', event.target.value);
  }

  handleLoginChange(event) {
    this.props.updateOperation('login', event.target.value);
  }

  handlePasswordChange(event) {
    this.props.updateOperation('password', event.target.value);
  }

  handleCityChange(event) {
    this.props.updateOperation('city', event.target.value);
  }

  handleStreetChange(event) {
    this.props.updateOperation('street', event.target.value);
  }

  handleHouseChange(event) {
    this.props.updateOperation('house', event.target.value);
  }

  handleFlatChange(event) {
    this.props.updateOperation('flat', event.target.value);
  }

  handleCompanyChange(event) {
    this.props.updateOperation('truckingCompanyName', event.target.value);
  }

  handleCompanyIdChange(event) {
    this.props.updateOperation('truckingCompanyId', event.target.value);
  }

  handleUserRoleChange(event) {
    this.props.updateOperation('userRole', event.target.value);
  }

  save() {
    if (this.props.user.id) {
      this.props.updateUser(this.props.user);
    } else {
      this.props.createUser(this.props.user);
    }
  }

  reset() {
    this.props.resetOperation();
  }

  cancel() {
    this.props.cancelOperation();
  }

  render() {
    let editingLabel = <span> Editing of <b> {this.props.user.name} </b> user </span>;
    let creatingLabel = <span>Create new user</span>;
    const defaultUserRole = this.props.user.userRole ? this.props.user.userRole : [];
    const disabledClass = this.props.changes ? '' : 'disabled';

    let adminActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-success' onClick={this.cancel.bind(this)}>Close</button>
        </div>
        <div className='btn-group float-right' role='group'>
          <button type='button' className={`${disabledClass} btn btn-default`}
                onClick={this.props.changes ? this.reset.bind(this) : null}>Reset
          </button>
          <button type='button' className={`${disabledClass} btn btn-primary`}
                onClick={this.props.changes ? this.save.bind(this) : null}>Save
          </button>
        </div>
      </div>;

     let ownerActions =
       <div className='btn-toolbar text-center'>
         <div className='btn-group' role='group'>
           <button type='button' className='btn btn-success' onClick={this.cancel.bind(this)}>Close</button>
         </div>
       </div>;

    let userActions = null;
    let role = this.props.userRole;
    userActions = role === "ADMIN" ? adminActions : userActions;
    userActions = role === "COMPANY_OWNER" ? ownerActions : userActions;
    let disableEditing = role !== "ADMIN";

    return (
      <div>
        <form className='form-horizontal'>
          <fieldset>
            <legend>{this.props.user.id ? editingLabel : creatingLabel} </legend>
            <Input id='name' type='text' label='name' placeholder='Enter name here'
                   value={this.props.user.name || ''} onChange={this.handleNameChange.bind(this)} readOnly={disableEditing}/>
            <Input id='surname' type='text' label='surname' placeholder='Enter surname here'
                   value={this.props.user.surname  || ''} onChange={this.handleSurnameChange.bind(this)} readOnly={disableEditing}/>
            <Input id='patronymic' type='text' label='patronymic' placeholder='Enter patronymic here'
                   value={this.props.user.patronymic  || ''} onChange={this.handlePatronymicChange.bind(this)} readOnly={disableEditing}/>
            <Input id='email' type='text' label='email' placeholder='Enter email here'
                   value={this.props.user.email  || ''} onChange={this.handleEmailChange.bind(this)} readOnly={disableEditing}/>
            <Input id='login' type='text' label='login' placeholder='Enter login here'
                   value={this.props.user.login  || ''} onChange={this.handleLoginChange.bind(this)} readOnly={disableEditing}/>
            <Input id='password' type='text' label='password' placeholder='Enter password here'
                   value={this.props.user.password  || ''} onChange={this.handlePasswordChange.bind(this)} readOnly={disableEditing}/>
            <Input id='city' type='text' label='city' placeholder='Enter city here'
                   value={this.props.user.city  || ''} onChange={this.handleCityChange.bind(this)} readOnly={disableEditing}/>
            <Input id='street' type='text' label='street' placeholder='Enter street here'
                   value={this.props.user.street  || ''} onChange={this.handleStreetChange.bind(this)} readOnly={disableEditing}/>
            <Input id='house' type='text' label='house' placeholder='Enter house here'
                   value={this.props.user.house  || ''} onChange={this.handleHouseChange.bind(this)} readOnly={disableEditing}/>
            <Input id='flat' type='text' label='flat' placeholder='Enter flat here'
                   value={this.props.user.flat  || ''} onChange={this.handleFlatChange.bind(this)} readOnly={disableEditing}/>
            <Select id="userRole" label="userRole" onChange={this.handleUserRoleChange.bind(this)}
                    options={this.props.userRolesList.map((type)=>{return ( <option> {type} </option> )})}
                    value={defaultUserRole} readOnly={disableEditing}/>
            {userActions}
          </fieldset>
        </form>
      </div>
    );
  }
}

UserForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  changes: React.PropTypes.bool,
  createUser: React.PropTypes.func.isRequired,
  updateUser: React.PropTypes.func.isRequired,
  updateOperation: React.PropTypes.func.isRequired,
  resetOperation: React.PropTypes.func.isRequired,
  cancelOperation: React.PropTypes.func.isRequired,
  loadUsersRoles: React.PropTypes.func.isRequired,
  userRolesList: React.PropTypes.array.isRequired,
  userRole: React.PropTypes.String
};

let mapStateToProps = function (state) {
  return {
    userRolesList: state.userRolesList.userRolesList,
    userRole: state.userRole.userRole
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadUsersRoles: bindActionCreators(loadRoles, dispatch),
    createUser: bindActionCreators(makeNewUser, dispatch),
    updateUser: bindActionCreators(updateUser, dispatch),
    updateOperation: bindActionCreators(updateOperation, dispatch),
    resetOperation: bindActionCreators(resetOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);

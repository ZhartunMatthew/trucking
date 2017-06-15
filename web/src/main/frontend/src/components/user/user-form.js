import React from 'react';
import Input from '../common/text-input';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from '../common/select';
import { loadRoles } from '../../actions/userRole.action';
import { updateUser, makeNewUser } from '../../actions/user.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles';
import MyInput from '../common/input';
import MySelect from '../common/select-component';
import Formsy from 'formsy-react';
import { setActionDescription } from '../../actions/modal.action'

class UserForm extends React.Component {

  constructor() {
    super();

    this.state = {
      errors: {},
      canSubmit: false
    };
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }


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

  handleCountryChange(event) {
    this.props.updateOperation('country', event.target.value);
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
    let action = "";
    let description = "";
    if (this.props.user.id) {
      this.props.updateUser(this.props.user);
      action = "Изменение пользователя!";
      description = "Информация пользователя <b>" + this.props.user.name + ' ' + this.props.user.surname + "</b> была изменена";
    } else {
      this.props.createUser(this.props.user);
      action = "Новый пользователь!";
      description = "Пользователь <b>" + this.props.user.name + ' ' + this.props.user.surname + "</b> был создан";
    }
    setActionDescription(action, description);
  }

  reset() {
    this.props.resetOperation();
  }

  cancel() {
    this.props.cancelOperation();
  }

  render() {
    Formsy.addValidationRule('isRequiredSelect', function(values, value) {
      if(value.length === 0){
        return false;
      } else {
        return true;
      }
    });

    Formsy.addValidationRule('isLoginPassword', function(values, value) {
      return (/^[a-z0-9_-]{4,16}$/.test(value));
    });

    Formsy.addValidationRule('isLetter', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z]+$/.test(value));
    });

    Formsy.addValidationRule('isStreet', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+\s*[а-яА-ЯёЁa-zA-Z0-9]*-?\.?\s*\/*[а-яА-ЯёЁa-zA-Z0-9]*$/.test(value));
    });

    Formsy.addValidationRule('isCountryCity', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+\s*[а-яА-ЯёЁa-zA-Z0-9]*-?\s*[а-яА-ЯёЁa-zA-Z0-9]*$/.test(value));
    });

    Formsy.addValidationRule('isHouseFlat', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+\/*[а-яА-ЯёЁa-zA-Z0-9]*$/.test(value));
    });

    let editingLabel = <span> Editing of <b> {this.props.user.name} </b> user </span>;
    let creatingLabel = <span>Create new user</span>;
    const defaultUserRole = this.props.user.userRole ? this.props.user.userRole : [];
    const disabledClass = this.props.changes ? '' : 'disabled';

    let adminActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button'
                  className='btn btn-success'
                  onClick={this.cancel.bind(this)}> Close </button>
        </div>
        <div className='btn-group float-right' role='group'>
          <button type='button'
                  className={`${disabledClass} btn btn-default`}
                  onClick={this.props.changes ? this.reset.bind(this) : null}> Reset </button>

          <button type='button'
                  className={`${disabledClass} btn btn-primary`}
                  onClick={this.props.changes ? this.save.bind(this) : null}
                  disabled={!this.state.canSubmit}
                  data-toggle="modal"
                  data-target="#modal-action"> Save </button>
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
    userActions = role === Role.ADMIN ? adminActions : userActions;
    userActions = role === Role.COMPANY_OWNER ? ownerActions : userActions;
    let disableEditing = role !== Role.ADMIN;

    return (
      <div>
        <Formsy.Form className='form-horizontal' onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)}>
          <fieldset>
            <legend>{this.props.user.id ? editingLabel : creatingLabel} </legend>
            <MyInput id='name' type='text' label='name' placeholder='Enter name here'
                   value={this.props.user.name || ''} onChange={this.handleNameChange.bind(this)} readOnly={disableEditing}
                    name='name' title='Name' required validations="isLetter" validationError='This field must contain only letters'/>
            <MyInput id='surname' type='text' label='surname' placeholder='Enter surname here'
                   value={this.props.user.surname  || ''} onChange={this.handleSurnameChange.bind(this)} readOnly={disableEditing}
                     name='surname' title='Surname' required validations="isLetter" validationError='This field must contain only letters'/>
            <MyInput id='patronymic' type='text' label='patronymic' placeholder='Enter patronymic here'
                   value={this.props.user.patronymic  || ''} onChange={this.handlePatronymicChange.bind(this)} readOnly={disableEditing}
                     name='patronymic' title='Patronymic' required validations="isLetter" validationError='This field must contain only letters'/>
            <MyInput id='email' type='text' label='email' placeholder='Enter email here'
                   value={this.props.user.email  || ''} onChange={this.handleEmailChange.bind(this)} readOnly={disableEditing}
                     name='email' title='Email' required validations="isEmail" validationError='Invalid email'/>
            <MyInput id='login' type='text' label='login' placeholder='Enter login here'
                   value={this.props.user.login  || ''} onChange={this.handleLoginChange.bind(this)} readOnly={disableEditing}
                     name='login' title='Login' required validations="isLoginPassword" validationError='Allowable characters: letters, numbers, -, _, at least 4 characters'/>
            <MyInput id='password' type='text' label='password' placeholder='Enter password here'
                   value={this.props.user.password  || ''} onChange={this.handlePasswordChange.bind(this)} readOnly={disableEditing || this.props.user.id}
                     name='password' title='Password' required validations="isLoginPassword" validationError='Allowable characters: letters, numbers, -, _, at least 4 characters'/>
            <MyInput id='country' type='text' label='Country' placeholder='Enter country here'
                     value={this.props.user.country  || ''} onChange={this.handleCountryChange.bind(this)} readOnly={disableEditing}
                     name='country' title='Country' required validations="isCountryCity" validationError='Allowable characters:letters, numbers,-,space'/>
            <MyInput id='city' type='text' label='city' placeholder='Enter city here'
                     value={this.props.user.city  || ''} onChange={this.handleCityChange.bind(this)} readOnly={disableEditing}
                     name='city' title='City' required validations="isCountryCity" validationError='Allowable characters:letters, numbers,-,space'/>
            <MyInput id='street' type='text' label='street' placeholder='Enter street here'
                   value={this.props.user.street  || ''} onChange={this.handleStreetChange.bind(this)} readOnly={disableEditing}
                     name='street' title='Street' required validations="isStreet" validationError='Allowable characters:letters, numbers,-,space,.,/'/>
            <MyInput id='house' type='text' label='house' placeholder='Enter house here'
                   value={this.props.user.house  || ''} onChange={this.handleHouseChange.bind(this)} readOnly={disableEditing}
                     name='house' title='House' required validations="isHouseFlat" validationError='Allowable characters:letters, numbers, /'/>
            <MyInput id='flat' type='text' label='flat' placeholder='Enter flat here'
                   value={this.props.user.flat  || ''} onChange={this.handleFlatChange.bind(this)} readOnly={disableEditing}
                     name='flat' title='Flat' required validations="isHouseFlat" validationError='Allowable characters:letters, numbers, /'/>
            <MySelect id="userRole" label="User role" onChange={this.handleUserRoleChange.bind(this)}
                    options={this.props.userRolesList.map((type)=>{return ( <option> {type} </option> )})}
                    value={defaultUserRole} disabled={disableEditing} name="User Role" title="Type" validations="isRequiredSelect"/>
            {userActions}
          </fieldset>
        </Formsy.Form>
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

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadRoles } from '../../actions/userRole.action';
import { updateUser, createUser } from '../../actions/user.action';
import { updateOperation, resetOperation, cancelOperation } from '../../actions/operation.action';
import { Role } from '../../constants/roles';
import ValidatedInput from '../common/input';
import ValidatedSelect from '../common/select';
import Formsy from 'formsy-react';
import { sentenceCase } from 'change-case';
import { DEFAULT_SELECT_VALUE, VALIDATION_ERRORS, MAX_LENGTH_OF_STRING } from '../../constants/constants';

class UserForm extends React.Component {

  constructor() {
    super();
    this.state = {
      errors: {},
      canSubmit: false
    };
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
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
    Formsy.addValidationRule('isRequiredSelect', function(values, value) {
      return value !== DEFAULT_SELECT_VALUE
    });

    Formsy.addValidationRule('isLoginPassword', function(values, value) {
      return (/^[a-z0-9_-]*$/.test(value));
    });

    Formsy.addValidationRule('isName', function(values, value) {
      return !(/(\s){2,}/g.test(value));
    });

    Formsy.addValidationRule('isCountryCity', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+\s*[а-яА-ЯёЁa-zA-Z0-9]*-?\s*[а-яА-ЯёЁa-zA-Z0-9]*$/.test(value));
    });

    Formsy.addValidationRule('isStreet', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+\s*[а-яА-ЯёЁa-zA-Z0-9]*-?\.?\s*\/*[а-яА-ЯёЁa-zA-Z0-9]*$/.test(value));
    });

    Formsy.addValidationRule('isHouseFlat', function(values, value) {
      return (/^[а-яА-ЯёЁa-zA-Z0-9]+\/*[а-яА-ЯёЁa-zA-Z0-9]*$/.test(value));
    });

    Formsy.addValidationRule('none', () => {return true});

    let editingLabel = <span> Editing of <b> {this.props.user.name} </b> user </span>;
    let creatingLabel = <span>Create new user</span>;
    const defaultUserRole = this.props.user.userRole ? this.props.user.userRole : DEFAULT_SELECT_VALUE;
    const disabledClass = this.props.changes ? '' : 'disabled';

    let adminActions =
      <div className='btn-toolbar text-center'>
        <div className='btn-group' role='group'>
          <button type='button'
                  className={`${disabledClass} btn btn-success`}
                  onClick={this.props.changes ? this.save.bind(this) : null}
                  disabled={!this.state.canSubmit}> Save </button>
        </div>
        <div className='btn-group float-right' role='group'>
          <button type='button'
                  className={`${disabledClass} btn btn-default`}
                  onClick={this.props.changes ? this.reset.bind(this) : null}> Reset </button>
          <button type='button'
                  className='btn btn-primary'
                  onClick={this.cancel.bind(this)}> Close </button>
        </div>
      </div>;

     let ownerActions =
       <div className='btn-toolbar text-center'>
         <div className='btn-group' role='group'>
           <button type='button' className='btn btn-primary' onClick={this.cancel.bind(this)}>Close</button>
         </div>
       </div>;

    let userActions = null;
    let role = this.props.userRole;
    userActions = role === Role.ADMIN ? adminActions : userActions;
    userActions = role === Role.COMPANY_OWNER ? ownerActions : userActions;
    let disableEditing = role !== Role.ADMIN;
    let showPassword = !this.props.user.id && role === Role.ADMIN;

    return (
      <div>
        <Formsy.Form className='form-horizontal'
                     onValid={this.enableButton.bind(this)}
                     onInvalid={this.disableButton.bind(this)}>
          <fieldset>
            <legend>{this.props.user.id ? editingLabel : creatingLabel} </legend>
            <ValidatedInput id='name'
                            type='text'
                            placeholder='Enter name here'
                            value={this.props.user.name || ''}
                            onChange={this.handleNameChange.bind(this)}
                            readOnly={disableEditing}
                            name='name'
                            title='Name'
                            required
                            validations={{
                              isName: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isName: VALIDATION_ERRORS.TO_MUCH_SPACES_IN_A_ROW,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='surname'
                            type='text'
                            placeholder='Enter surname here'
                            value={this.props.user.surname  || ''}
                            onChange={this.handleSurnameChange.bind(this)}
                            readOnly={disableEditing}
                            name='surname'
                            title='Surname'
                            required
                            validations={{
                              isName: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isName: VALIDATION_ERRORS.TO_MUCH_SPACES_IN_A_ROW,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='patronymic'
                            type='text'
                            placeholder='Enter patronymic here'
                            value={this.props.user.patronymic  || ''}
                            onChange={this.handlePatronymicChange.bind(this)}
                            readOnly={disableEditing}
                            name='patronymic'
                            title='Patronymic'
                            required
                            validations={{
                              isName: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isName: VALIDATION_ERRORS.TO_MUCH_SPACES_IN_A_ROW,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='email'
                            type='text'
                            placeholder='Enter email here'
                            value={this.props.user.email  || ''}
                            onChange={this.handleEmailChange.bind(this)}
                            readOnly={disableEditing}
                            name='email'
                            title='Email'
                            required
                            validations={{
                              isEmail: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isEmail: VALIDATION_ERRORS.INVALID_EMAIL,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='login'
                            type='text'
                            label='login'
                            placeholder='Enter login here'
                            value={this.props.user.login  || ''}
                            onChange={this.handleLoginChange.bind(this)}
                            readOnly={disableEditing}
                            name='login'
                            title='Login'
                            required
                            validations={{
                              isLoginPassword: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isLoginPassword: VALIDATION_ERRORS.INVALID_LOGIN_PASSWORD,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            {showPassword ? <ValidatedInput id='password'
                                            type='text'
                                            placeholder='Enter password here'
                                            value={this.props.user.password || ''}
                                            onChange={this.handlePasswordChange.bind(this)}
                                            readOnly={disableEditing || this.props.user.id}
                                            name='password'
                                            title='Password'
                                            required
                                            validations={{
                                              isLoginPassword: true,
                                              maxLength: MAX_LENGTH_OF_STRING
                                            }}
                                            validationErrors={{
                                              isLoginPassword: VALIDATION_ERRORS.INVALID_LOGIN_PASSWORD,
                                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                                            }}/>
              : null
            }

            <ValidatedInput id='country'
                            type='text'
                            placeholder='Enter country here'
                            value={this.props.user.country  || ''}
                            onChange={this.handleCountryChange.bind(this)}
                            readOnly={disableEditing}
                            name='country'
                            title='Country'
                            required
                            validations={{
                              isCountryCity: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isCountryCity: VALIDATION_ERRORS.LETTERS_DIGITS_HYPHEN_SPACE,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='city'
                            type='text'
                            placeholder='Enter city here'
                            value={this.props.user.city  || ''}
                            onChange={this.handleCityChange.bind(this)}
                            readOnly={disableEditing}
                            name='city'
                            title='City'
                            required
                            validations={{
                              isCountryCity: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isCountryCity: VALIDATION_ERRORS.LETTERS_DIGITS_HYPHEN_SPACE,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='street'
                            type='text'
                            placeholder='Enter street here'
                            value={this.props.user.street  || ''}
                            onChange={this.handleStreetChange.bind(this)}
                            readOnly={disableEditing}
                            name='street'
                            title='Street'
                            required
                            validations={{
                              isStreet: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isStreet: VALIDATION_ERRORS.LETTERS_DIGITS_HYPHEN_UNDERSCORE_DOT_SPACE_SLASH,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedInput id='house'
                            type='text'
                            placeholder='Enter house here'
                            value={this.props.user.house  || ''}
                            onChange={this.handleHouseChange.bind(this)}
                            readOnly={disableEditing}
                            name='house'
                            title='House'
                            required
                            validations={{
                              isHouseFlat: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isHouseFlat: VALIDATION_ERRORS.LETTERS_DIGITS_SLASH,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>


            <ValidatedInput id='flat'
                            type='text'
                            placeholder='Enter flat here'
                            value={this.props.user.flat  || ''}
                            onChange={this.handleFlatChange.bind(this)}
                            readOnly={disableEditing}
                            name='flat'
                            title='Flat'
                            required
                            validations={{
                              isHouseFlat: true,
                              maxLength: MAX_LENGTH_OF_STRING
                            }}
                            validationErrors={{
                              isHouseFlat: VALIDATION_ERRORS.LETTERS_DIGITS_SLASH,
                              maxLength: VALIDATION_ERRORS.MAX_LENGTH_OF_STRING
                            }}/>

            <ValidatedSelect id='userRole'
                             onChange={this.handleUserRoleChange.bind(this)}
                             options={this.props.userRolesList.map(type => {return (
                               <option key={type} value={type}> {sentenceCase(type)} </option>
                             )})}
                             value={defaultUserRole}
                             disabled={disableEditing}
                             name='userRole'
                             title='User role'
                             validations='isRequiredSelect'/>
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
  userRole: React.PropTypes.string
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
    createUser: bindActionCreators(createUser, dispatch),
    updateUser: bindActionCreators(updateUser, dispatch),
    updateOperation: bindActionCreators(updateOperation, dispatch),
    resetOperation: bindActionCreators(resetOperation, dispatch),
    cancelOperation: bindActionCreators(cancelOperation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);

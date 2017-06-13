import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions/authorization.action'

export class LoginPage extends React.Component {

  componentDidMount() {
    $('#submit').prop("disabled", true);
  }

  login() {
    console.log("login");
    let auth = {};
    auth.username = this.username.value;
    auth.password = this.password.value;
    logIn(auth);
  }

  render() {
    return (
      <div>
        <div className="background-login">
          <div className="container col-sm-3">
            <div className="row">
              <div className="col align-self-center">
                <div className="panel panel-info login-form-offset">
                  <div className="panel-heading">
                    <h4 className="text-center login-style"> Sign in </h4>
                  </div>
                  <div className="panel-body">
                    <div className="form-group">
                      <label className="label"> Login </label>
                      <input type="text"
                             className="form-control"
                             placeholder="Type your login"
                             ref={(input) => this.username = input}
                             onKeyDown={this.checkInput.bind(this)}
                             autoFocus/>
                    </div>
                    <div className="form-group">
                      <label className="label"> Password </label>
                      <input type="password"
                             className="form-control"
                             placeholder="Type your pass"
                             ref={(input) => this.password = input}
                             onKeyDown={this.checkInput.bind(this)}/>
                    </div>
                    <button className="btn btn-success btn-block"
                            id="submit"
                            onClick={this.login.bind(this)}> Submit </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  checkInput(event) {
    if(!this.checkUsername() || !this.checkPassword()) {
      $('#submit').prop("disabled", true);
    } else {
      $('#submit').prop("disabled", false);
      if(event.key === "Enter") {
        this.login();
      }
    }
  }

  checkUsername() {
    let login = this.username.value;
    if(login.length < 2) {
      return false;
    } else {
      return true;
    }
  }

  checkPassword() {
    let password = this.password.value;
    if(password.length < 2) {
      return false;
    } else {
      return true;
    }
  }
}

function mapStateToProps (state) {
}

function mapDispatchToProps (dispatch) {
}

export default connect(mapStateToProps, mapDispatchToProps) (LoginPage);


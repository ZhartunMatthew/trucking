import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions/authorization.action'

export class LoginPage extends React.Component {

  componentDidMount() {
    $('#submit').prop("disabled", true);
    setInterval(this.setNewBackground, 4000);
  }

  login() {
    let auth = {};
    auth.username = this.username.value;
    auth.password = this.password.value;
    logIn(auth);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse bg-inverse navbar-toggleable-md header-login">
          <a className="navbar-brand" href="#"> Trucking </a>
          <div className="collapse navbar-collapse" id="containerNavbar">
            <ul className="navbar-nav mr-auto">
              <li/>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a className="nav-link" href="#" data-toggle="modal" data-target="#login-modal"> Login </a>
              </li>
            </ul>
          </div>
        </nav>
        <div id="login-content" className="background-login"/>
        <div id="login-modal" className="modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-login">
            <div className="container">
              <div className="row">
                <div className="col align-self-center">
                  <div className="panel panel-info modal-content-login">
                    <div className="panel-heading">
                      <h4 className="text-center"> Sign in </h4>
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
                      <div className='text-center'>
                        <button className="btn btn-success btn-block"
                                id="submit"
                                onClick={this.login.bind(this)}> Submit </button>
                        <div className="close"/>
                      </div>
                    </div>
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

  setNewBackground() {
    let urls = [
      'https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAjVAAAAJGIwZTAzMmMzLTQ3OGQtNDY4My1iNDUzLTgzNmIzYWU2NDhjNg.jpg',
      'http://iphoto.md/images/2014/11/02/fotolia_6904907.jpg',
      'https://az480170.vo.msecnd.net/44e8f4df-a2c6-4d53-84f1-c1d6e0db0654/img/prd/4d14b488-e109-4cf6-bb32-6618959bd9ed/l_are-u.s.-trucking-companies-subject-to-canadian-taxes-.png',
      'https://images.kurier.at/46-70517562.jpg/251.123.839',
      'http://ww4.hdnux.com/photos/55/65/73/12017395/3/rawImage.jpg',
    ];
    let num = Math.floor(Math.random() * (urls.length));
    $('#login-content').fadeTo('slow', 0.3, function () {
      $(this).css('background-image', 'url(' + urls[num] + ')');
    }).fadeTo('slow', 1);
  }
}

function mapStateToProps (state) {
}

function mapDispatchToProps (dispatch) {
}

export default connect(mapStateToProps, mapDispatchToProps) (LoginPage);


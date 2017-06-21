import React from 'react';
import { setActionFail } from '../actions/modal.action'

class ErrorPage extends React.Component {

  componentDidMount() {
    setActionFail('404');
    this.context.router.push('/');
  }

  render() {
    return (
      <div> Error </div>
    )
  }
}

ErrorPage.contextTypes = {
  router: React.PropTypes.func
};

export default ErrorPage;

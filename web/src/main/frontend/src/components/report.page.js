import React from 'react';
import {connect} from 'react-redux';

class ReportPage extends React.Component {
  download() {
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: '/report/download',
      };
      // server sent the url to the file!
      // now, let's download:
      window.location.href = response.file;
      // you could also do:
      // window.open(response.file);
    }, 100);
  }
  render() {
    return(
      <div>
        <div>
          Hello {this.props.currentUser.name} {this.props.currentUser.surname}!
          You can download your profits and losses report here.
        </div>
        <div>
        <button onClick={this.download} className='btn btn-success'>Download report </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps, ()=>{})(ReportPage);

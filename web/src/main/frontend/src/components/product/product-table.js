import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { startOperation } from '../../actions/operation.action';

class ProductTable extends React.Component {

  render() {
    let rows = null;
    if(this.props.products !== undefined && this.props.products !== null) {
      rows = this.props.products.map((product, index) => {
        return (
          <tr key={index + 1}>
            <th scope='row'> {index + 1} </th>
            <td> {product.name}</td>
            <td> {product.amount}</td>
          </tr>
        )
      });
    }
    return (
      <div>
        <h1> List of products </h1>
        <table className='table table-hover'>
          <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>amount</th>
          </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }

  shouldComponentUpdate(nextState, nextProp) {
    console.log("UPDATE????");
    return true;
  }
}

ProductTable.propTypes = {
  products: React.PropTypes.array.isRequired,
  startOperation: React.PropTypes.func.isRequired
};

let mapStateToProps = function (state, param) {
  console.log("TABLE STATE TO PROPS");
  console.log("TABLE MAP: ", state.products.products); // вот тут точно приходит новый стейт
  console.log("STATE", state);
  console.log("PARAM", param);
  return {
    products: state.products.products
  };
};

function mapDispatchToProps(dispatch) {
  return {
    startOperation: bindActionCreators(startOperation, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable); //вот тут связываем это дело с компонентом



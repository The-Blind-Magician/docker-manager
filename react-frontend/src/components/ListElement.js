import React from 'react';
import OperationsButtons from './OperationsButtons';

class ListElement extends React.Component {

    constructor(props) {   
        super(props);
        this.state = {
            status: 'unknown',
            previousStatus: "",
        };
    }

/**
 * Renders a list element with the service name, operations buttons, and status.
 * @returns {JSX.Element} The rendered list element.
 */
  render() {
    const tagStyle = {
        display: 'inline-block',
        minWidth: '70px',
        marginLeft: '5px',
    };

    const liStyle = {
        listStyleType: 'none',
        padding: '2px',
        border: '1px solid black',
        margin: '5px',
        borderRadius: '5px',
        backgroundColor: '#B9D6F2',
    };

    return (
        <li style={liStyle}>
            <span style={tagStyle}>{this.props.serviceName}</span>
            <OperationsButtons serviceName={this.props.serviceName}/>  Status: {this.props.status}
        </li>
    );
  }
} export default ListElement;
import React from 'react';

/**
 * Represents a component that renders a list of operation buttons.
 */
class OperationsButtons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    };

    operationsList = [
        { name: 'Start', handler: this.startService },
        { name: 'Stop', handler: this.stopService },
        { name: 'Restart', handler: this.restartService },
        { name: 'Update', handler: this.updateService }
        ];

    async startService(serviceName) {
        try {
            await fetch(`http://192.168.0.200:1213/api/services/${serviceName}/start`, { method: 'POST' });
            // Update the state or show a success message
        } catch (error) {
            console.error('Error starting service:', error);
            // Show an error message
        }
    };

    async stopService(serviceName) {
        try {
            await fetch(`http://192.168.0.200:1213/api/services/${serviceName}/stop`, { method: 'POST' });
            // Update the state or show a success message
        } catch (error) {
            console.error('Error stopping service:', error);
            // Show an error message
        }
    };

    async restartService(serviceName) {
        try {
            await fetch(`http://192.168.0.200:1213/api/services/${serviceName}/restart`, { method: 'POST' });
            // Update the state or show a success message
        } catch (error) {
            console.error('Error restarting service:', error);
            // Show an error message
        }
    }

    async updateService(serviceName) {
        try {
            await fetch(`http://192.168.0.200:1213/api/services/${serviceName}/update`, { method: 'POST' });
            // Update the state or show a success message
        } catch (error) {
            console.error('Error updating service:', error);
            // Show an error message
        }
    }

  render() {

    const buttonStyle = {
        margin: '5px',
    };

    return ( 
    <>
        { 
            this.operationsList.map (
                (operation) => (
                    <button style={buttonStyle} key={operation.name} onClick={() => {operation.handler(this.props.serviceName);}}>{operation.name}</button>
                )
            )
        }
    </>
    );
  }
} export default OperationsButtons;
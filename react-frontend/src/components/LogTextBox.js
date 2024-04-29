import React from "react";

class LogTextBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: "",
      dropDownValue: ""
    };
  }

  getLogs = async (e) => {
    try {
        var serviceName = e.target.value;
        const response = await fetch(`http://192.168.0.200:1213/api/services/${serviceName}/logs`);
        const data = await response.json();
        this.setState({logs: data.output});
        // Update the state or show a success message
    }
    catch (error) {
        console.error('Error starting service:', error);
        // Show an error message
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h2>Logs</h2>
        <select onChange={this.getLogs}>
        { //foreach service in services, add a dropdown with the service name
        
            this.props.services.map(service => {
                return (
                //Add service to dropdown menu
                    <option value={service}>{service}</option>
                );
            })
        }
        </select>
        <textarea
          style={{ width: "100%", height: "400px"}}
          value={this.state.logs}
          readOnly
        />
      </div>
    );
  }
} export default LogTextBox;
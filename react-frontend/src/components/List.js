import React from 'react';
import ListElement from './ListElement';

/**
 * Represents a list component that displays the status of services.
 */
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statuses: [],
        };
    };

    /**
     * Fetches the status of services from the API.
     * @returns {Promise<string>} The status of services or 'unknown' if an error occurs.
     */
    async getStatus() {
        try {
            var requestUrl = 'http://192.168.0.200:1213/api/services/status';
            const response = await fetch(requestUrl);
            const data = await response.json();
            this.setState({statuses: data.status});
        } catch (error) {
            return 'unknown';
        }
    }

    componentDidMount() {
        // Run getStatus every 5 seconds    
        this.getStatus();
        this.interval = setInterval(() => this.getStatus(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if (!this.props.services.length) {
            return <div>Loading...</div>;
        }
        return (
            <ul style={{paddingInline:"5px" }}>
                {                            
                    this.state.statuses.map(statusStr => {
                        var service = statusStr.split(" ")[0];
                        var status = statusStr.split(" ").slice(1, statusStr.length-1).join(" ");
                        return (
                            <ListElement serviceName={service} key={service} status={status}/>
                        );
                    })
                }
            </ul>
        );
    }
}

export default List;

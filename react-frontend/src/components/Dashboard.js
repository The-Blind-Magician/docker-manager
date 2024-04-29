import React from 'react';
import List from './List';
import LogTextBox from './LogTextBox';

/**
 * Represents the Docker Compose Group Manager component.
 */
class DockerComposeGroupManager extends React.Component {

    /**
     * Constructs a new DockerComposeGroupManager component.
     * @param {Object} props - The component props.
     */
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    /**
     * Renders the DockerComposeGroupManager component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        return (
            <div class="flex-container" style={{}}>
                <h1>Docker Compose Group Manager</h1>
                <List services={this.props.services}/>
                <LogTextBox name="logs" services={this.props.services}/>
            </div>
        );
    }
};

export default DockerComposeGroupManager;
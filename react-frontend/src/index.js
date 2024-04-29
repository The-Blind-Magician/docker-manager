/**
 * The entry point of the React application.
 * 
 * @module index
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DockerComposeGroupManager from './components/Dashboard';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

var services = [];

/**
 * Fetches the services from the API.
 * 
 * This function makes an asynchronous request to the specified API endpoint
 * and retrieves an array of services. The API response is expected to be in JSON format.
 * 
 * @async
 * @function fetchServices
 * @returns {Promise<Array>} The array of services fetched from the API.
 */
async function fetchServices() {
  try {
    const response = await fetch('http://192.168.0.200:1213/api/services');
    const data = await response.json();
    return data;
  } catch (error) {
      console.error('Error fetching services:', error);
  }
}

services = await fetchServices();

root.render(
  <React.StrictMode>
    <DockerComposeGroupManager services={services}/>
  </React.StrictMode>
);

reportWebVitals(console.log);

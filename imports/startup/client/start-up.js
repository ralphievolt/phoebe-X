import React from 'react'
import ReactDOM from 'react-dom'
import { Routes } from './routes.jsx'

Meteor.startup(function() {
    ReactDOM.render(<Routes />, document.getElementById('react-root'));
})
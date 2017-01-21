import React, { Component } from 'react'

const Loading = () => (
    <div className="ui segment">
        <div className="ui active inverted dimmer">
            <div className="ui large text loader">Loading</div>
        </div>
        <img className="ui wireframe image" src="/paragraph.png" />
    </div>
)
export default Loading
import React, { Component } from 'react'
import history from './history'

export default class Link extends Component {

    handleClick = e => {
        const { onClick, to } = this.props
        if (onClick){
            onClick(e)
        }

        e.preventDefault()
        history.push(to)
    }

    render() {
        return (
            <a  {...this.props} onClick={this.handleClick}/>
        )
    }
}
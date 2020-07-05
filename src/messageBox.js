import React from 'react'
export default class messageBox extends React.Component{
	render(){
		return(
			<div className={`box ${this.props.className}`}>{this.props.text}</div>
		)
	}
}
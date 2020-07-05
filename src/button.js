import React from 'react'
export default class Button extends React.Component{
	render(){
		return <div className ="btnHolder"><button id="btn" onClick={this.props.onButtonClick}>SPEAK</button></div>
	}
}
import React, { Component } from 'react';
import './modal.css'

class Modal extends Component {

	render(){

		return(

			<div className="modal-box" style={{visibility:this.props.visible}}>
				<div className="modal">
					{this.props.children}
				</div>				
			</div>
		)
	}
}

export default Modal;
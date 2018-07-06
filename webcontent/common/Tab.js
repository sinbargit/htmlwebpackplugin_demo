import React, {
	Component
} from 'react';
import './tab.css'

class Tab extends Component {

	static defaultProps = {
		callback: function() {

		},
		defaultActive: 0
	}

	constructor(props) {
		super(props);

		this.state = {
			currentIndex: this.props.defaultActive * 1
		}
	}

	checkTitleIndex(index) {
		return index === this.state.currentIndex ? 'on' : null;
	}

	checkContentIndex(index) {
		return index === this.state.currentIndex ? 'content on' : 'content';
	}

	setIndex(index) {
		this.setState({
			currentIndex: index
		});
		this.props.callback(index);
	}

	render() {
		return (
			<div className="tab-box">
				<div className="tab-menu">
					{
						React.Children.map(this.props.children,(element,index) => {
							return(
								<span onClick={this.setIndex.bind(this,index,element.props)} className={this.checkTitleIndex(index)}>{element.props.title}</span>
							)
						})
					}
				</div>
				<div className="tab-content">
					{
						React.Children.map(this.props.children,(element,index) => {
							return(
								<div className={this.checkContentIndex(index)}>{element}</div>
							)
						})
					}
				</div>
			</div>

		)
	}
}

export default Tab;
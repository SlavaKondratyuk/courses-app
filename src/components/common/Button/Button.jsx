import React from 'react';

class Button extends React.Component {
	constructor(props) {
		super(props);

		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler = () => {
		this.props.clickHandler();
	};

	render() {
		const { name } = this.props;
		return <button>{name}</button>;
	}
}

export default Button;

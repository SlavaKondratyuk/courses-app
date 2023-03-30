import './Button.css';

type ButtonProps = {
	name: string;
	clickHandler: () => void;
};

export default function Button(props: ButtonProps) {
	const { name } = props;

	function clickHandler() {
		props.clickHandler();
	}

	return (
		<button className='button_main' onClick={clickHandler}>
			{name}
		</button>
	);
}

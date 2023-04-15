import './Button.css';

type ButtonProps = {
	name: string;
	clickHandler: () => void;
	className?: string;
};

export default function Button(props: ButtonProps) {
	const { name } = props;

	function clickHandler() {
		props.clickHandler();
	}

	return (
		<button
			className={
				props.className ? 'button_main ' + props.className : 'button_main'
			}
			onClick={clickHandler}
		>
			{name}
		</button>
	);
}

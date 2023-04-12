import { Author } from '../../../interfaces/interfaces';

import Button from '../../../common/Button/Button';

import './AuthorsList.css';

type AuthorListProps = {
	authors: Author[];
	addAuthor: (author: any) => void;
};

export default function AuthorsList(props: AuthorListProps) {
	function addAuthor(author: Author) {
		props.addAuthor(author);
	}

	return (
		<div className='authors-list__wrapper'>
			<h2>Authors List</h2>
			{props.authors?.map((author) => (
				<div key={author.id} className='author__wrapper'>
					<p>{author.name}</p>
					<Button name='Add Author' clickHandler={() => addAuthor(author)} />
				</div>
			))}
		</div>
	);
}

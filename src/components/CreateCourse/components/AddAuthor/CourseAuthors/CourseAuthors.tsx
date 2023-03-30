import { Author } from '../../../../interfaces/interfaces';

import Button from '../../../../common/Button/Button';

type CourseAuthorsProps = {
	authors: Author[];
	deleteAuthor: (id: string) => void;
};

export default function CourseAuthors(props: CourseAuthorsProps) {
	const { authors } = props;

	function deleteAuthor(id: string) {
		props.deleteAuthor(id);
	}

	if (authors.length === 0) {
		return <p>Course authors is empty</p>;
	}

	return (
		<div>
			<ul>
				{props.authors.map((author) => (
					<li key={author.id}>
						{author.name}{' '}
						<Button
							name='Delete Author'
							clickHandler={() => deleteAuthor(author.id)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

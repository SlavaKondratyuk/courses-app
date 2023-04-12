export declare interface Author {
	id: string;
	name: string;
}

export declare interface CourseInterface {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export declare interface NewCourseInterface {
	title: string;
	description: string;
	duration: number;
	authors: string[];
}

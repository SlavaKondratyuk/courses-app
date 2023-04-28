const methods = {
	get: 'GET',
	post: 'POST',
	put: 'PUT',
	delete: 'DELETE',
};

const api = {
	login: '/login',
	register: '/register',
	courses: '/courses/all',
	authors: '/authors/all',
	addNewCourse: '/courses/add',
	addNewAuthor: '/authors/add',
	userMe: '/users/me',
	update: '/courses/',
};

const url = 'http://localhost:4000';

export async function LoginUser(loginData) {
	const response = await fetch(url + api.login, {
		method: methods.post,
		body: JSON.stringify(loginData),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.json();
}

export async function RegisterUser(registerData) {
	const response = await fetch(url + api.register, {
		method: methods.post,
		body: JSON.stringify(registerData),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.json();
}

export async function GetCourses() {
	const response = await fetch(url + api.courses, {
		method: methods.get,
	});
	return response.json();
}

export async function GetAuthors() {
	const response = await fetch(url + api.authors, {
		method: methods.get,
	});
	return response.json();
}

export async function AddNewCourse(courseData) {
	const response = await fetch(url + api.addNewCourse, {
		method: methods.post,
		body: JSON.stringify(courseData),
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('loginToken'),
		},
	});
	return response.json();
}

export async function AddNewAuthor(authorData) {
	const response = await fetch(url + api.addNewAuthor, {
		method: methods.post,
		body: JSON.stringify(authorData),
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('loginToken'),
		},
	});
	return response.json();
}

export async function UpdateCourseService(courseId, courseData) {
	const response = await fetch(url + api.update + courseId, {
		method: methods.put,
		body: JSON.stringify(courseData),
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('loginToken'),
		},
	});
	return response.json();
}

export async function DeleteCourseService(courseId) {
	const response = await fetch(url + api.update + courseId, {
		method: methods.delete,
		headers: {
			Authorization: localStorage.getItem('loginToken'),
		},
	});
	return response.json();
}

export async function CheckMe() {
	const token = localStorage.getItem('loginToken');
	const response = await fetch(url + api.userMe, {
		method: methods.get,
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});
	return response.json();
}

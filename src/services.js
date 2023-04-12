import axios from 'axios';

const methods = {
	get: 'get',
	post: 'post',
	put: 'put',
	delete: 'delete',
};

const api = {
	login: '/login',
	register: '/register',
	courses: '/courses/all',
	authors: '/authors/all',
	addNewCourse: '/courses/add',
	addNewAuthor: '/authors/add',
};

const url = 'http://localhost:4000';

export async function LoginUser(loginData) {
	return await axios({
		method: methods.post,
		url: url + api.login,
		data: JSON.stringify(loginData),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export async function RegisterUser(registerData) {
	return await axios({
		method: methods.post,
		url: url + api.register,
		data: JSON.stringify(registerData),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export async function GetCourses() {
	return await axios({
		method: methods.get,
		url: url + api.courses,
	});
}

export async function GetAuthors() {
	return await axios({
		method: methods.get,
		url: url + api.authors,
	});
}

export function AddNewCourse(courseData) {
	return axios({
		method: methods.post,
		url: url + api.addNewCourse,
		data: courseData,
		headers: {
			Authorization: localStorage.getItem('loginToken'),
		},
	});
}

export function AddNewAuthor(authorData) {
	return axios({
		method: methods.post,
		url: url + api.addNewAuthor,
		data: JSON.stringify(authorData),
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('loginToken'),
		},
	});
}

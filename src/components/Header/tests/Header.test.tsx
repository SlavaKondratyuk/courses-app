import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import 'jest-localstorage-mock';

import Header from '../Header';
import store from '../../../store/store';

describe('Header component', () => {
	beforeEach(() => {
		// Mock the localStorage object
		localStorage.clear();
	});

	afterAll(() => {
		// Clean up the localStorage mock
		localStorage.clear();
	});

	test('renders name correctly', () => {
		const { getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Provider>
		);
		const nameElement = getByText('Guest');

		expect(nameElement).toBeInTheDocument();
	});

	test('logs out user when logout button is clicked', () => {
		localStorage.setItem('name', 'test');
		localStorage.setItem('loginToken', 'test');
		localStorage.setItem('email', 'test');
		localStorage.setItem('isAuth', 'true');

		const { getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Provider>
		);
		const logoutButton = getByText('Log Out');
		fireEvent.click(logoutButton);

		expect(localStorage.getItem('name')).toBeUndefined();
		expect(localStorage.getItem('loginToken')).toBeUndefined();
		expect(localStorage.getItem('email')).toBeUndefined();
		expect(localStorage.getItem('isAuth')).toBeUndefined();
	});
});

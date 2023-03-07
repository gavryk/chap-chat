import { body } from 'express-validator';

export const loginValidator = [
	body('userEmail', 'Email format is incorrect!').isEmail(),
	body('password', 'The password must be at least 5 characters long!').isLength({ min: 5 }),
];

export const registerValidator = [
	body('userEmail', 'Email format is incorrect!').isEmail(),
	body('password', 'The password must be at least 5 characters long!').isLength({ min: 5 }),
	body('userName', 'Enter your name!').isLength({ min: 3 }),
	body('avatarUrl', 'The avatar link is incorrect!').optional().isString(),
];

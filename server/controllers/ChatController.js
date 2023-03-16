import UserModel from '../models/User.js';

export const getAllPeople = async (req, res) => {
	const users = await UserModel.find({}, { _id: 1, userName: 1, avatarUrl: 1 });
	res.json(users);
};

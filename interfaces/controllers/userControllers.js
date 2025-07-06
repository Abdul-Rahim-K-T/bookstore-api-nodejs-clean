

export class UserController {
	constructor(userUsecase) {
		this.userUsecase = userUsecase;
	}

	signup = async (req, res) => {
		try {
			const user = await this.userUsecase.signup(req.body);
			res.status(201).json(user);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	};

	login = async (req, res) => {
		try {
			const result = await this.userUsecase.login(req.body);
			res.json(result);
		} catch (err) {
			res.status(401).json( { error: err.message});
		}
	};

	getAllUsers = async (req, res) => {
		try {
			const users = await this.userUsecase.getAllUsers();
			res.json(users);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	};

	getMe = async (req, res) => {
		try {
			const user = await this.userUsecase.getMe(req.user.id);
			if (!user) return res.status(404).json({ error: 'User not found'});
			res.json(user);
		} catch (err) {
			res.status(500).json({ error: err.message})
		}
	};
}
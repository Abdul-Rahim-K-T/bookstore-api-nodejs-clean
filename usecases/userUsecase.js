import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../domain/models/User.js';


export class UserUsecase{
    constructor(userRepository) {
        this.userRepo = userRepository;
    }

    async signup({ name, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword})
        return await this.userRepo.create(user);
    }

    async login({ email, password }) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error('Invalid credentials');
        
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { token };
    }

    async getAllUsers() {
        return await this.userRepo.findAll();
    }

    async getMe(id) {
        return await this.userRepo.findById(id);
    }
}
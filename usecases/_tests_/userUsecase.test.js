import { UserUsecase } from "../userUsecase";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { jest } from '@jest/globals';

dotenv.config();
describe('UserUsecase', () => {
    let mockRepo;
    let usecase;
    beforeEach(()=>{
        mockRepo = {
            create: jest.fn(),
            findByEmail: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
        };

        usecase = new UserUsecase(mockRepo);
    });

    test('signup: should has password and create user', async() => { 
        const input = { name: 'Abdul', email: 'rahim@example.com', password: '1234' };

        mockRepo.create.mockImplementation(user => Promise.resolve(user));

        const result = await usecase.signup(input);

        expect(mockRepo.create).toHaveBeenCalled();
        expect(result.password).not.toBe('1234');
        const isHashed = await bcrypt.compare('1234', result.password);
        expect(isHashed).toBe(true);
     });

     test('login should return JWT on valid credentials', async() => {
        const password = 'secret';
        const hashedPassword = await bcrypt.hash(password, 10);
        const fakeUser = {id: 1, email: 'rahim@example.com', password: hashedPassword };

        mockRepo.findByEmail.mockResolvedValue(fakeUser);
        
        const result = await usecase.login({ email: 'rahim@example.com', password});

        expect(result).toHaveProperty('token');

        const decoded = jwt.verify(result.token, process.env.JWT_SECRET);
        expect(decoded.email).toBe('rahim@example.com');
     });

     test('login should throw error for wrong password', async () => {
        const password = 'wrongpass';
        const hashedPassword = await bcrypt.hash('correctpass', 10);
        const fakeUser = { id: 1, email: 'rahim@example.com', password: hashedPassword };

        mockRepo.findByEmail.mockResolvedValue(fakeUser);

        await expect(usecase.login({ email: 'rahim@example.com', password }))
            .rejects
            .toThrow('Invalid credentials');
     });

     test('getAllUsers should return user list', async() => {
        const users = [{ id: 1, name: 'Rahim' }, { id:2, name: 'Khan' }];
        mockRepo.findAll.mockResolvedValue(users);

        const result = await usecase.getAllUsers();
        expect(result).toEqual(users);
        expect(result.length).toBe(2);
     });

     test('getMe should return user by ID', async () => {
        const user = {id: 1, name: 'Rahim', email: 'rahim@example.com'};
        mockRepo.findById.mockResolvedValue(user);

        const result = await usecase.getMe(1);
        expect(result).toEqual(user);
     })
});
import { User } from "../../domain/models/User.js";
import { pool } from "./index.js";





export class UserRepository {
    async create(user) {
        const result = await pool.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
            [user.name, user.email, user.password]
        );
        return new User(result.rows[0]);
    }

    async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) return null;
        return new User(result.rows[0]);
    }

    async findAll(){
        const result = await pool.query('SELECT id, name, email FROM users');
        return result.rows;
    }

    async findById(id) {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length ===0) return null;
        return result.rows[0];
    }

}
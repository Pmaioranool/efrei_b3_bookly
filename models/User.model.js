const { pool } = require("../config/db.postgres");

class User {
  static async getAll() {
    const res = await pool.query("SELECT * FROM users ORDER BY id");
    return res.rows;
  }

  static async getById(id) {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0] || null;
  }

  static async create({ name, email }) {
    const res = await pool.query(
      "INSERT INTO users (name,email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    return res.rows[0];
  }

  static async update(id, { name, email }) {
    const res = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    return res.rows[0] || null;
  }

  static async deleteById(id) {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return { deleted: true };
  }
}

module.exports = User;

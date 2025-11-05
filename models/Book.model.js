const { pool } = require("../config/db.postgres");

class Book {
  static async getAll() {
    const res = await pool.query("SELECT * FROM books ORDER BY id");
    return res.rows;
  }

  static async getById(id) {
    const res = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    return res.rows[0] || null;
  }

  static async create({ title, author, available = true }) {
    const res = await pool.query(
      "INSERT INTO books (title, author, available) VALUES ($1, $2, $3) RETURNING *",
      [title, author, available]
    );
    return res.rows[0];
  }

  static async update(id, { title, author, available }) {
    const res = await pool.query(
      "UPDATE users SET  title =$1, author = $2, available = $3 WHERE id = $3 RETURNING *",
      [title, author, available, id]
    );
    return res.rows[0] || null;
  }

  static async deleteById(id) {
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
    return { deleted: true };
  }
}

module.exports = Book;

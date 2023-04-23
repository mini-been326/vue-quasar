const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const { pool } = require('../db');

// 회원가입
router.post('/signup', [
  body('username').trim().notEmpty().withMessage('Username is required').escape(),
  body('password').trim().notEmpty().withMessage('Password is required').escape(),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Check if user already exists
    const user = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (user.length > 0) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash password and store user in DB
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 로그인
router.post('/login', [
  body('username').trim().notEmpty().withMessage('Username is required').escape(),
  body('password').trim().notEmpty().withMessage('Password is required').escape(),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const match = await bcrypt.compare(password, user[0].password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT and send back to client
    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

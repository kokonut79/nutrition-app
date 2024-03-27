const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(
    cors({
        origin: "*",
    })
);

app.set("port", process.env.PORT || 3001);
// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'nutritionDb'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Register endpoint
app.post('/register', (req, res) => {
    const { email, username, password, confirmPassword } = req.body;

    // Validate user input
    if (!email || !username || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    const newUser = { email, username, password };
    connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('User registered successfully');
        res.status(200).json({ message: 'User registered successfully' });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Query the database for the user
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // If user not found, return 404
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found or incorrect credentials' });
        }

        // If user found and password matches, return success with redirectTo field
        res.status(200).json({
            message: 'Login successful', user: { username: results[0].username, email: results[0].email },
            redirectTo: '/main'
        });
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

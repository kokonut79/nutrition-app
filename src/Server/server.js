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

    // Hash password (you need to install bcrypt: npm install bcrypt)
    // const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = { email, username, password }; // Change this to use hashedPassword
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

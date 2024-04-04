const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'nutritionDb'
});

// Connect to MySQL
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Register Endpoint
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
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('User registered successfully');
        res.status(200).json({ message: 'User registered successfully' });
    });
});

// Login Endpoint
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

        // Save user in session
        req.session.user = { id: results[0].id, username: results[0].username, email: results[0].email };

        // If user found and password matches, return success with redirectTo field
        res.status(200).json({
            message: 'Login successful',
            redirectTo: '/main'
        });
    });
});




// Add Food Endpoint
app.post('/add-food', (req, res) => {
    const { name, calories, protein, fat, carbs } = req.body;
    const userId = req.session.user ? req.session.user.id : null; // Retrieve user ID from session

    // Validate user input
    if (!userId || !name || !calories || !protein || !fat || !carbs) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newFood = { userId: userId, name, calories, protein, fat, carbs };
    connection.query('INSERT INTO foods SET ?', newFood, (err) => {
        if (err) {
            console.error('Error adding food:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Food added successfully');
        res.status(200).json({ message: 'Food added successfully' });
    });
});


// Get Foods by User ID Endpoint
app.get('/foods/:userId', (req, res) => {
    const userId = req.params.userId;

    // Query foods associated with the specified user ID
    connection.query('SELECT * FROM foods WHERE userId = ?', userId, (err, results) => {
        if (err) {
            console.error('Error fetching foods:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});


// Check user session endpoint
app.get('/session', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ user: req.session.user });
    } else {
        res.status(401).json({ error: 'User session not found' });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

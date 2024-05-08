//server.js


const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL password
    database: 'greenwander'
});

// Check if the MySQL connection is successful
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/greenwander', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log('Received form data:', req.body); // Log received form data

    const sql = "INSERT INTO login (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
    const values = [firstName, lastName, email, password];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'An error occurred while inserting data' });
        } else {
            console.log('Data inserted successfully:', data);
            res.status(200).json({ success: true });
        }
    });
});

app.post('/greenwander/signin', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT firstname,id FROM login WHERE email = ? AND password = ?";
    const values = [email, password];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.status(500).json({ error: 'An error occurred while fetching user' });
        } else {
            if (data.length > 0) {
                console.log('User found:', data[0]);
                const firstName = data[0].firstname; 
                const id = data[0].id;
                res.status(200).json({ success: true, id: id, firstName: firstName });
            } else {
                console.log('User not found');
                res.status(401).json({ error: 'User not found or incorrect password' });
            }
        }
    });
});

// Assuming you have already implemented user authentication and have access to the authenticated user's ID or username



app.post('/save-travel-details', (req, res) => {
    const { userId, fromState, fromDistrict, toState, toDistrict, totalCarbonFootprint, modeOfTravel } = req.body;
    console.log('Received form data:', req.body); // Log received form data

    const sql = "INSERT INTO userdata (id, fromstate, fromdistrict, tostate, todistrict, modeoftravel, cprint) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [userId, fromState, fromDistrict, toState, toDistrict, modeOfTravel, totalCarbonFootprint];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'An error occurred while inserting data' });
        } else {
            console.log('Data inserted successfully:', data);
            res.status(200).json({ success: true });
        }
    });
});


app.post('/hist', (req, res) => {
    const { userId } = req.body;
    
    const sql = "SELECT fromstate, fromdistrict, tostate, todistrict, modeoftravel, cprint FROM userdata WHERE id = ?";
    const values = [userId];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.status(500).json({ error: 'An error occurred while fetching user' });
        } else {
            if (data.length > 0) {
                console.log('User found:', data);
                res.status(200).json({ 
                    success: true, 
                    userData: data
                });
            } else {
                console.log('User not found');
                res.status(401).json({ error: 'User has no history' });
            }
        }
    });
});





const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log('Server is listening on port ${PORT}');
});
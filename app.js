import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

const app = express();

app.set('view engine', 'ejs');

const PORT = 3002;

app.use(express.static('public'));

app.use(express.urlencoded({ extended:true }));

const forms = [];

app.get('/db-test', async(req, res) => {
    try {
        const[forms] = await pool.query('SELECT * FROM contacts');
        res.send(forms);
    } catch(err) {
        console.error('Database error: ', err);
        res.status(500).send('Database error: ' + err.message);
    }
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/confirm', (req, res) => {
    res.render('confirm', { form });
});

app.get('/admin', async(req, res) => {
    try {
        const[forms] = await pool.query(
            `SELECT 
                fname,
                lname,
                job,
                company,
                linkedin,
                email,
                meet,
                other,
                message,
                format,
                timestamp
            FROM contacts ORDER BY timestamp DESC;`);
        forms.forEach(form => {
            Date(form.timestamp).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        });
        res.render('admin', { forms: forms });
    } catch(err) {
        console.error('Database error: ', err);
        res.status(500).send('Database error: ' + err.message);
    }
});

// app.post('/submit', (req, res) => {
//     const form = {
//         fname: req.body.fname,
//         lname: req.body.lname,
//         job: req.body.job,
//         company: req.body.company,
//         linkedin: req.body.linkedin,
//         email: req.body.email,
//         meet: req.body.meet,
//         other: req.body.other,
//         message: req.body.message,
//         mailing: req.body.mailing === "yes",
//         format: req.body.method,
//         dateTime: new Date()
//     }
//     forms.push(form);
//     console.log(forms);

//     res.render('confirm', { form });
// });

app.post('/submit', async(req, res) => {
    try {
        const form = req.body;
        form.dateTime = new Date();
        console.log('New contact received:', form);
        const sql = `INSERT INTO contacts (
            fname, lname, job, company, linkedin, email, meet, other, message, mailing, format, timestamp
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [
            form.fname,
            form.lname,
            form.job,
            form.company,
            form.linkedin,
            form.email,
            form.meet,
            form.other,
            form.message,
            form.mailing === "1" ? 1 : 0,
            form.method,
            form.dateTime
        ];
        console.log("SQL params:", params);
        params.forEach((p, i) => {
            if (p === undefined) console.error(`Param at index ${i} is undefined`);
        });
        const [result] = await pool.execute(sql, params);
        console.log('Contact inserted with ID:', result.insertId);
        res.render('confirm', { form: form });
    } catch(err) {
        console.error('Error inserting contact:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).send('A contact with this email already exists.');
        } else {
            res.status(500).send('Sorry, there was an error submitting your form. Please try again.');
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
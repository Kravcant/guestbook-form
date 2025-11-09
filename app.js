import express from 'express';

const app = express();

app.set('view engine', 'ejs');

const PORT = 3002;

app.use(express.static('public'));

app.use(express.urlencoded({ extended:true }));

const forms = [];

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/confirm', (req, res) => {
    res.render('confirm', { form });
});

app.get('/admin', (req, res) => {
    res.render('admin', { forms });
});

app.post('/submit', (req, res) => {
    const form = {
        fname: req.body.fname,
        lname: req.body.lname,
        job: req.body.job,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        meet: req.body.meet,
        other: req.body.other,
        message: req.body.message,
        mailing: req.body.mailing === "yes",
        format: req.body.method,
        dateTime: new Date()
    }
    forms.push(form);
    console.log(forms);

    res.render('confirm', { form });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
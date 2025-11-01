import express from 'express';

const app = express();

const PORT = 3002;

app.use(express.static('public'));

app.use(express.urlencoded({ extended:true }));

const forms = [];

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`)
});

app.get('/confirm', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirm.html`)
});

app.get('/admin', (req, res) => {
    res.send(forms);
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
        mailing: req.body.mailing,
        format: req.body.method
    }
    forms.push(form);
    console.log(forms);

    res.sendFile(`${import.meta.dirname}/views/confirm.html`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
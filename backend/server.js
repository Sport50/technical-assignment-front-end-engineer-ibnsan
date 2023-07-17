const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/newsDB ', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

// Define article schema and model
const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    authorEmail: { type: String, required: true },
    publicationDate: { type: Date, required: true },
});

const Article = mongoose.model('Article', articleSchema);

// Create an article
app.post('/api/articles', (req, res) => {
    const { title, body, authorEmail, publicationDate } = req.body;
    const newArticle = new Article({
        title,
        body,
        authorEmail,
        publicationDate,
    });

    newArticle
        .save()
        .then((article) => res.status(201).json(article))
        .catch((error) => res.status(400).json(`Error: ${error}`));
});

// Get last five articles
app.get('/api/articles', (req, res) => {
    Article.find()
        .sort({ publicationDate: -1 })
        .limit(5)
        .then((articles) => res.json(articles))
        .catch((error) => res.status(400).json(`Error: ${error}`));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

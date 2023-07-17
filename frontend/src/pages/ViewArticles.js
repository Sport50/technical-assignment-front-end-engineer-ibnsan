import { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import Header from "@/components/Header";

const ViewArticles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const res = await axios.get('http://localhost:5000/api/articles');
            setArticles(res.data);
        };

        fetchArticles();
    }, []);

    return (
        <Container>
            <Header />
            <List>
                {articles.map((article, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={article.title}
                            secondary={`By: ${article.authorEmail} on ${new Date(article.publicationDate).toLocaleDateString()}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default ViewArticles;

import { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Collapse, Typography } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import Header from "@/components/Header";

const ViewArticles = () => {
    const [articles, setArticles] = useState([]);
    const [open, setOpen] = useState({});

    useEffect(() => {
        const fetchArticles = async () => {
            const res = await axios.get('http://localhost:5000/api/articles');
            setArticles(res.data);
        };

        fetchArticles();
    }, []);

    const handleClick = (index) => {
        setOpen(prevState => ({...prevState, [index]: !prevState[index]}));
    }

    return (
        <Container>
            <Header />
            <List>
                {articles.map((article, index) => (
                    <div key={index}>
                        <ListItem button onClick={() => handleClick(index)}>
                            <ListItemText
                                primary={article.title}
                                secondary={`By: ${article.authorEmail} on ${new Date(article.publicationDate).toLocaleDateString()}`}
                            />
                            {open[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItem>
                        <Collapse in={open[index]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <Typography>{article.body}</Typography>
                                </ListItem>
                            </List>
                        </Collapse>
                    </div>
                ))}
            </List>
        </Container>
    );
};

export default ViewArticles;

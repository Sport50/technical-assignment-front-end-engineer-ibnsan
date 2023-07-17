import { useState, useRef } from 'react';
import { TextField, Container, Alert, CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import Header from '../components/Header';

const API_URL = 'http://localhost:5000/api/articles';

const AddArticle = () => {
    const [formState, setFormState] = useState({ title: '', body: '', authorEmail: '' });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const formRef = useRef();

    const handleChange = (event) => {
        setFormState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setIsSuccess(false);
        setError(null);

        try {
            await axios.post(API_URL, {
                ...formState,
                publicationDate: new Date(),
            });

            setFormState({ title: '', body: '', authorEmail: '' });
            formRef.current.reset();
            setIsSuccess(true);
        } catch (error) {
            setError('Failed to submit the article. Please try again later.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Header />
            {error && <Alert sx={{ mb: 2 }} severity="error">{error}</Alert>}
            {isSuccess && <Alert sx={{ mb: 2 }} severity="success">Article submitted successfully!</Alert>}
            <form ref={formRef} onSubmit={handleSubmit}>
                <TextField
                    name="title"
                    value={formState.title}
                    onChange={handleChange}
                    label="Title"
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    name="body"
                    value={formState.body}
                    onChange={handleChange}
                    label="Body"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                />
                <TextField
                    name="authorEmail"
                    value={formState.authorEmail}
                    onChange={handleChange}
                    label="Author Email"
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={isLoading}
                    loadingPosition="start"
                    startIcon={isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                >
                    Add Article
                </LoadingButton>
            </form>
        </Container>
    );
};

export default AddArticle;

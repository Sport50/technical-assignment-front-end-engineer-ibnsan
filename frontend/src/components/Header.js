import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

const Header = () => (
    <AppBar sx={{ mb: 2 }} position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Test App
            </Typography>
            <Link href="/ViewArticles" passHref>
                <Button sx={{ mr: 2 }} variant="contained" >View Articles</Button>
            </Link>
            <Link href="/AddArticle" passHref>
                <Button variant="contained" >Add Article</Button>
            </Link>
        </Toolbar>
    </AppBar>
);

export default Header;

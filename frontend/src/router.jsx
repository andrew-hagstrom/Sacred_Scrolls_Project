import { createBrowserRouter } from "react-router-dom"

import App from "./App";

import HomePage  from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import JournalPage from './pages/JournalPage';
import RegisterPage from './pages/RegisterPage';
import TextComparePage from "./pages/TextComparePage";
import FavoritesPage from "./pages/FavoritesPage"
import {NotFoundPage} from './pages/NotFoundPage';
import LoginPage from "./pages/LoginPage";
import VerseDetailPage from './pages/VerseDetailPage'
import PostsPage from './pages/PostsPage'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />

            },
            {
                path: "register/",
                element: <RegisterPage />,
            },
            {
                path: "about/",
                element: <AboutPage />,
            },
            {
                path: "journal/",
                element: <JournalPage />,
            },
            {
                path: "favorites/",
                element: <FavoritesPage />,

            },
            {
                path: "text-compare/",
                element: <TextComparePage />,
               
            },
            {
                path: "text-compare/:book/:chapter/:verse/",
                element: <VerseDetailPage />,
               
            },

            {
                path: 'login/',
                element: <LoginPage />,
            },
            {
                path: 'posts/',
                element: <PostsPage />,
            },

           
        ],
        errorElement: <NotFoundPage />
    } 
]);

export default router
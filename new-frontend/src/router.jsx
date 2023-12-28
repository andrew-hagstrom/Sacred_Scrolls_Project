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
                element: <RegisterPage/>,
            },
            {
                path: "about/",
                element: <AboutPage/>,
            },
            {
                path: "journal/",
                element: <JournalPage/>,
            },
            {
                path: "favorites/",
                element: <FavoritesPage />,

            },
            {
                path: "text-compare",
                element: <TextComparePage />,

            },
            {
                path: 'login/',
                element: <LoginPage/>
            }
            
        ],
        errorElement: <NotFoundPage />
    } 
]);

export default router
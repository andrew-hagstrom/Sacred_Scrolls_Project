import { createBrowserRouter } from "react-router-dom"

import App from "./App";

import HomePage  from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import JournalPage from './pages/JournalPage';
import RegisterPage from './pages/RegisterPage';
import TextComparePage from "./pages/TextComparePage";

import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />

            },
            {
                path: "register/",
                element: <RegisterPage/>,
            },
            {
                path: "global-dictionary/",
                element: <GlobalDictionary/>,
            },
            {
                path: "global-dictionary/:number",
                element: <GlobalDetails/>,
            },
            {
                path: "personal-dictionary/",
                element: <PersonalDictionary />,

            },
            {
                path: "personal-dictionary/:number",
                element: <PersonalDetails />,

            },
            {
                path: "lvx-calculator/",
                element: <CalculatorPage />,

            },
            {
                path: "about/",
                element: <About />,

            },
            
        ],
        errorElement: <NotFoundPage />
    } 
]);

export default router
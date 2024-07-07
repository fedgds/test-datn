import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryListPage from './pages/CategoryListPage';
import CreateCategoryPage from './pages/CreateCategoryPage';
import EditCategoryPage from './pages/EditCategoryPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<CategoryListPage />} />
                <Route path="/create" element={<CreateCategoryPage />} />
                <Route path="/edit/:id" element={<EditCategoryPage />} />
            </Routes>
        </Router>
    );
};

export default App;

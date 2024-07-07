import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`);
            setCategories(categories.filter(category => category.id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div>
            <h1>Categories</h1>
            <Link to="/create">Create New Category</Link>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        {category.name}
                        {category.image && (
                            <img 
                                src={`http://127.0.0.1:8000/storage/${category.image}`} 
                                alt={category.name} 
                                width="100" 
                                style={{ marginLeft: '10px' }}
                            />
                        )}
                        <Link to={`/edit/${category.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(category.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;

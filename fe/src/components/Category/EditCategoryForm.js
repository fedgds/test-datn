import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditCategoryForm = ({ categoryId }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/categories/${categoryId}`);
                setName(response.data.name);
                setCurrentImage(response.data.image);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [categoryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/categories/${categoryId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Category updated:', response.data);
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Current Image:</label>
                {currentImage && <img src={`http://127.0.0.1:8000${currentImage}`} alt="Current" width="100" />}
            </div>
            <div>
                <label>New Image:</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                />
            </div>
            <button type="submit">Update Category</button>
        </form>
    );
};

export default EditCategoryForm;

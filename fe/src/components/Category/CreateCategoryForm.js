import React, { useState } from 'react';
import axios from 'axios';

const CreateCategoryForm = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/categories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Category created:', response.data);
        } catch (error) {
            console.error('Error creating category:', error);
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
                <label>Image:</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                />
            </div>
            <button type="submit">Create Category</button>
        </form>
    );
};

export default CreateCategoryForm;

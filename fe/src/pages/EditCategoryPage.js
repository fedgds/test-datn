import React from 'react';
import EditCategoryForm from '../components/Category/EditCategoryForm';
import { useParams } from 'react-router-dom';

const EditCategoryPage = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Edit Category</h1>
            <EditCategoryForm categoryId={id} />
        </div>
    );
};

export default EditCategoryPage;


import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const BookForm = ({onSubmit, initialData}) => {
    
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ defaultValues: {
        title: '',
        author: '',
        genre: '',
        price: '',
        quantity: ''

    } });

    const handleCancel = () => {
        reset();
        navigate('/');
    }

    //redux

    const dispatch = useDispatch();

    useEffect(() => {
        if(initialData) {
            reset(initialData)
        }
    }, [initialData])

    const handleForm = (data) => {
        onSubmit(data)
    }

    return (
        <div>
            <h1>{initialData ? 'Update Book' : 'Add Book'}</h1>

            <div>
                <form onSubmit={handleSubmit(handleForm)}>
                    <div>
                        <label htmlFor='title'>Name</label>
                        <input id='title' name='title' {...register('title', { required: "title is Required" })} />
                        {errors.title && <p>{errors.title.message}</p>}
                    </div>

                    <div>
                        <label htmlFor='author'>Author</label>
                        <input id='author' name='author' {...register('author', { required: "author is Required" })} />
                        {errors.author && <p>{errors.author.message}</p>}
                    </div>

                    <div>
                        <label>Category</label>
                        <select id='genre' {...register('genre', { required: "genre is required" })}>
                            <option value=''>Select category</option>
                            <option value='Fiction'>Fiction</option>
                            <option value='Non-Fiction'>Non-Fiction</option>
                            <option value='Science'>Science</option>
                            <option value='History'>History</option>
                        </select>
                        {errors.genre && <p>{errors.genre.message}</p>}
                    </div>

                    <div>
                        <label htmlFor='price'>Price</label>
                        <input 
                            type='number' 
                            step='0.01'
                            id='price' 
                            name='price' 
                            {...register('price', { required: "price is Required" })} 
                        />
                        {errors.price && <p>{errors.price.message}</p>}
                    </div>

                    <div>
                        <label htmlFor='quantity'>Quantity</label>
                        <input 
                            type='number' 
                            id='quantity' 
                            name='quantity' 
                            {...register('quantity', { required: "quantity is Required" })} 
                        />
                        {errors.quantity && <p>{errors.quantity.message}</p>}
                    </div>

                    <div>
                        <button type='submit' disabled={!isValid}>
                            {initialData ? 'Update Book' : 'Add Book'}
                        </button>
                    </div>
                    <div>
                        <button type='button' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BookForm;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../services/Api';
import { FormData, AddDataProps } from './interface';
import Validation from '../../utils/Validation';


function AddData({ name }: AddDataProps) {

    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        jobTitle: '',
    });

    const [errors, setErrors] = useState<FormData>({
        name: '',
        email: '',
        jobTitle: '',
    });

    useEffect(() => {
        axios
            .get(API + id)
            .then((res) => {
                const { name, email, jobTitle } = res.data;
                setFormData({ name, email, jobTitle });
            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: '' });
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let [formIsValid , newErrors] = Validation(formData);

        if (formIsValid) {
            if (name === 'Edit') {
                axios
                    .put(`${API}${id}`, formData)
                    .then((res) => navigate('/'))
                    .catch((error) => console.log(error));
            }
            else {
                axios
                    .post(API, formData)
                    .then((res) => navigate('/'))
                    .catch((error) => console.log(error));
            }
        } else {
            setErrors(newErrors);
        }
    };
    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pb-5 rounded'>
                <h1 className='h1 mb-4 mt-4'>
                    <span className='font-weight-bold'>{`${name} Employee`}</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor='name' className='form-label'>
                            Name
                        </label>
                        <input
                            type='text'
                            className={`form-control ${errors.name && 'is-invalid'}`}
                            name='name'
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email' className='form-label'>
                            Email
                        </label>
                        <input
                            type='text'
                            className={`form-control ${errors.email && 'is-invalid'}`}
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='jobTitle' className='form-label'>
                            Job Title
                        </label>
                        <input
                            type='text'
                            className={`form-control ${errors.jobTitle && 'is-invalid'}`}
                            name='jobTitle'
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                        />
                        {errors.jobTitle && <div className='invalid-feedback'>{errors.jobTitle}</div>}
                    </div>
                    <button type='submit' className='btn btn-success mt-2'>
                        {name === 'Edit' ? "Edit" : "Submit"}
                    </button>
                    <Link to='/' className='btn btn-primary ms-3 mt-2'>
                        Back
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default AddData

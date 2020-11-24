import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './Contact.css';

function validateInfo(values) {
    let errors = {};

    if (!values.subject.trim()) {
        errors.subject = 'Subject required';
    }
    if (!values.email) {
        errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.message) {
        errors.message = 'Message is required';
    }

    return errors;
}

const useForm = (callback, validateInfo) => {
    const [values, setValues] = useState({
        subject: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validateInfo(values));
        setIsSubmitting(true);
    };

    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                console.log(values);
                axios.post('http://127.0.0.1:8181/email', {
                    subject: values.subject,
                    email: values.email,
                    message: values.message
                })
                .then( res => { console.log(res) })
                .catch( err => { console.log(err) })

                callback();
            }
        },
        [errors]
    );

    return { handleChange, handleSubmit, values, errors };
};

const Form = ({ submitForm }) => {
    const { handleChange, handleSubmit, values, errors } = useForm(
        submitForm,
        validateInfo
    );

    return (
        <div className='form-content-right'>
            <form onSubmit={handleSubmit} className='form' noValidate>
                <h1>
                    Reach me out today! Send me an email by filling out the
                    information below.
        </h1>
                <div className='form-inputs'>
                    <label className='form-label'>Subject</label>
                    <input
                        className='form-input'
                        type='text'
                        name='subject'
                        placeholder='Enter email subject'
                        value={values.subject}
                        onChange={handleChange}
                    />
                    {errors.subject && <p>{errors.subject}</p>}
                </div>
                <div className='form-inputs'>
                    <label className='form-label'>Email</label>
                    <input
                        className='form-input'
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className='form-inputs'>
                    <label className='form-label'>Message</label>
                    <textarea
                        rows="6"
                        className='form-textarea'
                        type='text'
                        name='message'
                        placeholder='Enter your message'
                        value={values.message}
                        onChange={handleChange}
                    />
                    {errors.message && <p>{errors.message}</p>}
                </div>
                <button className='form-input-btn' type='submit'>
                    Send
        </button>
            </form>
        </div>
    );
};

export default Form;
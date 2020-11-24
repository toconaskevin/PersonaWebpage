import React, { useState } from 'react';
import './Contact.css';
import Form from './Form.js';
import img2 from '../images/img-2.png';
import img3 from '../images/img-3.png';

const FormSuccess = () => {
    return (
        <div className='form-content-right'>
            <h1 className='form-success'>I have received your request!</h1>
            <img className='form-img-2' src={img3} alt='success-image' />
        </div>
    );
};


const Contact = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true);
    }
    return (
        <>
            <div className='form-container'>
                {/* <span className='close-btn'>×</span> */}
                <div className='form-content-left'>
                    <img className='form-img' src={img2} alt='card' />
                </div>
                {!isSubmitted ? (
                    <Form submitForm={submitForm} />
                ) : (
                        <FormSuccess />
                    )}
            </div>
        </>
    );
};

export default Contact;
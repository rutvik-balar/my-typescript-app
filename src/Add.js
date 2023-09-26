import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

const Add = () => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    jobTitle: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setErrors({ ...errors, [name]: '' });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation here
    let formIsValid = true;
    const newErrors = {
      name: '',
      email: '',
      jobTitle: '',
    };

    if (!formData.name.trim()) {
      formIsValid = false;
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      formIsValid = false;
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      formIsValid = false;
      newErrors.email = 'Invalid email address';
    }

    if (!formData.jobTitle.trim()) {
      formIsValid = false;
      newErrors.jobTitle = 'Job Title is required';
    }

    if (formIsValid) {

      axios.post('http://localhost:3001/employees', formData)
      .then(res => navigate('/'))
      .catch(error => console.log(error))

    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pb-5 rounded'>
        <h1 className="h1 mb-4 mt-4 ">
          <span className="font-weight-bold" >Add Employee</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.name && 'is-invalid'}`}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className={`form-control ${errors.email && 'is-invalid'}`}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-2">
            <label htmlFor="jobTitle" className="form-label">
              Job Title
            </label>
            <input
              type="text"
              className={`form-control ${errors.jobTitle && 'is-invalid'}`}
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
            />
            {errors.jobTitle && <div className="invalid-feedback">{errors.jobTitle}</div>}
          </div>
          <button type="submit" className="btn btn-success mt-2">
            Submit
          </button>
          <Link to='/' className='btn btn-primary ms-3 mt-2'>Back</Link>
        </form>
      </div>
    </div>
  );
};

export default Add;


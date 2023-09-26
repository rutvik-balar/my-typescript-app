import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate();

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/employees')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, [])

    const deleteEmployee = (id) => {

        const confirem = window.confirm(" Would you want to delete ?? ");
        console.log(id);
        if (confirem) {
            axios.delete('http://localhost:3001/employees/' + id)
                .then(responce => {
                    setData(data.filter(data => data.id !== id));
                })
                .catch(error => console.log(error))
        }

    }


    return (
        <div className='d-flex flex-column justify-contebt-center align-items-center bg-light vh-100 scrollable-div overflow-auto' >
            <div className="container text-center mt-4 ">
                <h1 className="display-2 font-weight-bold text-primary">ThinkBiz</h1>
                <p className="lead">Your Business Solutions Partner</p>
            </div>
            <div className='w-75 rounded bg-white border shadow p-4 mb-5'>

                <div className='d-flex justify-contebt-end'>
                    <Link to="/add" className='btn btn-success btn-lg mt-1 mb-3'>Add +</Link>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">

                            <tr>
                                <th>Employee Name</th>
                                <th>Job Title</th>
                                <th>Email</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((data, index) => (
                                    <tr key={index} >
                                        <td>{data.name}</td>
                                        <td>{data.jobTitle}</td>
                                        <td>{data.email}</td>
                                        <td>
                                            <Link to={`/edit/${data.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                            <button onClick={(e) => deleteEmployee(data.id)} className='btn btn-sm btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Home

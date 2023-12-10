import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const ListingsPage = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();


    const fetchJob = async () => {
        const response = await fetch('http://localhost:5002/api/job',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        if (response.ok) {
            const { jobs } = await response.json();
            setJobs(jobs);
        }
    }
    useEffect(() => {
        if(!localStorage.getItem("Token")){
            navigate("/login")
        }else{

            fetchJob();
        }
    }, [navigate]);

    // console.log(jobs);
    return (
        <div>
            <div className='flex justify-around pt-10'>

            <h1 className='text-xl font-bold'>
                All listings
            </h1>
            <div>
                <Link to="/addlistings">
                <button className='bg-sky-500 w-full text-white p-2 rounded-lg hover:bg-sky-950'>All Listings +</button>
                </Link>
            </div>
            </div>

            <div className='pt-10'>
                <table className='max-w-50 m-auto' width='60%'>
                    <tbody>

                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            ExperienceRequired
                        </th>
                        <th>
                            Salary
                        </th>
                        <th>
                            Categorie
                        </th>
                        <th>
                            Type
                        </th>
                    </tr>

                    {
                        jobs && jobs.map((job, index) => (
                            <tr className='' key={index}>
                                <td className='p-3'>
                                {job.Title}
                                </td>
                                <td className='p-3'>
                                    {job.ExperienceRequired ?'True':'False'}
                                </td>
                                <td className='p-3'>
                                    {job.Salary}
                                </td>
                                <td className='p-3'>
                                    {job.Categorie}
                                </td>
                                <td className='p-3'>
                                    {job.Type}
                                </td>
                                <td className='p-3 text-slate-900 font-bold hover:text-slate-300'>
                                    <Link to={`/viewlisting/${job._id}`} className=''>View</Link>
                                </td>

                            </tr>
                        ))

                    }

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default ListingsPage
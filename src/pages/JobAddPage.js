import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const JobAddPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState('');
    const [selectedType,setSelectedType] = useState('');
    const [title,setTitle] = useState('');
    const [companyDetails,setComapnayDetails] = useState('');
    const [tags,setTags] = useState('');
    const [skills,setSkills]= useState('');
    const [experienceRequired,setExperienceRequired] = useState(false);
    const [salary,setSalary] = useState('');
    const [description,setDescription] = useState('');


    const getCategories = async () => {
        try {

            const response = await fetch('http://localhost:5002/api/categorie', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const { categories } = await response.json();
                // console.log(categories);
                setCategories(categories);

            } else {
                console.log("something went wrong");
            }
        } catch (err) {
            console.log(err);
        }
    }
    const getTypes = async () => {
        const response = await fetch('http://localhost:5002/api/type', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const { types } = await response.json();
            setTypes(types);

        }
    }

    const handleDropdownChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    const handleDropdown2Change = (event) => {
        setSelectedType(event.target.value);
    };


    useEffect(() => {
        if(!localStorage.getItem("Token")){
            navigate("/login")
        }else{
            
            
            getCategories();
            getTypes();
        }

    }, [navigate]);



    const handleSubmit =async()=>{
        try{
            const response = await fetch('http://localhost:5002/api/job',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    title:title,
                    companyDetails:companyDetails,
                    description:description,
                    Categorie:selectedCategory,
                    type:selectedType,
                    salary:salary,
                    tags:tags,
                    skills:skills,
                    experienceRequired:experienceRequired
                })
            });
            if(response.ok){
                alert("Job added successfully ");
            }

        }catch(err){
            alert("Something bad at server side");
        }

    }

    // console.log(categories);
    // console.log(types);

    return (
        <div className='h-screen'>
            <div className='max-w-sm m-auto p-3'>
                <form onSubmit={handleSubmit} className="bg-slate-200 p-4 shadow-md ">
                    <div className='mb-4'>
                        <label className='block text-left text-gray-700 text-sm font-bold'>Enter title</label>
                        <input value={title} onChange={(e)=>{setTitle(e.target.value)}} className='shadow appearance-none border-2 rounded w-full py-2 p-2' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-left text-gray-700 text-sm font-bold'>Company details</label>
                        <textarea value={companyDetails} onChange={(e)=>{setComapnayDetails(e.target.value)}} className='shadow appearance-none border-2 rounded w-full py-2 p-2' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-left text-gray-700 text-sm font-bold'>Tags</label>
                        <input value={tags} onChange={(e)=>{setTags(e.target.value)}} className='shadow appearance-none border-2 rounded w-full py-2 p-2' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-left text-gray-700 text-sm font-bold'>Skills</label>
                        <input value={skills} onChange={(e)=>{setSkills(e.target.value)}} className='shadow appearance-none border-2 rounded w-full py-2 p-2' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-left text-gray-700 text-sm font-bold'>Description of job role</label>
                        <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} className='shadow appearance-none border-2 rounded w-full py-2 p-2' />
                    </div>
                    <div className='mb-4 flex gap-2'>
                        <input type='checkbox' className='' checked={experienceRequired} onChange={()=>{setExperienceRequired(!experienceRequired)}} /><span className='block text-left text-gray-700 text-sm font-bold'>Experience Required</span>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-left text-gray-700 text-sm font-bold'>Salary</label>
                        <input value={salary} onChange={(e)=>{setSalary(e.target.value)}} className='shadow appearance-none border-2 rounded w-full py-2 p-2' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-left text-gray-700 text-sm font-bold'>Select Categorie</label>
                        <select value={selectedCategory} onChange={handleDropdownChange} className='shadow appearance-none border-2 rounded w-full py-2 p-2' >
                            <option value="">Categories</option>
                            {
                                categories && categories.map((category, index) => (
                                    <option value={category.categorie} key={index}>{category.categorie}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-left text-gray-700 text-sm font-bold'>Select Type</label>
                        <select value={selectedType} onChange={handleDropdown2Change} className='shadow appearance-none border-2 rounded w-full py-2 p-2' >
                            <option value="">Types</option>
                            {
                                types && types.map((type, index) => (
                                    <option value={type.type} key={index} >{type.type}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='mb-4'>
                        <button type='submit' className='bg-sky-500 w-full text-white p-2 rounded-lg hover:bg-sky-950'>Add job</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default JobAddPage
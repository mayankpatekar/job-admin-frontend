import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddCategoryPage = () => {
    const navigate = useNavigate();
    const [categorie, setCategorie] = useState('');
    const [categories, setCategories] = useState([]);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5002/api/categorie',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        categorie: categorie
                    })
                });

            if (response.ok) {
                alert('Category added successfully');
            }
        } catch (err) {
            alert('Something went wrong')
        }

    }

    useEffect(() => {
        if(!localStorage.getItem("Token")){
            navigate("/login")
        }else{

            const fetchData = async () => {
                
                try {
                    const response = await fetch('http://localhost:5002/api/categorie',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        // alert('Category added successfully');
                        const { categories } = await response.json();
                        setCategories(categories);
                    }
                } catch (err) {
                    alert('Something went wrong')
                }
            }
            
            fetchData();
        }
    }, [navigate])

    // console.log(categories);
    return (
        <div className='h-screen grid place-content-center'>
            <div className='flex justify-between gap-3'>


                <div className='max-w-sm border-r-2 p-2'>
                    <h1 className='font-bold text-2xl'>Category</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='pt-2 pb-2'>

                            <input value={categorie} onChange={(e) => { setCategorie(e.target.value) }} className='border-2 rounded-lg p-2' placeholder='Enter Job Category' />
                        </div>

                        <div className='pt-2 pb-2'>
                            <button type='submit' className="bg-sky-500 w-full text-white p-2 rounded-lg hover:bg-sky-950">Add Category</button>
                        </div>

                    </form>
                </div>
                <div className='max-w-sm p-2'>
                    {/* <hr /> */}
                    <h1 className='font-bold text-2xl'>
                        Categories
                    </h1>
                    <div className="overflow-auto max-h-24 scroll-m-2">
                        {
                            categories && categories.map((category) => (
                                <div key={category._id} className=''>
                                    <h1>
                                        {category.categorie}
                                    </h1>
                                </div>
                            ))
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCategoryPage
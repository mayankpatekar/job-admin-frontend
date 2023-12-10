import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddTypePage = () => {
    const navigate = useNavigate();

    const [type, setType] = useState('');
    const [types, setTypes] = useState([]);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5002/api/type',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: type
                    })
                });

            if (response.ok) {
                alert('Type added successfully');
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
                    const response = await fetch('http://localhost:5002/api/type',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        // alert('Category added successfully');
                        const { types } = await response.json();
                        setTypes(types);
                    }
                } catch (err) {
                    alert('Something went wrong')
                }
            }
            
            fetchData();
        }
    }, [navigate])
    return (
        <div className='h-screen grid place-content-center'>
            <div className='flex justify-between gap-3'>


                <div className='max-w-sm border-r-2 p-2'>
                    <h1 className='font-bold text-2xl'>Type</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='pt-2 pb-2'>

                            <input value={type} onChange={(e)=>{setType(e.target.value)}} className='border-2 rounded-lg p-2' placeholder='Enter Job Type' />
                        </div>

                        <div className='pt-2 pb-2'>
                            <button type='submit' className="bg-sky-500 w-full text-white p-2 rounded-lg hover:bg-sky-950">Add type</button>
                        </div>

                    </form>
                </div>
                <div className='max-w-sm p-2'>
                    {/* <hr /> */}
                    <h1 className='font-bold text-2xl'>
                        Types
                    </h1>
                    <div className="overflow-auto max-h-24 scroll-m-2">
                    {
                            types && types.map((type) => (
                                <div key={type._id} className=''>
                                    <h1>
                                        {type.type}
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

export default AddTypePage
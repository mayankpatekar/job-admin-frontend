import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewListingsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobData, setJobData] = useState({
    Title: '',
    CompanyDetails: '',
    Tags: '',
    Skills: '',
    ExperienceRequired: false,
    Salary: '',
    Description: '',
    Categorie: '',
    Type: ''
  });

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
    setJobData({ ...jobData, [event.target.name]: event.target.value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJobData({ ...jobData, [name]: value });
  };


  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/login")
    } else {

      const getApplications = async () => {
        const response = await fetch(`http://localhost:5002/application/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        // console.log("function hit")
        if (response.ok) {
          const { applications } = await response.json();
          setApplications(applications);

        }
      }

      const getFormData = async () => {
        try {
          const response = await fetch(`http://localhost:5002/api/job/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const { job } = await response.json();
            setJobData(job);
          }
        } catch (err) {
          console.error(err);
          // Handle error
        }
      };
      getFormData();
      getCategories();
      getTypes();
      getApplications();
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to handle form submission
    try {
      const response = await fetch(`http://localhost:5002/api/job/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        alert("Form updated successfuly");
        // Handle success
      } else {
        alert('something bad in server')
        // Handle failure
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleStatusChange = async (appid,status) => {
    console.log(status,appid);
    try {

      const response = await fetch(`http://localhost:5002/application/put/${appid}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(status),
        body:JSON.stringify({status})
      })

      if(response.ok){
        const {message}= await response.json();
        alert(message);
        window.location.reload();
      }


    } catch (err) {
      console.log(err);
    }
  }

  // console.log(applications);
  return (
    <div>
      <div className='max-w-fit m-auto p-3'>
        <form onSubmit={handleSubmit} className="md:flex gap-4 bg-slate-200 p-4 shadow-md ">
          <div>
            <div className='mb-4'>
              <label className='block text-left text-gray-700 text-sm font-bold'>Enter Title</label>
              <input name="Title" value={jobData.Title} onChange={handleInputChange} className='shadow appearance-none border-2 rounded w-full py-2 p-2' />
            </div>
            <div className='mb-4'>
              <label className='block text-left text-gray-700 text-sm font-bold'>Company Details</label>
              <textarea name="CompanyDetails" value={jobData.CompanyDetails} onChange={handleInputChange} className='shadow appearance-none border-2 rounded w-full py-2 p-2' />
            </div>
            <div className='mb-4'>
              <label className='block text-left text-gray-700 text-sm font-bold'>Tags</label>
              <input name="Tags" value={jobData.Tags} onChange={handleInputChange} className='shadow appearance-none border-2 rounded w-full py-2 p-2' />
            </div>
          </div>
          <div>
            <div className='mb-4'>
              <label className='block text-left text-gray-700 text-sm font-bold'>Skills</label>
              <input name="Skills" value={jobData.Skills} onChange={handleInputChange} className='shadow appearance-none border-2 rounded w-full py-2 p-2' />
            </div>
            <div className='mb-4'>
              <label className='block text-left text-gray-700 text-sm font-bold'>Description of job role</label>
              <textarea name="Description" value={jobData.Description} onChange={handleInputChange} className='shadow appearance-none border-2 rounded w-full py-2 p-2' />
            </div>
            <div className='mb-4 flex gap-2'>
              <input type='checkbox' className='' checked={jobData.ExperienceRequired} onChange={handleInputChange} /><span className='block text-left text-gray-700 text-sm font-bold'>Experience Required</span>
            </div>
          </div>
          <div>
            <div className='mb-4'>
              <label className='block text-left text-gray-700 text-sm font-bold'>Salary</label>
              <input name="Salary" value={jobData.Salary} onChange={handleInputChange} className='shadow appearance-none border-2 rounded w-full py-2 p-2' />
            </div>
            <div className='mb-4'>
              <label className='block text-left text-gray-700 text-sm font-bold'>Select Categorie</label>
              <select name="Categorie" value={jobData.Categorie} onChange={handleDropdownChange} className='shadow appearance-none border-2 rounded w-full py-2 p-2' >
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
              <select name="Type" value={jobData.Type} onChange={handleDropdownChange} className='shadow appearance-none border-2 rounded w-full py-2 p-2' >
                <option value="">Types</option>
                {
                  types && types.map((type, index) => (
                    <option value={type.type} key={index} >{type.type}</option>
                  ))
                }
              </select>
            </div>
            <div className='mb-4'>
              <button type='submit' className='bg-sky-500 w-full text-white p-2 rounded-lg hover:bg-sky-950'>Save job</button>
            </div>
          </div>
        </form>






        <div className='pt-10'>
          <h1 className='text-left font-bold text-lg'>All Applications</h1>


          <>
            <table className='' width='100%'>
              <tbody >
                <tr>
                  <th>
                    Applicant Name
                  </th>
                  <th>
                    resume link
                  </th>
                  <th>
                    status
                  </th>
                </tr>
                {
                  applications && applications.map((application, index) => (
                    <tr key={index}>
                      <td>
                        {application.Name}
                      </td>
                      <td>
                        <a href={application.Resume} download="file.pdf">Resume</a>
                      </td>
                      <td>
                        {
                          application.Status
                        }
                      </td>
                      <td>
                        {application.Status === "Applied" ? (
                          <>
                            <button onClick={() => { handleStatusChange(application._id,"Rejected") }} className='bg-red-300 p-2 mr-2 hover:bg-red-500 hover:text-white text-black'>reject</button>
                            <button onClick={() => { handleStatusChange(application._id,"Accepted") }} className='bg-green-300 p-2 text-black hover:text-white hover:bg-green-600'>accept</button>
                          </>
                        ) : (
                          application.Status === "Rejected" ? (<div className='bg-red-300 p-2 rounded-lg'>Rejected</div>) : (<div className='bg-green-300 p-2 rounded-lg'>Already Accepted</div>)
                        )}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </>
        </div>
      </div>
    </div>
  );
};

export default ViewListingsPage;

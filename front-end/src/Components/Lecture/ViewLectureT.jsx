import React from 'react'
import { useState,useEffect } from 'react'

import Swal from "sweetalert2";

const ViewLectureT = () => {
    const [pdfs, setPdfs] = useState()

  useEffect(()=>{
    const fetchFilers = async () =>{
      const res = await fetch(`http://localhost:5000/lecture`);
      const data = await res.json();
      setPdfs(data);
    };
    fetchFilers();
  },[])

  console.log(pdfs);

  // const updateClicked = (id) => {
  //   console.log(id);
    
  // };

  const deleteClicked = (id) => {

   
  };

  return (
    <div>
        <div className='shadow card w-75 mx-auto text-center p-3 mt-5 bg-light'>
    <h1>Lecture Info</h1>

    <div>
      <div className="container">
      

    </div>
      <div className='container p-2 mt-4 mb-4'>
        <div className='row'>
        <div className='shadow card mx-auto w-75'>

              <table class="table table-striped">
                  <thead className='table-primary'>
                    <tr>
                      
                      <th scope="col">Year</th>
                      <th scope="col">Semester</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Meeting Link</th>
                      <th scope="col">Description</th>
                      <th scope="col">Lecture</th>
                      <th scope="col">Topic</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Document</th>
                      <th scope="col">Actions</th>

                    </tr>
                    </thead>
                    <tbody>
                      {pdfs?.map((pdf)=>
                      <tr key={pdf.id}>
                        <td>{pdf.year}</td>
                        <td>{pdf.semester}</td>
                        <td>{pdf.date}</td>
                        <td>{pdf.time}</td>
                        <td>{pdf.meeting_link}</td>
                        <td>{pdf.discription}</td>
                        <td>{pdf.lecture}</td>
                        <td>{pdf.topic}</td>
                        <td>{pdf.subject}</td>
                        <td>{ <a href={pdf.pdf} download>{pdf.topic}</a>}</td>
                        <td>
                             <button className="btn btn-danger"onClick={() => {deleteClicked(pdf._id);}}>delete</button>
                        </td>
                      </tr>
                      )
                     
                      }
                    </tbody>           
              </table>

        </div>

        </div>

    </div>
  </div>



</div>

    </div>
  )
}

export default ViewLectureT
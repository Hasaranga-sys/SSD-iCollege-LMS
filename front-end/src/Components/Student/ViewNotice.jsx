import React, { useState } from "react";
import { useEffect } from "react";
import NoticeService from "../Service/NoticeService";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import '../Student/Student.css'

const ViewNotice = () => {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("")
  const [searchD, setSearchD] = useState("")

  useEffect(() => {
    getAllNotices();
  }, []);

  const getAllNotices = () => {
    NoticeService.getAllNotices().then((data) => {
      setNotices(data.notices);
    });
  };
  return (
    <div>
    
      <div className="card text-bg-white shadow-lg mb-5 mt-5 note-container"
       >
       <h2 class="card-title mx-auto mt-3">Announcements</h2>

    <div className=" container row">
       <input type="text" placeholder="Search By Notice" className="form-control mx-5 mt-3"
             style={{width: "30%" }} onChange={(e) => {setSearch(e.target.value); }} />

        <input type="date" placeholder="Search By Notice" className="form-control mt-3"
             style={{width: "20%" , marginLeft:"39%"}} onChange={(e) => {setSearch(e.target.value); }} />
    </div>
       <div className="mt-2 mb-5">
        {
          notices?.filter((value) => {
            if (search === "") {
              return value;
            } else if (
              //value.id.toString(includes(search))
              value.date.toLowerCase().includes(search.toLowerCase()) || value.topic.toLowerCase().includes(search.toLowerCase())
            ) {
              return value;
            }
            return 0;
}).map((note)=><div className="card w-85 mx-5 mt-2 mb-2 shadow-lg" key={note.id}>
            
          <div className="card-body">        
           <div className='row'>
           <div className='rounded-2 col-sm-2'>
            <h4>
              <Moment format='YYYY MMM DD'>
               {note.date}
              </Moment>              
              </h4>
              </div>
             <div className='col-sm-10 '>
               <h5 className="card-title ">{note.topic}</h5>  
               <div className='col-sm-10 '>
                <p className="card-text">{note.notice}</p>
             </div>        
             </div>
         </div>      
       </div>
       
     </div>     
     
     )
        }
       
</div>
      </div> 
    </div>
  );
};

export default ViewNotice;

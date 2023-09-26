import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import NoticeService from "../Service/NoticeService";

const AnnouncemntViewPro = () => {
    const [notices, setNotices] = useState([]);
    const {_id}=useParams();
    
  useEffect(() => {
    getAllNotices();
  }, []);

  const getAllNotices = () => {
    NoticeService.getNoticeById(_id).then(response=>{
        console.log(response.notices.topic);
        // setTopic(response.notices.topic);
        // setFaculty(response.notices.faculty);
        // setDate(response.notices.date);
        setNotices(response.notices.topic);
   
    });
  };
  return (
    <div>
        <label
        value></label>
        {
            // notices.map((note)=><div>
            //    <h1>{note.topic}</h1>
                
              
            // </div>)
        }
    </div>
  )
}

export default AnnouncemntViewPro
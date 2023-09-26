import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GetLectureById(params) {
  let { Id } = useParams();
  console.log(Id);
  return <div> get id</div>;
}

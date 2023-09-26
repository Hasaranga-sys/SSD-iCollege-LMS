import axios from "axios";

class SubjectService{
    createSubject(subject){
        return axios.post("http://localhost:5000/subject/add", subject);
    }
    getAllSubject(){
        return axios.get("http://localhost:5000/subject/");
    }
    // deleteItem(id){
    //     return axios.delete(`http://localhost:5000/pdf/${id}`)
    // }
    // updateItem(id, item){
    //     //return axios.put(URL + '/' + noticeId);
    // }
    // getItemById(id){
    //     //return axios.get(URL + '/' + _id).then((res)=>res.data)
    // }
}
export default new SubjectService();
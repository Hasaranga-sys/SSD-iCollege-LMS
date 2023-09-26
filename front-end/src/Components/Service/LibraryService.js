import axios from "axios";

class LibraryService{
    createItem(item){
        //return axios.post(URL, notice);
    }
    getAllItem(){
        //return axios.get(URL).then((res)=>res.data);
    }
    deleteItem(id){
        return axios.delete(`http://localhost:5000/pdf/${id}`)
    }
    updateItem(id, item){
        //return axios.put(URL + '/' + noticeId);
    }
    getItemById(id){
        return axios.get(`http://localhost:5000/pdf/${id}`);
    }
   
}
export default new LibraryService();
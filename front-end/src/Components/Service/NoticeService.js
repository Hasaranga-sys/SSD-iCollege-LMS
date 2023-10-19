import axios from 'axios'
import { BASE_URL } from "../../config.js"

const URL = `${BASE_URL}/notice`;


class NoticeService{
    createNotice(notice){
        return axios.post(URL, notice);
    }
    getAllNotices(){
        return axios.get(URL).then((res)=>res.data);
    }
    deleteNotice(noticeId){
        return axios.delete(URL + '/' + noticeId)
    }
    updateNotice(noticeId, notice){
        return axios.put(URL + '/' + noticeId,notice);
    }
    getNoticeById(_id){
        return axios.get(URL + '/' + _id).then((resopnse)=>resopnse.data)
    }
}
export default new NoticeService();
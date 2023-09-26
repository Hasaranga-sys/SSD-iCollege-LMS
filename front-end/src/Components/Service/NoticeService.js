import axios from 'axios'

const URL = "http://localhost:5000/notice";

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
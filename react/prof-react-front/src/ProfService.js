import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

class ProfService {

    getAll() {
        return axios.get(`${API_URL}/profs`);
    }

    getById(id) {
        return axios.get(`${API_URL}/profs/${id}`);
    }

    updateProf(prof) {
        return axios.put(`${API_URL}/profs`, prof);
    }

    createProf(prof) {
        return axios.post(`${API_URL}/profs`, prof);
    }

    remove(id) {
        return axios.delete(API_URL+'/profs/' + id);
    }

}

export default new ProfService();
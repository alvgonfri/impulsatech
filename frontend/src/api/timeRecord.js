import axios from "./axios.js";
import Cookies from "js-cookie";

export const createTimeRecordRequest = async (timeRecord) =>
    axios.post(`/time-records`, timeRecord, {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });

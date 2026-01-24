import axios from "axios";

const API_URL = "../../public/complaints.json";

export const fetchComplaints = async () => {
  const response = await axios.get(API_URL);

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.data.complaints)) {
    return response.data.complaints;
  }

  return [];
};

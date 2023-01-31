import axios from "axios";
import baseUrl from "../utils/baseUrl";

const getAllNews = async () =>{
  const url = `${baseUrl}/news`;
  const resp = await axios.get(url,
    { header : 'Content-Type Aplication/json' }
  )
  return resp;
}
const getNewsById = async (id) =>{
  const url = `${baseUrl}/news/get-news/${id}`;
  const resp = await axios.get(url,
    { header : 'Content-Type Aplication/json' }
  )
  return resp;
}

export {
  getAllNews,
  getNewsById
}

import axios from 'axios'

const API_URL = "http://localhost:8080/books"

export const getAllBooks = async () => {
  const res = await axios.get(API_URL)
  return res.data
}

export const createBookItem = async (newBook) => {
  const res = await axios.post(API_URL, newBook)
  return res.data
}

export const updateBookItem = async (id, updatedBook) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedBook)
  return res.data
}

export const deleteBookItem = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`)
  return res.data
}
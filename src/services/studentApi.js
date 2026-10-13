import axios from 'axios';

// The base URL where JSON Server is running
const BASE_URL = 'http://localhost:3000/students';

/**
 * Fetch all students from JSON Server
 * HTTP Method: GET
 */
export const getStudents = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

/**
 * Fetch a single student by their ID
 * HTTP Method: GET
 */
export const getStudentById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

/**
 * Add a new student record
 * HTTP Method: POST
 */
export const addStudent = async (studentData) => {
  const response = await axios.post(BASE_URL, studentData);
  return response.data;
};

/**
 * Update an existing student record by ID
 * HTTP Method: PUT
 */
export const updateStudent = async (id, studentData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, studentData);
  return response.data;
};

/**
 * Delete a student record by ID
 * HTTP Method: DELETE
 */
export const deleteStudent = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

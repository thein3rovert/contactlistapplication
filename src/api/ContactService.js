import axios from "axios";

const API_URL = "http://localhost:8080/contacts";

export async function saveContact(contact) {
    return await axios.post(API_URL, contact)
}
// This is an asynchronous function named getContacts that takes two optional parameters: page and size.
export async function getContacts(page = 0, size = 10) {
    // An HTTP GET request is sent to the server using the axios library to retrieve a list of contacts.
    // The request is made to the API endpoint formed by concatenating the API_URL with the provided page and size parameters.
    // The default values for page and size are 0 and 10 respectively.
    // The function waits for the response from the server before returning it.
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
  }

// This is an asynchronous function named getContact that takes an id parameter.
export async function getContact(id) {
    // An HTTP GET request is sent to the server using the axios library.
    // The request is made to the API endpoint formed by concatenating the API_URL and the provided id.
    // The function waits for the response from the server before returning it.
    return await axios.get(`${API_URL}/${id}`);
}

// This is an asynchronous function named updateContact that takes an contact parameter.
export async function updateContact(contact) {
    //An HTTP PUT request is sent to the server using the axios library.
    //The request is made to the API endpoint formed by concatenating the API_URL and the provided id.
    //The function waits for the response from the server before returning it.
    return await axios.post(API_URL, contact)
}

// This is an asynchronous function named updatePhoto that takes a formData parameter.
export async function updatePhoto(formData) {
  // An HTTP PUT request is sent to the server using the axios library to update a photo.
  // The request is made to the API endpoint formed by concatenating the API_URL and "/photo".
  // The formData containing the photo information is sent in the request.
  // The function waits for the response from the server before returning it.
  return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteContact(id) {
    return await axios.delete(`${API_URL}/${id}`);
}


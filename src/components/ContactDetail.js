import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getContact, updatePhoto } from '../api/ContactService';

// This is a functional component named ContactDetail that takes two props: updateContact and updateImage.

const ContactDetail = ({updateContact, updateImage}) => {
const inputRef = useRef();
    // The contact state is initialized with an object containing properties for name, email, phone, address, title, status, and photoUrl.
    // All properties are initially set to an empty string or null value.
   const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
        photoUrl: ''
      });

      const {id} = useParams();
      console.log(id);


    // This is an asynchronous function named fetchContact that takes an id parameter.
    const fetchContact = async (id) => {
        try {
            // The get function is called with the provided id to fetch the contact data.
            // The function is expected to return a Promise that resolves to an object with a data property.
            const { data } = await getContact(id);

            // The contact state is updated with the fetched data.
            setContact(data);

            // The fetched data is logged to the console for debugging purposes.
            console.log(data);
        } catch (error) {
            // If an error occurs during the execution of the function, the error is logged to the console.
            console.log(error);
        }
    };

  const selectImage = () => {
    inputRef.current.click();
  };

// This is an asynchronous function named updatePhoto that takes a file parameter.
const updatePhoto = async (file) => {
  try {
    // A new FormData object is created to send the file and id information to the server.
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('id', id);

    // The updateImage function is called with the created formData object to update the image.
    await updateImage(formData);

    // The contact state is updated to include the new photoUrl.
    // The prev parameter is used to access the previous state of the contact object.
    // The spread operator (...) is used to copy the previous state.
    // The photoUrl property is updated with the new value.
    // The updated_at query parameter is appended to the photoUrl to ensure that the browser fetches the updated image.
    setContact((prev) => ({ ...prev, photoUrl: `${prev.photoUrl}?$updated_at=${new Date().getTime()}` }));

    // The string "data" is logged to the console for debugging purposes.
    console.log("data");
  } catch (error) {
    // If an error occurs during the execution of the function, the error is logged to the console.
    console.log(error);
  }
};
    useEffect(() => {
        fetchContact(id);
      }, []);

    return (
      <>
       <Link to={'/contacts'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
       <div className='profile'>
        <div className='profile__details'>
            <img src= {contact.photoUrl} alt={`Profile photo of ${contact.name}`} />
            <div className='profile__metadata'>
                <p className='profile__name'>{contact.name}</p>
                <p className='profile__muted'>JPG, GIF, or PNG. Max size of 10MG</p>
                <button onClick = {selectImage} className='btn'><i className='bi bi-cloud-upload'></i>Change Photo</button>
            </div>
        </div>
        <div className='profile__settings'>Settings will go here</div> 
       </div>

       <form style = {{ display: 'none'}}> </form>
       <input type='file' ref = {inputRef} onChange={(event) => updatePhoto(event.target.files[0])} name ='file' accept='image/*'/>
      </>
    )
}

export default ContactDetail
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getContact } from '../api/ContactService';

// This is a functional component named ContactDetail that takes two props: updateContact and updateImage.
const ContactDetail = ({updateContact, updateImage}) => {
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

    useEffect(() => {
        fetchContact(id);
      }, [id]);

    return (
      <>
       <Link to={'/contacts'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
       <div className='profile'>
        <div className='profile__details'>
            <img src= {contact.photoUrl} alt={`Profile photo of ${contact.name}`} />
            <div className='profile__metadata'>
                <p className='profile__name'>{contact.name}</p>
                <p className='profile__muted'>JPG, GIF, or PNG. Max size of 10MG</p>
                <button className='btn'><i className='bi bi-cloud-upload'></i>Change Photo</button>
            </div>
        </div>
        <div className='profile__settings'>Settings will go here</div> 
       </div>
      </>
    )
}

export default ContactDetail
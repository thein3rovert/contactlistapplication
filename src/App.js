
import { useEffect, useRef, useState } from 'react';
import './App.css';
import {getContacts, saveContact, updatePhoto} from './api/ContactService'
import Header from './components/Header';
import ContactList from './components/ContactList';
import { Routes,Route, Navigate } from 'react-router-dom';
import ContactDetail from './components/ContactDetail';

function App() {
  const modalRef = useRef();
  const fileRef = useRef();

  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
   {/* Saving the inout from the toogle modal */}
   const [file, setFile] = useState(undefined)
   const [values, setValues] = useState({

    name: '',
    email: '', 
    phone: '',
    address: '', 
    title: '', 
    status: '', 

   })
// This is an asynchronous function named getAllContacts. It takes two optional parameters: page and size.
const getAllContacts = async (page = 0, size = 10) => {
  try {
    // The current page is set to the provided page value.
    setCurrentPage(page);

    // The getContacts function is called with the provided page and size values.
    // The function is expected to return a Promise that resolves to an object with a data property.
    const {data} = await getContacts(page, size);

    // The data returned from the getContacts function is set as the state of the component using the setData function.
    setData(data);

    // The data is logged to the console for debugging purposes.
    console.log(data);
  } catch(error) {
    // If an error occurs during the execution of the function, the error is logged to the console.
    console.log(error);
  }
}
  
  /**
 * Updates the values state object with the new value from the event target.
 *
 * @param {Event} event - The event object that triggered the onChange function.
 * @return {void} This function does not return a value.
 */
// This is a function named onChange that takes an event object as a parameter.
const onChange = (event) => {
  // The setValues function is called to update the values state by spreading the existing values and updating the property corresponding to the name of the input field that triggered the event with the new value.
  setValues({...values, [event.target.name]: event.target.value});
};


  {/* Saving the contact */}
// This is an asynchronous function named handleNewContact that takes an event object as a parameter.
const handleNewContact = async (event) => {
  // The event's default behavior is prevented to prevent the form from submitting and reloading the page.
  event.preventDefault();

  try {
    // The saveContact function is called with the current values state to save the new contact.
    // The function is expected to return a Promise that resolves to an object with a data property.
    const { data } = await saveContact(values);

    // A new FormData object is created to send the file and the contact's id to the server.
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('id', data.id);

    // The updatePhoto function is called with the formData to update the contact's photo.
    // The function is expected to return a Promise that resolves to an object with a data property.
    const { data: photoUrl } = await updatePhoto(formData);
    console.log(photoUrl);

    // The modal is toggled to hide it.
    toggleModal(false);

    // The file and values state are reset.
    setFile(undefined);
    setValues({
      name: '',
      email: '',
      phone: '',
      address: '',
      title: '',
      status: '',
    });

    // The getAllContacts function is called to refresh the list of contacts.
    getAllContacts();
  } catch (error) {
    // If an error occurs during the execution of the function, the error is logged to the console.
    console.log(error);
  }
};

const updateContact = async () => {};

// This is an asynchronous function named updateImage that takes a formData parameter.
const updateImage = async (formData) => {
  try {
    // The updatePhoto function is called with the provided formData parameter to update the image.
    // The function is expected to return a Promise that resolves to an object with a data property.
    // The data property is then destructured to extract the photoUrl.
    const { data: photoUrl } = await updatePhoto(formData);
  } catch (error) {
    // If an error occurs during the execution of the function, the error is logged to the console.
    console.log(error);
  }
};


// This is a function named toggleModal that takes a boolean parameter named show.
const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

// This is a useEffect hook that runs the getAllContacts function when the component mounts.
// The empty dependency array [] ensures that it only runs once when the component mounts.
  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <>
      <Header toogleModal={toggleModal} nbOfContacts={data.totalElements} />
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={< Navigate to='/contacts' />} />
            <Route path="/contacts" element={<ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts} />} />
            <Route path="/contacts/:id" element={<ContactDetail updateContact = {updateContact} updateImage= {updateImage} />} />
          </Routes>
        </div>
      </main>

        {/* Modal */}
        <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewContact}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" value={values.email} onChange={onChange} name='email' required />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input type="text" value={values.title} onChange={onChange} name='title' required />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" value={values.phone} onChange={onChange} name='phone' required />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" value={values.address} onChange={onChange} name='address' required />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input type="text" value={values.status} onChange={onChange} name='status' required />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
   
    </>
  );
}

export default App;

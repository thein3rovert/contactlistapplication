
import { useEffect, useRef, useState } from 'react';
import './App.css';
import {getContacts} from './api/ContactService'
import Header from './components/Header';
import ContactList from './components/ContactList';
import { Routes,Route, Navigate } from 'react-router-dom';

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

  const getAllContacts = async (page = 0, size = 10) => {
    try{ 
      setCurrentPage(page);
      const {data} = await getContacts(page, size);
      setData(data);
      console.log(data);
    }catch(error) {
      console.log(error);
    
    }
  }
  const toogleModal = (show) =>  show ? modalRef.current.showModal() : modalRef.current.close();

  /**
 * Updates the values state object with the new value from the event target.
 *
 * @param {Event} event - The event object that triggered the onChange function.
 * @return {void} This function does not return a value.
 */
const onChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value});
    console.log(values);
  };
  const handleNewContact = async (event) => {
    
  }

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <>
      <Header toogleModal={toogleModal} nbOfContacts={data.totalElements} />
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={< Navigate to='/contacts' />} />
            <Route path="/contacts" element={<ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts} />} />
          </Routes>
        </div>
      </main>

        {/* Modal */}
        <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i onClick={() => toogleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form >
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
              <button onClick={() => toogleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
   
    </>
  );
}

export default App;

import React from 'react'
import Contact from './Contact'


/**
 * Renders a list of contacts.
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data object containing the contacts.
 * @param {number} props.currentPage - The current page number.
 * @param {Function} props.getAllContacts - The function to get all contacts.
 * @returns {JSX.Element} - The rendered ContactList component.
 */
const ContactList = ({data, currentPage, getAllContacts}) => {
  return (
    <main className='main'>
        {data?.content?.length === 0 && <div>No Contacts. Kindly add new contact</div>}

        <ul className = 'contact__list'> 
        {data?.content?.length > 0 && data.content.map(contact => <Contact contact = {contact}  key = {contact.id} />)}
        </ul>

        {/* Pagination */}
        {data?.content?.length > 0 &&  data?.totalPages > 1 &&
        <div className='pagination'>
            <a onClick = {() => getAllContacts(currentPage - 1)} className= {0 === currentPage ? 'disabled' : ''}></a>
            &laquo;

            {data &&[...Array(data.totalPages).keys()].map((page, index) =>
            <a onClick={getAllContacts(page)} className= {currentPage === page ? 'active' : '' } key = {page} > {page + 1}</a>)}

            <a onClick = {() => getAllContacts(currentPage + 1)} className= {data.totalPages === currentPage ? 'disabled' : ''}></a>
            &raquo;
            <a></a>
        </div>
        }

    </main>
  )
}

export default ContactList
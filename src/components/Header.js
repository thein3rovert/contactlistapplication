import React from 'react'


/**
 * Renders the header component.
 *
 * @param {function} toogleModal - A function to toggle the modal.
 * @param {number} nbOfContacts - The number of contacts.
 * @returns {JSX.Element} The rendered header component.
 */
const Header = ({toogleModal, nbOfContacts}) => {
  return (
      <header className='header'>
          <div className='container'>
              <h3> Contact List({nbOfContacts})</h3>
              <button onClick={() => toogleModal(true)} className='btn'>
                  <i className='bi bi-plus-square'> </i> Add New Contact
              </button>
          </div>
      </header>
  )
}

export default Header
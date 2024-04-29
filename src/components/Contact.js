import React from 'react'
import { Link } from 'react-router-dom'


/**
 * Contact component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.contact - Contact information.
 * @param {number} props.contact.id - Contact ID.
 * @param {string} props.contact.photoUrl - URL to the contact's photo.
 * @param {string} props.contact.name - Contact name.
 * @param {string} props.contact.title - Contact title.
 * @param {string} props.contact.email - Contact email.
 * @param {string} props.contact.address - Contact address.
 * @param {string} props.contact.phone - Contact phone number.
 * @param {string} props.contact.status - Contact status ("Active" or "Inactive").
 * @returns {JSX.Element} - Rendered component.
 */
const Contact = ({ contact }) => {
  return (
    <Link to = {`/contacts/${contact.id}`}className= "contact__item">
        <div className="contact__header">
            <div className="contact__image">
                <img scr = {contact.photoUrl} alt={contact.name} />
            </div>
            <div className="contact__details">
                <p clasname = "contact_name">{contact.name.substring(0, 20)}</p>
                <p className="contact_title"> {contact.title}</p>
            </div>
        </div>
        
        <div className="contact__body">
            <p> <i className="bi bi-envelope"></i> {contact.email}</p>
            <p> <i className="bi bi-geo"></i> {contact.address}</p>
            <p> <i className="bi bi-telephone"></i> {contact.phone}</p>
            {/* Conditional rendering of icons based on contact status */}
            <p>
                {contact.status === "Active" ? <i className="bi bi-check-circle"></i> : 
                <i className="bi bi-x-circle"></i> } {contact.status}
                </p>
        </div>
    </Link>
  )
}

export default Contact
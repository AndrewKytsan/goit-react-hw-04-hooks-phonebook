import PropTypes from 'prop-types';
import s from './ContactItem.module.scss';

function ContactItem({ contact, onRemoveContact }) {
    return (
        <li className={s.listItem}>
            <p className={s.listItemText}>
                {contact.name} : {contact.number}
            </p>
            <button
                className={s.listItemButton}
                type="button"
                onClick={() => onRemoveContact(contact.id)}
            >
                Delete
            </button>
        </li>
    );
}

ContactItem.propTypes = {
    contact: PropTypes.object,
    onRemoveContact: PropTypes.func.isRequired,
};

export default ContactItem;

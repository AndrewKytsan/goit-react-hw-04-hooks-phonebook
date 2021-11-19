import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

import s from './App.module.scss';
import { useEffect, useState } from 'react';
export default function App() {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');
    useEffect(() => {
        const storedContacts = JSON.parse(localStorage.getItem('contacts'));
        if (storedContacts) {
            setContacts(storedContacts);
        } else {
            return;
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const handleSubmit = data => {
        if (
            contacts.find(
                contact =>
                    contact.name.toLowerCase() === data.name.toLowerCase(),
            )
        ) {
            alert(`${data.name} is already in contacts`);
            return;
        } else {
            setContacts(prev => [...prev, data]);
        }
    };

    const removeContact = id => {
        const contactsToDelete = contacts.filter(contact => contact.id !== id);
        setContacts(contactsToDelete);
    };

    const changeFilter = e => {
        const { value } = e.currentTarget;
        setFilter(value);
    };

    const getFilteredContacts = () => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()),
        );
    };

    return (
        <div className={s.container}>
            <h1 className={s.mainTitle}>Phonebook</h1>

            <ContactForm onSubmit={handleSubmit} />

            <h2 className={s.mainTitle}>Contacts</h2>
            <Filter value={filter} onFilter={changeFilter} />
            <ContactList
                onRemoveContact={removeContact}
                contacts={getFilteredContacts()}
            />
        </div>
    );
}

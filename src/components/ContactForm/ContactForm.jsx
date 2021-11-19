import { useState } from 'react';
import s from './ContactForm.module.scss';
import { v4 as uuid } from 'uuid';
export default function ContactForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const formHandler = e => {
        const uniqueId = uuid();
        e.preventDefault();
        setName('');
        setNumber('');
        onSubmit({ name: name, number: number, id: uniqueId });
    };
    const inputHandler = e => {
        const { name, value } = e.currentTarget;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }
    };

    return (
        <form className={s.form} autoComplete="off" onSubmit={formHandler}>
            <span className={s.formLabel}>
                Name
                <br />
                <input
                    className={s.formInput}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    value={name}
                    required
                    onChange={inputHandler}
                />
            </span>
            <br />
            <span className={s.formLabel}>
                Number
                <br />
                <input
                    className={s.formInput}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    value={number}
                    onChange={inputHandler}
                    required
                />
            </span>
            <br />
            <button type="submit" className={s.formBtn}>
                Add contact
            </button>
        </form>
    );
}

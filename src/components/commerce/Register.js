import React, {useState} from 'react'

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
const [passwordConfirmation, setPasswordConfirmation] = useState('');
const [firstName, setFirstName] = useState('');
const [darkMode, setDarkMode] = useState(false);

const handleChanges = (e) => {
    if (e.target.name === 'email') {
        setEmail(e.target.value);
    } else if (e.target.name === 'password') {
        setPassword(e.target.value);
    } else if (e.target.name === 'passwordConfirmation') {
        setPasswordConfirmation(e.target.value);
    } else if (e.target.name === 'firstName') {
        setFirstName(e.target.value);
    }
}
const handleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', darkMode);
}

    return (
        <div>Register</div>
    )
}

export default Register

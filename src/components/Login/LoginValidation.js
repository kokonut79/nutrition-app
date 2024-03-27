export const validateLoginForm = (values) => {
    let errors = {};

    // Username validation
    if (!values.username) {
        errors.username = 'Username is required';
    } else if (typeof values.username !== 'string') {
        errors.username = 'Username must be a string';
    } else if (values.username.trim().length === 0) {
        errors.username = 'Username cannot be empty';
    } else if (values.username.length < 3) {
        errors.username = 'Username must be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
        errors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Password validation
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (typeof values.password !== 'string') {
        errors.password = 'Password must be a string';
    } else if (values.password.trim().length === 0) {
        errors.password = 'Password cannot be empty';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    } else if (!/(?=.*[a-z])/.test(values.password)) {
        errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*[0-9])/.test(values.password)) {
        errors.password = 'Password must contain at least one digit';
    }

    return errors;
};

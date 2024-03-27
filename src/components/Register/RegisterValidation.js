export const validateRegisterForm = (values) => {
    let errors = {};

    // Email validation
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    // Username validation
    if (!values.username) {
        errors.username = 'Username is required';
    } else if (values.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
        errors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Password validation
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one digit';
    }

    // Confirm password validation
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm Password is required';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
};

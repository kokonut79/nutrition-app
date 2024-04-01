export const validateAddFoodForm = (formData) => {
    let errors = {};

    if (!formData.name) {
        errors.name = 'Name is required';
    }

    if (!formData.calories) {
        errors.calories = 'Calories is required';
    } else if (isNaN(formData.calories)) {
        errors.calories = 'Calories must be a number';
    }

    if (!formData.protein) {
        errors.protein = 'Protein is required';
    } else if (isNaN(formData.protein)) {
        errors.protein = 'Protein must be a number';
    }

    if (!formData.fat) {
        errors.fat = 'Fat is required';
    } else if (isNaN(formData.fat)) {
        errors.fat = 'Fat must be a number';
    }

    if (!formData.carbs) {
        errors.carbs = 'Carbs is required';
    } else if (isNaN(formData.carbs)) {
        errors.carbs = 'Carbs must be a number';
    }

    return errors;
}

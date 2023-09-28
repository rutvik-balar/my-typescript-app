
let formIsValid = true;
const newErrors = {
    name: '',
    email: '',
    jobTitle: '',
};

interface FormData {
    name: string;
    email: string;
    jobTitle: string;
}


function Validation(formData: FormData): [boolean, { name: string; email: string; jobTitle: string }] {


    if (!formData.name?.trim()) {
        formIsValid = false;
        newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name || '')) {
        formIsValid = false;
        newErrors.name = 'Invalid employee name';
    }

    if (!formData.email?.trim()) {
        formIsValid = false;
        newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email || '')) {
        formIsValid = false;
        newErrors.email = 'Invalid email address';
    }

    if (!formData.jobTitle?.trim()) {
        formIsValid = false;
        newErrors.jobTitle = 'Job Title is required';
    }

    return [formIsValid, newErrors];

}

export default Validation


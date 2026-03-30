export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
};

// Returns array of error messages; empty array means valid
export const validateRegistrationData = (data: Record<string, any>): string[] => {
    const errors: string[] = [];
    const required = ['name', 'email', 'gender', 'occupation', 'relationship_status', 'phone', 'hometown', 'current_address'];
    for (const field of required) {
        if (!data[field] || data[field].toString().trim() === '') {
            errors.push(`${field} is required`);
        }
    }
    if (data.email && !validateEmail(data.email)) {
        errors.push('Invalid email address');
    }
    if (data.phone && !validatePhoneNumber(data.phone)) {
        errors.push('Invalid phone number');
    }
    if (!data.privacy_agreement) {
        errors.push('Privacy agreement is required');
    }
    return errors;
};

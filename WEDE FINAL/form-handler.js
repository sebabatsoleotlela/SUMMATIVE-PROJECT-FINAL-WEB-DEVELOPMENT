// form-handler.js - Form validation and submission handling

class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.fields = {};
        this.isSubmitting = false;
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.cacheFields();
        this.setupValidation();
        this.setupSubmission();
        this.enhanceFormStyling();
    }
    
    cacheFields() {
        // Cache all form fields for quick access
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            this.fields[field.name] = field;
        });
    }
    
    setupValidation() {
        // Add real-time validation to all fields
        Object.values(this.fields).forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldStatus(field));
            
            // Special handling for checkboxes in groups
            if (field.type === 'checkbox' && field.name.includes('[]')) {
                field.addEventListener('change', () => this.validateCheckboxGroup(field.name));
            }
        });
    }
    
    setupSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!this.isSubmitting && this.validateForm()) {
                this.handleFormSubmission();
            }
        });
    }
    
    enhanceFormStyling() {
        // Add consistent styling to all form elements
        Object.values(this.fields).forEach(field => {
            this.styleFormElement(field);
        });
        
        // Style submit button
        const submitButton = this.form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitButton) {
            this.styleSubmitButton(submitButton);
        }
    }
    
    styleFormElement(element) {
        const baseStyles = {
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            width: '100%',
            boxSizing: 'border-box'
        };
        
        Object.assign(element.style, baseStyles);
        
        element.addEventListener('focus', function() {
            this.style.borderColor = '#4CAF50';
            this.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
            this.style.outline = 'none';
        });
        
        element.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    }
    
    styleSubmitButton(button) {
        button.style.cssText = `
            background-color: #4CAF50;
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            margin-top: 10px;
        `;
        
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.backgroundColor = '#45a049';
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.backgroundColor = '#4CAF50';
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    }
    
    validateForm() {
        let isValid = true;
        this.clearAllErrors();
        
        // Validate all required fields
        Object.values(this.fields).forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        // Validate checkbox groups
        const checkboxGroups = this.getCheckboxGroups();
        checkboxGroups.forEach(groupName => {
            if (!this.validateCheckboxGroup(groupName)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Skip validation for unchecked checkboxes without required attribute
        if (field.type === 'checkbox' && !field.checked && !field.hasAttribute('required')) {
            this.clearFieldStatus(field);
            return true;
        }
        
        // Required field validation
        if (field.hasAttribute('required')) {
            if (field.type === 'checkbox') {
                if (!field.checked) {
                    this.showError(field, 'This field is required');
                    isValid = false;
                }
            } else if (!value) {
                this.showError(field, 'This field is required');
                isValid = false;
            }
        }
        
        // Email validation
        if (field.type === 'email' && value && !this.isValidEmail(value)) {
            this.showError(field, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation
        if (field.type === 'tel' && value && !this.isValidPhone(value)) {
            this.showError(field, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Minimum length validation
        if (field.hasAttribute('minlength') && value.length < parseInt(field.getAttribute('minlength'))) {
            const minLength = field.getAttribute('minlength');
            this.showError(field, `Must be at least ${minLength} characters`);
            isValid = false;
        }
        
        if (isValid) {
            this.showSuccess(field);
        }
        
        return isValid;
    }
    
    validateCheckboxGroup(groupName) {
        const checkboxes = this.form.querySelectorAll(`input[name="${groupName}"]`);
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const isRequired = Array.from(checkboxes).some(cb => cb.hasAttribute('required'));
        
        if (isRequired && checkedCount === 0) {
            // Show error on the first checkbox in the group
            this.showError(checkboxes[0], 'Please select at least one option');
            return false;
        }
        
        // Clear errors from all checkboxes in the group
        checkboxes.forEach(checkbox => this.clearFieldStatus(checkbox));
        return true;
    }
    
    getCheckboxGroups() {
        const checkboxNames = new Set();
        this.form.querySelectorAll('input[type="checkbox"][name*="[]"]').forEach(checkbox => {
            checkboxNames.add(checkbox.name);
        });
        return Array.from(checkboxNames);
    }
    
    showError(field, message) {
        this.clearFieldStatus(field);
        
        field.style.borderColor = '#e74c3c';
        field.style.backgroundColor = '#fff8f8';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 14px;
            margin-top: 5px;
            margin-bottom: 10px;
        `;
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }
    
    showSuccess(field) {
        this.clearFieldStatus(field);
        field.style.borderColor = '#4CAF50';
        field.style.backgroundColor = '#f8fff8';
    }
    
    clearFieldStatus(field) {
        field.style.borderColor = '#ddd';
        field.style.backgroundColor = '';
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    clearAllErrors() {
        const errors = this.form.querySelectorAll('.field-error');
        errors.forEach(error => error.remove());
        
        Object.values(this.fields).forEach(field => {
            field.style.borderColor = '#ddd';
            field.style.backgroundColor = '';
        });
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        // Basic phone validation - accepts numbers, spaces, hyphens, parentheses
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
    
    async handleFormSubmission() {
        this.isSubmitting = true;
        const submitButton = this.form.querySelector('button[type="submit"], input[type="submit"]');
        const originalText = submitButton.textContent || submitButton.value;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        submitButton.textContent = 'Sending...';
        submitButton.value = 'Sending...';
        
        try {
            // Simulate form submission (replace with actual API call)
            await this.simulateSubmission();
            
            // Show success message
            this.showFormSuccess();
            this.form.reset();
            this.clearAllErrors();
            
        } catch (error) {
            this.showFormError('Failed to send message. Please try again.');
        } finally {
            // Reset button state
            this.isSubmitting = false;
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            submitButton.textContent = originalText;
            submitButton.value = originalText;
        }
    }
    
    async simulateSubmission() {
        // Simulate network delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate for demo
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }
    
    showFormSuccess() {
        const formData = this.getFormData();
        let successMessage = 'Thank you! Your message has been sent successfully.';
        
        // Custom success message for inquiry form
        if (this.form.id === 'inquiryForm') {
            const selectedServices = this.getSelectedServices();
            successMessage = `Thank you for your inquiry about ${selectedServices}! We will contact you within 24 hours with more information.`;
        }
        
        window.LaunchPAD.showNotification(successMessage, 'success');
        
        // Log form data to console (for demo purposes)
        console.log('Form submitted:', formData);
    }
    
    showFormError(message) {
        window.LaunchPAD.showNotification(message, 'error');
    }
    
    getFormData() {
        const formData = {};
        Object.values(this.fields).forEach(field => {
            if (field.type === 'checkbox') {
                if (field.name.includes('[]')) {
                    if (!formData[field.name]) formData[field.name] = [];
                    if (field.checked) formData[field.name].push(field.value);
                } else {
                    formData[field.name] = field.checked;
                }
            } else if (field.type === 'radio') {
                if (field.checked) formData[field.name] = field.value;
            } else {
                formData[field.name] = field.value;
            }
        });
        return formData;
    }
    
    getSelectedServices() {
        if (this.form.id !== 'inquiryForm') return '';
        
        const serviceCheckboxes = this.form.querySelectorAll('input[name="services[]"]:checked');
        const services = Array.from(serviceCheckboxes).map(cb => {
            switch(cb.value) {
                case 'internship': return 'Internship Programs';
                case 'mentorship': return 'Mentorship';
                case 'networking': return 'Networking Events';
                case 'resume': return 'Resume Support';
                case 'placement': return 'Job Placement';
                default: return cb.value;
            }
        });
        
        return services.length > 0 ? services.join(', ') : 'our services';
    }
}

// Initialize form handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize inquiry form
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        new FormHandler('inquiryForm');
    }
    
    // Initialize contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        new FormHandler('contactForm');
    }
    
    // Initialize any other forms
    const otherForms = document.querySelectorAll('form:not(#inquiryForm):not(#contactForm)');
    otherForms.forEach((form, index) => {
        if (!form.id) {
            form.id = `form-${index}`;
        }
        new FormHandler(form.id);
    });
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FormHandler };
}
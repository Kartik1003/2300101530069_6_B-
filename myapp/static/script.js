document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.loader');

    // Toggle Password Visibility
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle Icon
        if (type === 'text') {
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        } else {
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
        }
    });

    // Input Validation Handlers
    emailInput.addEventListener('input', () => {
        const emailGroup = emailInput.closest('.input-group');
        if (emailInput.value.trim() !== '') {
            emailGroup.classList.remove('error');
        }
    });

    passwordInput.addEventListener('input', () => {
        const passwordGroup = passwordInput.closest('.input-group');
        if (passwordInput.value.trim() !== '') {
            passwordGroup.classList.remove('error');
        }
    });

    // Email validation regex
    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous error states
        document.querySelectorAll('.input-group').forEach(group => {
            group.classList.remove('error');
        });
        
        let isValid = true;
        const emailGroup = emailInput.closest('.input-group');
        const passwordGroup = passwordInput.closest('.input-group');
        const emailError = document.getElementById('emailError');
        
        // Validate Email
        if (emailInput.value.trim() === '') {
            emailGroup.classList.add('error');
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            emailGroup.classList.add('error');
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate Password
        if (passwordInput.value.trim() === '') {
            passwordGroup.classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate API Call / Login Process
            setLoadingState(true);
            
            // Simulated fake network request
            setTimeout(() => {
                setLoadingState(false);
                
                // Add success animation to button
                const originalBg = submitBtn.style.background;
                submitBtn.style.background = 'var(--success)';
                btnText.textContent = 'Success!';
                
                // Redirect logic would go here
                setTimeout(() => {
                    // Reset button for demo purposes
                    submitBtn.style.background = originalBg;
                    btnText.textContent = 'Sign In';
                }, 2000);
                
            }, 1500);
        } else {
            // Add shake animation to form to indicate error
            loginForm.classList.add('shake');
            setTimeout(() => {
                loginForm.classList.remove('shake');
            }, 500);
        }
    });

    function setLoadingState(isLoading) {
        if (isLoading) {
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';
            submitBtn.style.cursor = 'wait';
        } else {
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    }
});

// Add shake animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
`;
document.head.appendChild(style);

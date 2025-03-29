// Sample data for services
const servicesData = {
    food: [
        { name: "Uber Eats", url: "https://www.ubereats.com" },
        { name: "DoorDash", url: "https://www.doordash.com" },
        { name: "Grubhub", url: "https://www.grubhub.com" },
        { name: "Zomato", url: "https://www.zomato.com" }
    ],
    shopping: [
        { name: "Amazon", url: "https://www.amazon.com" },
        { name: "eBay", url: "https://www.ebay.com" },
        { name: "Etsy", url: "https://www.etsy.com" },
        { name: "ASOS", url: "https://www.asos.com" }
    ],
    tour: [
        { name: "Booking.com", url: "https://www.booking.com" },
        { name: "Expedia", url: "https://www.expedia.com" },
        { name: "TripAdvisor", url: "https://www.tripadvisor.com" },
        { name: "Airbnb", url: "https://www.airbnb.com" }
    ],
    cosmetics: [
        { name: "Sephora", url: "https://www.sephora.com" },
        { name: "Ulta", url: "https://www.ulta.com" },
        { name: "MAC Cosmetics", url: "https://www.maccosmetics.com" }
    ],
    grocery: [
        { name: "Instacart", url: "https://www.instacart.com" },
        { name: "Walmart Grocery", url: "https://grocery.walmart.com" },
        { name: "Amazon Fresh", url: "https://www.amazon.com/amazonfresh" }
    ]
};

// Populate services on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.categories')) {
        populateServices();
        setupSearch();
    }
    
    if (document.getElementById('login-form')) {
        setupLoginForm();
    }
});

function populateServices() {
    const categories = document.querySelectorAll('.category-card');
    
    categories.forEach(category => {
        const categoryId = category.id;
        const servicesList = category.querySelector('.services-list');
        
        if (servicesData[categoryId]) {
            servicesData[categoryId].forEach(service => {
                const serviceItem = document.createElement('div');
                serviceItem.className = 'service-item';
                serviceItem.textContent = service.name;
                serviceItem.addEventListener('click', () => {
                    // In a real implementation, this would use the SSO token
                    window.open(service.url, '_blank');
                });
                servicesList.appendChild(serviceItem);
            });
        }
    });
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (!searchTerm) return;
        
        // Collect all services from all categories
        let allServices = [];
        for (const category in servicesData) {
            allServices = allServices.concat(servicesData[category]);
        }
        
        // Filter services that match the search term
        const matchedServices = allServices.filter(service => 
            service.name.toLowerCase().includes(searchTerm)
        );
        
        // Display search results (in a real app, you'd have a better UI for this)
        if (matchedServices.length > 0) {
            alert(`Found services:\n${matchedServices.map(s => s.name).join('\n')}`);
        } else {
            alert('No services found matching your search.');
        }
    }
}

function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const forgotModal = document.getElementById('forgot-modal');
    const closeModal = document.getElementById('close-modal');
    const sendOtpBtn = document.getElementById('send-otp');
    const otpSection = document.getElementById('otp-section');
    const resetPasswordBtn = document.getElementById('reset-password');
    
    // Mock user data (in a real app, this would be server-side)
    const users = [
        { email: "user@example.com", password: "password123" }
    ];
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Check credentials (mock validation)
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // In a real app, you'd set a session or token here
            alert('Login successful! Redirecting to dashboard...');
            window.location.href = "index.html";
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });
    
    // Forgot password flow
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        forgotModal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', function() {
        forgotModal.style.display = 'none';
    });
    
    sendOtpBtn.addEventListener('click', function() {
        const email = document.getElementById('reset-email').value;
        
        if (email && email.includes('@')) {
            // In a real app, you'd send an OTP to the email
            alert(`OTP sent to ${email} (mock implementation)`);
            otpSection.style.display = 'block';
        } else {
            alert('Please enter a valid email address.');
        }
    });
    
    resetPasswordBtn.addEventListener('click', function() {
        const otp = document.getElementById('otp').value;
        const newPassword = document.getElementById('new-password').value;
        
        if (otp && newPassword) {
            // In a real app, you'd validate the OTP first
            const user = users.find(u => u.email === document.getElementById('reset-email').value);
            if (user) {
                user.password = newPassword;
                alert('Password reset successfully! You can now login with your new password.');
                forgotModal.style.display = 'none';
            } else {
                alert('No account found with that email.');
            }
        } else {
            alert('Please enter OTP and new password.');
        }
    });
}
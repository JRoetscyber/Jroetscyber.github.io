/**
 * Portfolio Website JavaScript
 * Author: Jonathan Roets
 * Updated: 2025-07-25 09:47:06 (UTC)
 * Fixed progress bars and enhanced functionality
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    (function() {
        emailjs.init('degXCNYEDAW_NZvRs');
    })();
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Update current UTC time
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize project filters
    setupProjectFilters();
    
    // Initialize timeline tabs
    setupTimelineTabs();
    
    // Initialize enhanced skill progress bars with fixes
    initEnhancedSkillBars();
});

// Update current date and time in UTC
function updateDateTime() {
    const now = new Date();
    
    // Format as YYYY-MM-DD HH:MM:SS (UTC)
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} (UTC)`;
    
    // Update the element with the current date/time
    const dateTimeElement = document.getElementById('current-datetime');
    if (dateTimeElement) {
        dateTimeElement.textContent = formattedDateTime;
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (body.classList.contains('dark-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        }
    });
}

// Mobile navigation toggle
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Implement smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Project filtering functionality
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length || !projectCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter the projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                
                // Add animation classes for smooth transitions
                card.classList.add('animate-filter');
                
                // Split categories by comma and trim whitespace
                const categoryArray = categories.split(',').map(cat => cat.trim().toLowerCase());
                
                if (filterValue === 'all' || categoryArray.includes(filterValue.toLowerCase())) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.classList.remove('animate-filter');
                    }, 300);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
}

// Timeline tab functionality
function setupTimelineTabs() {
    const timelineTabs = document.querySelectorAll('.timeline-tab');
    const timelines = document.querySelectorAll('.timeline');
    
    if (!timelineTabs.length || !timelines.length) return;
    
    timelineTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            timelineTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the tab value
            const tabValue = this.getAttribute('data-tab');
            
            // Hide all timelines and show the selected one
            timelines.forEach(timeline => {
                if (timeline.id === `${tabValue}-timeline`) {
                    timeline.classList.add('active');
                    
                    // Reset animations
                    const items = timeline.querySelectorAll('.timeline-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animated');
                        }, 100 * index);
                    });
                } else {
                    timeline.classList.remove('active');
                    timeline.querySelectorAll('.timeline-item').forEach(item => {
                        item.classList.remove('animated');
                    });
                }
            });
        });
    });
    
    // Initialize the first tab
    const activeTimeline = document.querySelector('.timeline.active');
    if (activeTimeline) {
        const firstTimelineItems = activeTimeline.querySelectorAll('.timeline-item');
        firstTimelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animated');
            }, 500 + (100 * index)); // Add a delay for initial load
        });
    }
}

// Enhanced skill progress bars with fixes for all screen sizes
function initEnhancedSkillBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    if (!progressBars.length) return;
    
    // Remove 'no-js' class to indicate JavaScript is running
    document.documentElement.classList.remove('no-js');
    
    // Create observer for detecting when skills come into view
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.getAttribute('data-progress');
                    
                    // Apply multiple animation methods for cross-browser compatibility
                    
                    // Method 1: Transform
                    progressBar.style.transform = `scaleX(${progress / 100})`;
                    
                    // Method 2: Width (backup for browsers with transform issues)
                    if (window.innerWidth >= 577 && window.innerWidth <= 991) {
                        progressBar.style.width = `${progress}%`;
                    }
                    
                    // Ensure transition is applied with !important to override any conflicting styles
                    progressBar.style.cssText += 'transition: transform 1.5s ease, width 1.5s ease !important;';
                    
                    // Method 3: CSS Variable (for CSS-only fallback)
                    progressBar.style.setProperty('--skill-percent', `${progress}%`);
                    
                    // Stop observing once animation is triggered
                    observer.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        });
        
        // Observe each progress bar
        progressBars.forEach(bar => {
            // Reset to initial state before observing
            bar.style.transform = 'scaleX(0)';
            observer.observe(bar);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.transform = `scaleX(${progress / 100})`;
            bar.style.width = `${progress}%`;
        });
    }
    
    // Secondary method - force update on scroll for problematic browsers/devices
    window.addEventListener('scroll', function() {
        progressBars.forEach(bar => {
            if (!bar.style.transform || bar.style.transform === 'scaleX(0)') {
                const rect = bar.getBoundingClientRect();
                const inView = (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
                
                if (inView) {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.transform = `scaleX(${progress / 100})`;
                    bar.style.width = `${progress}%`;
                }
            }
        });
    }, { passive: true });
}

// Change navbar style on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Form submission handling
function submitForm(event) {
    event.preventDefault();
    
    // Get form values using the correct IDs from your HTML
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Get form message display element
    const formSuccess = document.getElementById('formSuccess');
    const submitButton = document.querySelector('.form-submit');
    
    // Validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Show loading state
    submitButton.innerHTML = '<span class="submit-text">Sending...</span>';
    submitButton.disabled = true;
    
    // Add time and year variables
    const now = new Date();
    const time = now.toLocaleString();
    const year = now.getFullYear();
    
    const serviceID = "service_56xmdu2";
    const templateID = "template_23pzg8u";
    
    // Send emails using EmailJS
    Promise.all([
        emailjs.send(serviceID, templateID, {
            from_name: name,
            from_email: email,
            title: subject,
            message: message,
            time: time,
            year: year
        }),
        emailjs.send('service_56xmdu2', 'template_vc2ninu', {
            from_name: name,
            title: subject,
            from_email: email,
            year: year,
            email: email
        })
    ])
    .then(
        res => {
            // Show success message
            if (formSuccess) {
                formSuccess.classList.add('active');
            }
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Reset button
            submitButton.innerHTML = '<span class="submit-text">Send Message</span><span class="submit-icon"><i class="fas fa-paper-plane"></i></span>';
            submitButton.disabled = false;
        },
        error => {
            console.error('EmailJS send failed:', error);
            alert('Failed to send email. Please try again later.');
            
            // Reset button
            submitButton.innerHTML = '<span class="submit-text">Send Message</span><span class="submit-icon"><i class="fas fa-paper-plane"></i></span>';
            submitButton.disabled = false;
        }
    );
    
    return false;
}

// Reset form after successful submission
function resetForm() {
    const formSuccess = document.getElementById('formSuccess');
    if (formSuccess) {
        formSuccess.classList.remove('active');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMobileMenuButton = document.querySelector('.close-mobile-menu');
    const navLinksMobile = document.querySelectorAll('.nav-link-mobile');
    const navLinksDesktop = document.querySelectorAll('.navbar-menu .nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.querySelector('.navbar');

    // Function to toggle mobile menu visibility and body scroll
    const toggleMobileMenu = () => {
        mobileMenuOverlay.classList.toggle('is-active'); // Toggles slide-in/out and visibility
        hamburger.classList.toggle('is-active'); // Toggles hamburger to X icon
        document.body.classList.toggle('overflow-hidden'); // Prevents background scrolling
    };

    // Event listener for hamburger icon click
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Event listener for close button click
    if (closeMobileMenuButton) {
        closeMobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    // Event listeners for mobile menu links (to close menu on click and scroll)
    navLinksMobile.forEach(link => {
        link.addEventListener('click', (e) => {
            // Smooth scroll logic (optional, as browser default anchor is usually smooth enough)
            e.preventDefault(); // Prevent default jump
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                window.scrollTo({
                    top: targetSection.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
            toggleMobileMenu(); // Close the mobile menu after clicking a link
        });
    });

    // Event listeners for desktop menu links (for smooth scroll)
    navLinksDesktop.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default jump
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                window.scrollTo({
                    top: targetSection.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Function to set active navigation link based on scroll position
    const setActiveNavLink = () => {
        let currentActiveSectionId = '';
        const navbarHeight = navbar ? navbar.offsetHeight : 0; // Get navbar height

        sections.forEach(section => {
            // Adjust sectionTop to account for the fixed navbar
            const sectionTop = section.offsetTop - navbarHeight - 1; // -1 for slight buffer

            // Check if scroll position is within the current section's bounds
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + section.offsetHeight) {
                currentActiveSectionId = section.getAttribute('id');
            }
        });

        // Update desktop navigation links
        navLinksDesktop.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('

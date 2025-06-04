// script.js

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

    // Toggle mobile menu visibility
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Optional: prevent body scroll
    });

    // Close mobile menu when a nav link is clicked
    mobileMenuOverlay.querySelectorAll('.nav-link-mobile, .btn-primary, .btn-secondary').forEach(item => {
        item.addEventListener('click', function () {
            hamburger.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');

            // Optional: Smooth scroll to section if it's an anchor link
            const targetId = this.getAttribute('data-target') || this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    setTimeout(() => { // Give time for menu to close
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }, 400); // Match this to your mobile-menu-overlay transition duration
                }
            }
        });
    });

    // Handle active state for nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        let current = '';

        sections.forEach(section => {
            // Adjusted offset to account for fixed navbar height
            const sectionTop = section.offsetTop - (document.querySelector('.navbar').offsetHeight + 20);
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Initial highlight on load
    highlightNavLink();

    // Highlight on scroll
    window.addEventListener('scroll', highlightNavLink);

    // Smooth scroll for nav links (desktop)
    document.querySelectorAll('.navbar-menu .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Select the necessary DOM elements
    const hamburger = document.querySelector('.hamburger');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMobileMenu = document.querySelector('.close-mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
    const body = document.body; // To control body scrolling

    // Function to open the mobile menu
    function openMobileMenu() {
        mobileMenuOverlay.classList.add('active');
        body.classList.add('overflow-hidden'); // Prevent scrolling on the body
    }

    // Function to close the mobile menu
    function closeMobileMenuFn() {
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('overflow-hidden'); // Allow scrolling on the body
    }

    // Event listener for the hamburger icon to open the menu
    if (hamburger) {
        hamburger.addEventListener('click', openMobileMenu);
    }

    // Event listener for the close button inside the mobile menu
    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', closeMobileMenuFn);
    }

    // Event listeners for each mobile navigation link to close the menu on click
    if (mobileNavLinks.length > 0) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenuFn);
        });
    }

    // Optional: Close menu if user clicks outside the menu (e.g., if you add a backdrop)
    // For a full-screen overlay like yours, this is less critical as the close button handles it.
});

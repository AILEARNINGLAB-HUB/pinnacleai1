// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Select necessary DOM elements
    const hamburger = document.querySelector('.hamburger');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMobileMenu = document.querySelector('.close-mobile-menu');
    // Select all mobile navigation links, including the "AI PROGRAMS" and "Learn AI for Free" buttons
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile, .btn-secondary-mobile, .btn-primary-mobile');
    const body = document.body; // To control body scrolling

    // ----- Mobile Menu Logic -----
    // Function to open/close the mobile menu and manage body scroll
    function toggleMobileMenu() {
        mobileMenuOverlay.classList.toggle('active'); // Toggles the overlay visibility
        body.classList.toggle('overflow-hidden');     // Prevents/allows body scrolling
        hamburger.classList.toggle('active');         // Toggles hamburger icon animation (if CSS defined)
    }

    // Event listener for the hamburger icon to open the menu
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Event listener for the close button inside the mobile menu
    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', toggleMobileMenu);
    }

    // Event listeners for each mobile navigation link/button to close the menu on click
    if (mobileNavLinks.length > 0) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('data-target') || this.getAttribute('href');
                const isAnchorLink = targetId && targetId.startsWith('#');

                // Close the menu immediately
                toggleMobileMenu();

                // If it's an internal anchor link, handle smooth scrolling after menu closes
                if (isAnchorLink) {
                    e.preventDefault(); // Prevent default jump for anchor links

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Give a small delay for the menu to visually start closing before scrolling
                        setTimeout(() => {
                            const navbarHeight = document.querySelector('.navbar').offsetHeight;
                            const offsetPosition = targetElement.offsetTop - navbarHeight;
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }, 400); // Match this to your mobile-menu-overlay transition duration in style.css
                    }
                }
                // For non-anchor links (like programs.html or "Learn AI for Free"),
                // the browser will naturally follow the href after the menu closes.
                // No e.preventDefault() is needed for these cases, allowing them to function as intended.
            });
        });
    }

    // ----- Desktop Navigation & Section Highlighting Logic -----
    // Select sections and desktop nav links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link'); // Desktop nav links

    function highlightNavLink() {
        let current = '';

        sections.forEach(section => {
            // Adjusted offset to account for fixed navbar height and a small buffer
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const sectionTop = section.offsetTop - (navbarHeight + 20); // 20px buffer

            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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

    // Smooth scroll for desktop nav links
    document.querySelectorAll('.navbar-menu .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default instant jump

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
Use code with caution.
JavaScript
Key Changes and Explanations:
Removed Duplication: The most critical change is removing the redundant DOMContentLoaded block. All the logic is now within a single, coherent structure.
Unified toggleMobileMenu Function: A single toggleMobileMenu() function now handles adding/removing the active class from the mobileMenuOverlay, the overflow-hidden class from the body, and also the active class from the hamburger icon.
closeMobileMenu Button Integration: The closeMobileMenu button now correctly uses the toggleMobileMenu function to close the menu.
Corrected Mobile Button Selectors: The mobileNavLinks selector has been corrected to include the correct classes for your mobile buttons: .btn-secondary-mobile and .btn-primary-mobile.
Refined Mobile Link Behavior:
For internal anchor links (e.g., #home, #services):
The menu closes immediately.
e.preventDefault() is called to stop the default jump.
A setTimeout handles smooth scrolling to the target section after a short delay (400ms) to allow the menu close animation to begin, providing a very polished user experience.
For external links (e.g., programs.html) or href="#" for the "Learn AI for Free" button:
The menu closes immediately.
e.preventDefault() is not called, allowing the browser to naturally follow the link's href (e.g., opening a new tab for programs.html).
Hamburger Icon Animation: The hamburger.classList.toggle('active') line is now included. If you have CSS rules like .hamburger.active span:nth-child(1) etc., this will make your hamburger icon transform (e.g., into an 'X') when the menu is open, and revert when closed.
Consistency: Ensured overflow-hidden is consistently used for body scroll lock.
Crucial Next Steps:
Replace script.js: Please update your script.js file with the entire consolidated code provided above.
Verify overflow-hidden CSS: Confirm that you have the following CSS rule in your style.css (if not already handled by Tailwind):
/* In your style.css */
body.overflow-hidden {
    overflow: hidden;
}
Use code with caution.
Css
Define .hamburger.active CSS (Optional but Recommended): To make the hamburger icon animate when clicked, you'll need CSS rules for .hamburger.active. If you don't have them yet, here's a common example you can add to your style.css:
/* style.css */

/* Basic hamburger styling (if not already there) */
.hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
    cursor: pointer;
    z-index: 60; /* Ensure it's above the overlay */
}

.hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #fff; /* White bars */
    transition: all 0.3s ease-in-out;
}

/* Hamburger active state - transforms into an X */
.hamburger.active span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
}

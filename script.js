document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.close-mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link'); // Desktop links
    const mobileLinks = document.querySelectorAll('.nav-link-mobile'); // Mobile links
    const sections = document.querySelectorAll('section'); // All sections for active link highlighting

    // --- Mobile Menu Toggle ---
    function openMenu() {
        mobileMenu.classList.add('active');
        hamburger.classList.add('active'); // Add active class to hamburger for animation
        document.body.style.overflow = 'hidden'; // Prevent scrolling when mobile menu is open
    }
    function closeMenu() {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active'); // Remove active class from hamburger
        document.body.style.overflow = ''; // Restore scrolling
    }

    hamburger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    // Close mobile menu when a mobile link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if it's an internal anchor link
            if (this.getAttribute('href').startsWith('#')) {
                // Prevent default hash jump to allow smooth scroll
                e.preventDefault(); 
                // Smooth scroll to the section
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
                // Close menu after scrolling
                closeMenu();
            } else {
                // For external links or links to other HTML files, just close the menu
                closeMenu();
            }
        });
    });

    // Close menu on outside click of the overlay itself
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });

    // --- Active Navbar Link Highlighting ---
    function updateActiveNavLink() {
        let currentActiveSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for fixed navbar
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActiveSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActiveSection)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Call on load to set initial active link

    // --- Scroll-Triggered Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Smooth Scroll for internal links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Exclude the hero buttons as they have their own click handlers already
        if (!anchor.classList.contains('btn-primary-hero') && !anchor.classList.contains('btn-outline-hero')) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    });

    // --- Number Counter for Stats (Optional) ---
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the speed, the faster the count

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText.replace('+', '').replace('%', ''); // Clean text for parsing
                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment) + (counter.classList.contains('percent') ? '%' : '+');
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target + (counter.classList.contains('percent') ? '%' : '+');
                    }
                };

                // Set initial data-target attributes
                if (counter.innerText.includes('+')) {
                    counter.setAttribute('data-target', counter.innerText.replace('+', ''));
                    counter.innerText = '0+';
                } else if (counter.innerText.includes('%')) {
                    counter.setAttribute('data-target', counter.innerText.replace('%', ''));
                    counter.innerText = '0%';
                    counter.classList.add('percent'); // Add class to distinguish percent
                }
                
                updateCount();
                observer.unobserve(entry.target); // Stop observing after counting
            }
        });
    }, { threshold: 0.7 }); // Trigger when 70% of the counter is visible

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

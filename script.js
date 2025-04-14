document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero'); // Or another reference point

    // Determine the offset. Use hero section's bottom or a fixed value.
    const stickyOffset = heroSection ? heroSection.offsetTop + 50 : 200; // Add a buffer

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > stickyOffset) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggler = document.getElementById('menu-toggler');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggler && navMenu) {
        menuToggler.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Optional: Change toggler icon (e.g., bars to times)
            const icon = menuToggler.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                 // Optional: Prevent body scroll when menu is open
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = ''; // Restore scroll
            }
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                 if (navMenu.classList.contains('active')) {
                     navMenu.classList.remove('active');
                     menuToggler.querySelector('i').classList.remove('fa-times');
                     menuToggler.querySelector('i').classList.add('fa-bars');
                     document.body.style.overflow = ''; // Restore scroll
                 }
            });
        });
    }


    // --- Smooth Scroll & Active Link Highlighting ---
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const sections = document.querySelectorAll('section[id]'); // Get all sections with IDs

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset considering the fixed navbar height
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                 // Close mobile menu if open after clicking a link (handled above already)
            }
        });
    });

     // Highlight active nav link on scroll
     window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        const navbarHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50; // Adjust offset as needed
             const sectionHeight = section.offsetHeight;
             // Check if current scroll position is within this section
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                 current = section.getAttribute('id');
             }
        });

         // Add active class to the corresponding nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        // Handle hero section separately if needed (no section tag often)
         const heroLink = document.querySelector('.nav-menu a[href="#hero"]');
         if (heroLink && scrollY < (heroSection.offsetHeight - navbarHeight - 50)) {
             navLinks.forEach(l => l.classList.remove('active'));
             heroLink.classList.add('active');
         } else if (heroLink) {
              // Ensure hero link is not active if another section is active
             if (!current && scrollY >= (heroSection.offsetHeight - navbarHeight - 50)) {
                 heroLink.classList.remove('active');
             }
         }
    });


    // --- Typing Effect ---
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const textToType = typingElement.getAttribute('data-text');
        let index = 0;
        let isDeleting = false;
        let delay = 150; // Typing speed

        function type() {
            const currentText = textToType.substring(0, index);
            typingElement.textContent = currentText;
            typingElement.style.width = `${currentText.length}ch`; // Adjust width for cursor

            if (!isDeleting && index < textToType.length) {
                // Typing forward
                index++;
                delay = 150 - Math.random() * 50; // Slightly randomize speed
            } else if (isDeleting && index > 0) {
                // Deleting
                index--;
                delay = 80;
            } else {
                // Switch direction or pause at end/start
                isDeleting = !isDeleting;
                 delay = isDeleting ? 1500 : 500; // Pause before deleting/retyping
                 if (!isDeleting) {
                    // Reset index for next word if you have multiple words logic
                 }
            }

            setTimeout(type, delay);
        }
        // Start typing after a small delay
        setTimeout(type, 1000);
    }


    // --- Scroll Animations using Intersection Observer ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
            // Optional: Remove class to re-animate when scrolling up
            // else {
            //     entry.target.classList.remove('is-visible');
            // }
        });
    }, {
        root: null,
        threshold: 0.1, // 10% visible
        // rootMargin: '0px 0px -50px 0px' // Trigger 50px earlier
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });


     // --- Update Footer Year ---
     const yearSpan = document.getElementById('current-year');
     if (yearSpan) {
         yearSpan.textContent = new Date().getFullYear();
     }

    console.log("Enhanced Portfolio script loaded successfully!");

}); // End DOMContentLoaded
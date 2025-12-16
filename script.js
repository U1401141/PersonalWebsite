document.addEventListener('DOMContentLoaded', () => {
    
    // Select all links in the sidebar that point to an ID
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Only strictly handle if it's an ID selector
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // 1. Find and open the parent <details> if it exists
                    const parentDetails = targetElement.closest('details');
                    if (parentDetails) {
                        parentDetails.open = true;
                    }

                    // 2. Smooth Scroll to the element
                    // specific offset can be handled via CSS scroll-margin-top if needed, 
                    // but block: 'start' usually works well.
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start'
                    });

                    // Optional: Update URL without jumping
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        // Toggle Sidebar on Hamburger Click
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Close Sidebar when a link is clicked (Mobile UX)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    sidebar.classList.remove('active');
                }
            });
        });

        // Close Sidebar when clicking outside (Optional but good UX)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 900 && 
                sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }

});
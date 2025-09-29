 
        const cursorFollower = document.getElementById('cursorFollower');
        const trails = [];
        const trailCount = 8;

        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
            trails.push({ element: trail, x: 0, y: 0 });
        }

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            cursorFollower.style.left = cursorX - 10 + 'px';
            cursorFollower.style.top = cursorY - 10 + 'px';

            trails.forEach((trail, index) => {
                const nextTrail = trails[index - 1] || { x: cursorX, y: cursorY };
                
                trail.x += (nextTrail.x - trail.x) * 0.3;
                trail.y += (nextTrail.y - trail.y) * 0.3;
                
                trail.element.style.left = trail.x - 4 + 'px';
                trail.element.style.top = trail.y - 4 + 'px';
                trail.element.style.opacity = (trailCount - index) / trailCount * 0.5;
            });

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        const interactiveElements = document.querySelectorAll('a, button, .skill-item, .card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'scale(1)';
            });
        });

        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card, .skills-category').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
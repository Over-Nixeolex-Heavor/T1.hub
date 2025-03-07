document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Copy code functionality for all copy buttons
    const copyButtons = document.querySelectorAll('.copy-button');
    
    copyButtons.forEach(copyButton => {
        copyButton.addEventListener('click', async () => {
            try {
                const codeText = copyButton.previousElementSibling;
                await navigator.clipboard.writeText(codeText.value);
                
                // Save original text
                const originalText = copyButton.textContent;
                
                // Visual feedback
                copyButton.textContent = '✓ Скопировано!';
                copyButton.classList.add('copied');
                copyButton.style.pointerEvents = 'none';
                
                // Reset button after delay
                setTimeout(() => {
                    copyButton.textContent = originalText;
                    copyButton.classList.remove('copied');
                    copyButton.style.pointerEvents = 'auto';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                copyButton.textContent = '✗ Ошибка';
                setTimeout(() => {
                    copyButton.textContent = 'Copy Code';
                }, 2000);
            }
        });
    });

    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(card);
    });

    // Add smooth reveal animation for all sections
    const revealSections = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        revealObserver.observe(section);
    });

    // Add class for animation
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal-section');
    });

    // Add hover effect to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
        
            card.style.setProperty('--mouse-x', ${x}px);
            card.style.setProperty('--mouse-y', ${y}px);
        });
    });
});

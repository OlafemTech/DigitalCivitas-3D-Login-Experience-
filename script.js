function createFloatingNumber() {
    const numbers = document.querySelector('.floating-numbers');
    const number = document.createElement('div');
    number.classList.add('floating-number');
    
    // Random binary number (0 or 1) or random number between 0-9 (30% chance)
    const isBinary = Math.random() > 0.3;
    number.textContent = isBinary ? Math.round(Math.random()) : Math.floor(Math.random() * 10);
    
    // Random position across the entire viewport
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    
    // Random size between 10px and 30px
    const size = 10 + Math.random() * 20;
    
    // Random opacity between 0.1 and 0.4
    const opacity = 0.1 + Math.random() * 0.3;
    
    // Random animation duration between 3 and 8 seconds
    const duration = 3 + Math.random() * 5;
    
    // Random initial rotation
    const rotation = Math.random() * 360;
    
    // Random movement pattern
    const moveX = -50 + Math.random() * 100; // moves left or right randomly
    
    number.style.cssText = `
        position: fixed;
        left: ${left}vw;
        top: ${top}vh;
        font-size: ${size}px;
        font-family: 'Courier New', monospace;
        color: rgba(79, 70, 229, ${opacity});
        animation: floatAround ${duration}s linear infinite;
        transform: rotate(${rotation}deg);
        z-index: 0;
        --moveX: ${moveX}px;
    `;
    
    numbers.appendChild(number);
    
    // Remove the number after some time to prevent too many elements
    setTimeout(() => {
        number.remove();
    }, duration * 1000);
}

// Create new numbers more frequently
setInterval(createFloatingNumber, 200);

// Add more initial numbers
for(let i = 0; i < 30; i++) {
    setTimeout(createFloatingNumber, i * 100);
}

// Add mousemove effect to make numbers react to cursor
document.addEventListener('mousemove', (e) => {
    const numbers = document.querySelectorAll('.floating-number');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    numbers.forEach(number => {
        const rect = number.getBoundingClientRect();
        const numberX = rect.left + rect.width / 2;
        const numberY = rect.top + rect.height / 2;
        
        const distanceX = mouseX - numberX;
        const distanceY = mouseY - numberY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 100) {
            const angle = Math.atan2(distanceY, distanceX);
            const force = (100 - distance) / 10;
            
            number.style.transform = `translate(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px) rotate(${Math.random() * 360}deg)`;
        }
    });
});

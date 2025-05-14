document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeSelect = document.getElementById('theme');
    const animationSelect = document.getElementById('animation');
    const savePrefsBtn = document.getElementById('savePrefs');
    const prefsSavedMsg = document.getElementById('prefsSaved');
    const animatedBox = document.getElementById('animatedBox');
    const triggerAnimationBtn = document.getElementById('triggerAnimation');
    const visitCountElement = document.getElementById('visitCount');
    
    // Load saved preferences
    loadPreferences();
    
    // Initialize visit counter
    initializeVisitCounter();
    
    // Event Listeners
    savePrefsBtn.addEventListener('click', savePreferences);
    triggerAnimationBtn.addEventListener('click', playAnimation);
    
    // Theme change handler
    themeSelect.addEventListener('change', function() {
        applyTheme(this.value);
    });
    
    // Animation change handler
    animationSelect.addEventListener('change', function() {
        animatedBox.textContent = this.value.toUpperCase();
    });
    
    // Functions
    function loadPreferences() {
        // Load theme preference
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) {
            themeSelect.value = savedTheme;
            applyTheme(savedTheme);
        }
        
        // Load animation preference
        const savedAnimation = localStorage.getItem('animationPreference');
        if (savedAnimation) {
            animationSelect.value = savedAnimation;
            animatedBox.textContent = savedAnimation.toUpperCase();
        }
    }
    
    function savePreferences() {
        // Save theme preference
        localStorage.setItem('themePreference', themeSelect.value);
        
        // Save animation preference
        localStorage.setItem('animationPreference', animationSelect.value);
        
        // Show confirmation message
        prefsSavedMsg.style.display = 'block';
        setTimeout(() => {
            prefsSavedMsg.style.display = 'none';
        }, 2000);
        
        // Apply the selected theme immediately
        applyTheme(themeSelect.value);
    }
    
    function applyTheme(theme) {
        // Remove all theme classes
        document.body.classList.remove('light', 'dark', 'blue', 'green');
        
        // Add the selected theme class
        if (theme) {
            document.body.classList.add(theme);
        }
    }
    
    function playAnimation() {
        // Remove any existing animation classes
        animatedBox.classList.remove('bounce', 'spin', 'pulse', 'shake');
        
        // Add the selected animation class
        const selectedAnimation = animationSelect.value;
        animatedBox.classList.add(selectedAnimation);
        
        // Change box color during animation
        animatedBox.style.backgroundColor = getRandomColor();
    }
    
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    function initializeVisitCounter() {
        let visitCount = localStorage.getItem('visitCount');
        
        if (!visitCount) {
            visitCount = 1;
        } else {
            visitCount = parseInt(visitCount) + 1;
        }
        
        localStorage.setItem('visitCount', visitCount);
        visitCountElement.textContent = visitCount;
        
        // Special animation for first visit
        if (visitCount === 1) {
            animatedBox.classList.add('pulse');
            animatedBox.textContent = 'WELCOME!';
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById("blink-image");
    const sound = document.getElementById("squeak-sound");

    img.addEventListener("click", () => {
        // Reset the audio to the start so it plays even if clicked rapidly
        sound.currentTime = 0;
        sound.play();

        // Remove the class if it's already there to allow rapid clicks
        img.classList.remove("squish");
        
        // This line triggers a "reflow", tricking the browser into restarting the animation
        void img.offsetWidth; 
        
        // Add the class back to play the animation
        img.classList.add("squish");
    });
});

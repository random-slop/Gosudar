(() => {
    const slides = Array.from(document.querySelectorAll(".slide"));
    const counter = document.getElementById("counter");
    const btnNext = document.getElementById("btn-next");
    const btnPrev = document.getElementById("btn-prev");
    const slider = document.getElementById("slider");

    // Progress bar
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    slider.appendChild(progressBar);

    let current = 0;
    let isAnimating = false;

    function pad(n) {
        return String(n).padStart(2, "0");
    }

    function updateCounter() {
        counter.textContent = `${pad(current + 1)} / ${pad(slides.length)}`;
        progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;
    }

    function goTo(index) {
        if (isAnimating || index === current) return;
        isAnimating = true;

        const prev = slides[current];
        const next = slides[index];

        prev.classList.add("leaving");

        prev.addEventListener(
            "animationend",
            () => {
                prev.classList.remove("active", "leaving");
                next.classList.add("active");
                current = index;
                updateCounter();
                isAnimating = false;
            },
            { once: true }
        );
    }

    function next() {
        goTo((current + 1) % slides.length);
    }

    function prev() {
        goTo((current - 1 + slides.length) % slides.length);
    }

    btnNext.addEventListener("click", next);
    btnPrev.addEventListener("click", prev);

    // Keyboard
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
    });

    // Touch/swipe
    let touchStartX = 0;

    slider.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", (e) => {
        const delta = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 50) {
            delta > 0 ? next() : prev();
        }
    });

    updateCounter();
})();
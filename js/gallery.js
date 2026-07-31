const slides1 = document.getElementById('slides1');
const slideCount = slides1.children.length;
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dotsContainer = document.getElementById('dots');
let currentIndex = 0;

// Create dots
for(let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if(i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}
const dots = dotsContainer.querySelectorAll('.dot');

// Show caption animation for current slide
function showCaption(index) {
    slides1.querySelectorAll('.caption').forEach((cap, i) => {
        cap.classList.remove('show');
        if(i === index) {
            setTimeout(() => cap.classList.add('show'), 200);
        }
    });
}

// КОРИГИРАНА ФУНКЦИЯ: Използва проценти (%) вместо твърди пиксели (px)
function updateSlider() {
    slides1.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');

    // НАДГРАЖДАНЕ: Управляваме анимацията на сянката/блясъка при смяна
    const allSlides = slides1.querySelectorAll('.slide-g');
    allSlides.forEach((slide, i) => {
        slide.classList.remove('active-shine'); // Премахваме стария ефект
        if(i === currentIndex) {
            // Малък таймаут, за да се рестартира анимацията чисто при всеки нов слайд
            setTimeout(() => slide.classList.add('active-shine'), 50);
        }
    });

    showCaption(currentIndex);
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoSlide();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
    resetAutoSlide();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

// Auto slide every 5 seconds
let autoSlideInterval = setInterval(nextSlide, 5000);

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
}

updateSlider();

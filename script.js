// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.className = 'fa-solid fa-bars text-2xl';
    } else {
        menuIcon.className = 'fa-solid fa-xmark text-2xl';
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.className = 'fa-solid fa-bars text-2xl';
    });
});

// Testimonial Carousel Data & Logic
const testimonials = [
    {
        quote: "Nafiur delivered our backend FastAPI endpoints with exceptional speed and precision. His code is clean, robust, and well-structured!",
        author: "Alex Morgan",
        role: "Senior Full-Stack Engineer"
    },
    {
        quote: "Working with Md Nafiur Rahman was seamless. He designed a clear dataset cleaning script that saved our team dozens of hours.",
        author: "Sarah Jenkins",
        role: "Data Lead & Project Director"
    },
    {
        quote: "Great attention to detail! His React component architecture and responsive design skill made our project look world-class.",
        author: "David Chen",
        role: "Product Designer"
    }
];

let currentTestimonial = 0;
const quoteEl = document.getElementById('testimonial-quote');
const authorEl = document.getElementById('testimonial-author');
const roleEl = document.getElementById('testimonial-role');
const dots = document.querySelectorAll('#carousel-dots .dot');

function updateTestimonial(index) {
    currentTestimonial = index;
    quoteEl.innerText = `"${testimonials[index].quote}"`;
    authorEl.innerText = testimonials[index].author;
    roleEl.innerText = testimonials[index].role;

    dots.forEach((dot, i) => {
        if (i === index) {
            dot.className = 'dot w-2.5 h-2.5 rounded-full bg-cyan-400 cursor-pointer';
        } else {
            dot.className = 'dot w-2.5 h-2.5 rounded-full bg-gray-700 cursor-pointer';
        }
    });
}

document.getElementById('next-testimonial').addEventListener('click', () => {
    let nextIndex = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(nextIndex);
});

document.getElementById('prev-testimonial').addEventListener('click', () => {
    let prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(prevIndex);
});

dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => updateTestimonial(idx));
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.classList.remove('hidden');
    contactForm.reset();
    setTimeout(() => {
        formStatus.classList.add('hidden');
    }, 5000);
});

// Resume Download Trigger
document.getElementById('download-resume-btn').addEventListener('click', () => {
    const dummyContent = "Md Nafiur Rahman - Full-Stack Web Developer Resume\nEmail: nafiur@example.com\nGitHub: https://github.com/Nafiur71\nTech Stack: Python, FastAPI, React, SQL, Tailwind CSS";
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Md_Nafiur_Rahman_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});

// Demo Modal Triggers
function openDemoModal(title) {
    document.getElementById('modal-project-title').innerText = title;
    document.getElementById('demo-modal').classList.remove('hidden');
}

function closeDemoModal() {
    document.getElementById('demo-modal').classList.add('hidden');
}

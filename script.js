// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (menuIcon) {
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.className = 'fa-solid fa-bars text-2xl';
            } else {
                menuIcon.className = 'fa-solid fa-xmark text-2xl';
            }
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            if (menuIcon) {
                menuIcon.className = 'fa-solid fa-bars text-2xl';
            }
        });
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-xs"></i> <span>Sending...</span>';
        }

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                if (formStatus) {
                    formStatus.className = 'text-center text-sm font-medium py-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/50';
                    formStatus.innerText = 'Message sent successfully! I will get back to you soon.';
                    formStatus.classList.remove('hidden');
                }
                contactForm.reset();
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (error) {
            if (formStatus) {
                formStatus.className = 'text-center text-sm font-medium py-2 rounded-lg bg-red-950/60 text-red-400 border border-red-800/50';
                formStatus.innerText = 'Oops! Failed to send. Please email directly to nafiurrahman946@gmail.com';
                formStatus.classList.remove('hidden');
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }
            setTimeout(() => {
                if (formStatus) formStatus.classList.add('hidden');
            }, 6000);
        }
    });
}

// Resume Download Trigger
const downloadResumeBtn = document.getElementById('download-resume-btn');
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
        const dummyContent = "Md Nafiur Rahman - Full-Stack Web Developer Resume\nEmail: nafiurrahman946@gmail.com\nGitHub: https://github.com/Nafiur71\nTech Stack: Next.js, React 19, TypeScript, Python, FastAPI, Tailwind CSS";
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
}

// Demo Modal Triggers
function openDemoModal(title) {
    const modalTitle = document.getElementById('modal-project-title');
    const demoModal = document.getElementById('demo-modal');
    if (modalTitle) modalTitle.innerText = title;
    if (demoModal) demoModal.classList.remove('hidden');
}

function closeDemoModal() {
    const demoModal = document.getElementById('demo-modal');
    if (demoModal) demoModal.classList.add('hidden');
}

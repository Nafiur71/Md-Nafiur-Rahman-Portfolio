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

// ==========================================
// 1. Spotlight Cursor Glow Tracking (Linear / Vercel style)
// ==========================================
const spotlightCards = document.querySelectorAll('.spotlight-card');
spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ==========================================
// 2. Interactive Project Category Filtering
// ==========================================
const filterBtns = document.querySelectorAll('.project-filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('is-hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(8px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 30);
            } else {
                card.classList.add('is-hidden');
            }
        });
    });
});

// ==========================================
// 3. One-Click Copy Email & Floating Toast
// ==========================================
let toastTimer = null;
function showToast(title = 'Email Copied to Clipboard!', message = 'nafiurrahman946@gmail.com') {
    const toast = document.getElementById('toast-notification');
    const titleEl = document.getElementById('toast-title');
    const msgEl = document.getElementById('toast-message');
    if (!toast) return;

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;

    toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    }, 3200);
}

const copyEmailButtons = document.querySelectorAll('.copy-email-btn');
copyEmailButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = btn.getAttribute('data-copy-email') || 'nafiurrahman946@gmail.com';
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(email);
            } else {
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            }
            showToast('Email Copied to Clipboard!', email);
        } catch (err) {
            showToast('Contact Email:', email);
        }
    });
});

// ==========================================
// 4. Scroll Progress Bar & Active Nav Tracker
// ==========================================
const scrollProgressBar = document.getElementById('scroll-progress-bar');
const navLinks = document.querySelectorAll('#desktop-nav .nav-link');
const trackedSections = document.querySelectorAll('section[id]');

function updateScrollAndNav() {
    // Scroll progress bar
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollProgressBar && height > 0) {
        const scrolled = (winScroll / height) * 100;
        scrollProgressBar.style.width = `${scrolled}%`;
    }

    // Active Section Indicator in Navbar
    let currentSectionId = '';
    const scrollPos = window.scrollY + 180;

    trackedSections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
            currentSectionId = section.getAttribute('id');
        }
    });

    if (currentSectionId) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

window.addEventListener('scroll', updateScrollAndNav, { passive: true });
updateScrollAndNav(); // Initial execution

// ==========================================
// 5. Command Palette (Ctrl+K / Cmd+K Modal)
// ==========================================
const commandPalette = document.getElementById('command-palette');
const commandPaletteContent = document.getElementById('command-palette-content');
const commandPaletteInput = document.getElementById('command-palette-input');
const commandPaletteTrigger = document.getElementById('command-palette-trigger');
const mobileCommandTrigger = document.getElementById('mobile-command-trigger');
const closePaletteBadge = document.getElementById('close-palette-badge');
const commandItems = document.querySelectorAll('.command-item');
let selectedIndex = 0;

function getVisibleCommandItems() {
    return Array.from(commandItems).filter(item => !item.classList.contains('is-hidden'));
}

function updateSelectedCommandItem() {
    const visible = getVisibleCommandItems();
    commandItems.forEach(item => item.classList.remove('selected'));
    if (visible.length > 0) {
        if (selectedIndex >= visible.length) selectedIndex = 0;
        if (selectedIndex < 0) selectedIndex = visible.length - 1;
        visible[selectedIndex].classList.add('selected');
        visible[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
}

function openCommandPalette() {
    if (!commandPalette) return;
    commandPalette.classList.remove('hidden');
    setTimeout(() => {
        if (commandPaletteContent) {
            commandPaletteContent.classList.remove('scale-95', 'opacity-0');
            commandPaletteContent.classList.add('scale-100', 'opacity-100');
        }
    }, 10);
    if (commandPaletteInput) {
        commandPaletteInput.value = '';
        filterCommands('');
        commandPaletteInput.focus();
    }
    selectedIndex = 0;
    updateSelectedCommandItem();
}

function closeCommandPalette() {
    if (!commandPalette) return;
    if (commandPaletteContent) {
        commandPaletteContent.classList.remove('scale-100', 'opacity-100');
        commandPaletteContent.classList.add('scale-95', 'opacity-0');
    }
    setTimeout(() => {
        commandPalette.classList.add('hidden');
    }, 150);
}

function executeCommand(item) {
    if (!item) return;
    const action = item.getAttribute('data-action');
    closeCommandPalette();

    if (action === 'navigate') {
        const target = item.getAttribute('data-target');
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'link') {
        const url = item.getAttribute('data-url');
        if (url) window.open(url, '_blank');
    } else if (action === 'demo') {
        const target = item.getAttribute('data-target');
        openDemoModal(target);
    } else if (action === 'resume') {
        if (downloadResumeBtn) downloadResumeBtn.click();
    } else if (action === 'copy-email') {
        const email = 'nafiurrahman946@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            showToast('Email Copied to Clipboard!', email);
        });
    }
}

function filterCommands(query) {
    const q = query.toLowerCase().trim();
    commandItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (!q || text.includes(q)) {
            item.classList.remove('is-hidden');
        } else {
            item.classList.add('is-hidden');
        }
    });

    document.querySelectorAll('.command-group').forEach(group => {
        const items = group.querySelectorAll('.command-item');
        const hasVisible = Array.from(items).some(it => !it.classList.contains('is-hidden'));
        const title = group.querySelector('.command-group-title');
        if (title) {
            if (hasVisible) {
                title.classList.remove('is-hidden');
            } else {
                title.classList.add('is-hidden');
            }
        }
    });

    selectedIndex = 0;
    updateSelectedCommandItem();
}

if (commandPaletteTrigger) commandPaletteTrigger.addEventListener('click', openCommandPalette);
if (mobileCommandTrigger) mobileCommandTrigger.addEventListener('click', openCommandPalette);
if (closePaletteBadge) closePaletteBadge.addEventListener('click', closeCommandPalette);

if (commandPalette) {
    commandPalette.addEventListener('click', (e) => {
        if (e.target === commandPalette) closeCommandPalette();
    });
}

if (commandPaletteInput) {
    commandPaletteInput.addEventListener('input', (e) => {
        filterCommands(e.target.value);
    });

    commandPaletteInput.addEventListener('keydown', (e) => {
        const visible = getVisibleCommandItems();
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % (visible.length || 1);
            updateSelectedCommandItem();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + (visible.length || 1)) % (visible.length || 1);
            updateSelectedCommandItem();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (visible[selectedIndex]) {
                executeCommand(visible[selectedIndex]);
            }
        } else if (e.key === 'Escape') {
            closeCommandPalette();
        }
    });
}

commandItems.forEach(item => {
    item.addEventListener('click', () => executeCommand(item));
});

// Global shortcut: Ctrl+K or Cmd+K
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (commandPalette && commandPalette.classList.contains('hidden')) {
            openCommandPalette();
        } else {
            closeCommandPalette();
        }
    } else if (e.key === 'Escape' && commandPalette && !commandPalette.classList.contains('hidden')) {
        closeCommandPalette();
    }
});



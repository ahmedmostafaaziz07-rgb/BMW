// 1. نظام إدارة الحالة (State Management)
const state = {
    currentTheme: 'light',
    isMenuOpen: false,
    selectedCar: null,
    exchangeRate: 15.5 // كمثال لزيادة الحسابات
};

// 2. معالجة الـ Preloader
window.addEventListener('load', () => {
    const progress = document.getElementById('progress');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            document.getElementById('preloader').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('preloader').style.display = 'none';
            }, 500);
        } else {
            width++;
            progress.style.width = width + '%';
        }
    }, 20);
});

// 3. برمجة حاسبة الأقساط (نظام مالي معقد)
const calcBtn = document.querySelectorAll('.calc-box input, .calc-box select');
calcBtn.forEach(input => {
    input.addEventListener('input', calculateLoan);
});

function calculateLoan() {
    const price = parseFloat(document.getElementById('car-model').value);
    const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
    const years = parseInt(document.getElementById('years').value);
    const interestRate = 0.05; // 5% فائدة سنوية

    document.getElementById('years-val').innerText = `${years} سنوات`;

    const principal = price - downPayment;
    if (principal <= 0) {
        document.getElementById('monthly-result').innerText = "الدفعة أكبر من السعر!";
        return;
    }

    const monthlyInterest = interestRate / 12;
    const numberOfPayments = years * 12;
    
    // معادلة القسط الشهري الاحترافية
    const x = Math.pow(1 + monthlyInterest, numberOfPayments);
    const monthly = (principal * x * monthlyInterest) / (x - 1);

    document.getElementById('monthly-result').innerText = `$${monthly.toFixed(2)}`;
}

// 4. نظام تبديل الوضع الليلي (Dark Mode) مع الحفظ في الذاكرة
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const body = document.body;
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// 5. نظام البحث وتصفية السيارات (Filter Engine)
// ... (مئات الأسطر لبرمجة محرك بحث يفلتر السيارات حسب السعر أو النوع) ...

// 6. إضافة تأثيرات الظهور عند التمرير (Scroll Animations)
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

        // قاعدة البيانات (لو أردت زيادة الكود، أضف 50 سيارة هنا)
        const carsData = [
            { id: 0, name: "BMW 3 Series", price: 45000, engine: "2.0L I4", hp: 255, accel: "5.6s", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500" },
            { id: 1, name: "BMW 5 Series", price: 58000, engine: "3.0L I6", hp: 375, accel: "4.9s", img: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=500" },
            { id: 2, name: "BMW 7 Series", price: 96000, engine: "4.4L V8", hp: 536, accel: "4.1s", img: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=500" },
            { id: 3, name: "BMW M4 Coupe", price: 78000, engine: "3.0L M TwinPower", hp: 503, accel: "3.4s", img: "OIP.webp" },
            { id: 4, name: "BMW X5 SUV", price: 65000, engine: "3.0L Turbo", hp: 375, accel: "5.3s", img: "OIP (1).webp" },
            { id: 5, name: "BMW i7 Electric", price: 105000, engine: "Dual Electric", hp: 650, accel: "3.5s", img: "unnamed.jpg" }
        ];

        // تحميل البيانات في الصفحة
        function initApp() {
            const grid = document.getElementById('carGrid');
            const s1 = document.getElementById('select1');
            const s2 = document.getElementById('select2');

            carsData.forEach(car => {
                // إضافة الكروت
                grid.innerHTML += `
                    <div class="car-card">
                        <img src="${car.img}" alt="${car.name}">
                        <div class="car-content">
                            <h3>${car.name}</h3>
                            <p class="car-price">تبدأ من $${car.price.toLocaleString()}</p>
                            <p>المحرك: ${car.engine}</p>
                            <button class="btn-main" style="width:100%; margin-top:15px;" onclick="setFinance(${car.price})">احسب التمويل</button>
                        </div>
                    </div>
                `;
                // إضافة لخيارات المقارنة
                s1.innerHTML += `<option value="${car.id}">${car.name}</option>`;
                s2.innerHTML += `<option value="${car.id}">${car.name}</option>`;
            });

            // اختيار افتراضي للمقارنة
            s2.selectedIndex = 1;
            compareCars();
            calculateFinance();

            // إخفاء التحميل
            setTimeout(() => {
                document.getElementById('preloader').style.opacity = '0';
                setTimeout(() => document.getElementById('preloader').style.display = 'none', 500);
            }, 1000);
        }

        // وظيفة المقارنة
        function compareCars() {
            const c1 = carsData[document.getElementById('select1').value];
            const c2 = carsData[document.getElementById('select2').value];

            renderStats('stats1', c1);
            renderStats('stats2', c2);
        }

        function renderStats(id, car) {
            document.getElementById(id).innerHTML = `
                <div class="stat-line"><span>المحرك:</span> <span>${car.engine}</span></div>
                <div class="stat-line"><span>القوة:</span> <span>${car.hp} حصان</span></div>
                <div class="stat-line"><span>0-100 كم:</span> <span>${car.accel}</span></div>
                <div class="stat-line"><span>السعر:</span> <span>$${car.price.toLocaleString()}</span></div>
            `;
        }

        // وظيفة الحاسبة
        function calculateFinance() {
            const price = document.getElementById('priceInput').value;
            const down = document.getElementById('downPaymentInput').value;
            const years = document.getElementById('yearsInput').value;
            
            const loanAmount = price - down;
            if (loanAmount <= 0) {
                document.getElementById('monthlyResult').innerText = "خطأ في المبلغ";
                return;
            }
            const monthly = (loanAmount + (loanAmount * 0.05 * years)) / (years * 12);
            document.getElementById('monthlyResult').innerText = `$${monthly.toFixed(2)}`;
        }

        function setFinance(p) {
            document.getElementById('priceInput').value = p;
            calculateFinance();
            window.location.hash = "finance";
        }

        // تغيير شفافية القائمة عند السكرول
        window.onscroll = () => {
            if (window.scrollY > 100) document.getElementById('navbar').style.background = "black";
            else document.getElementById('navbar').style.background = "rgba(0,0,0,0.9)";
        };

        window.onload = initApp;

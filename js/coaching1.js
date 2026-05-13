tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Sarabun', 'sans-serif'],
            },
        },
    },
}

const cnt = {
    en: {
        whyMeTitle: "Why me?",
        whyMeBenefits: [
            { title: "Multi-Event Specialist", desc: "Expertise across various WCA events." },
            { title: "Identify & Strengthen", desc: "Personalized analysis of your weaknesses." },
            { title: "Standardize Foundation", desc: "Refining fundamental techniques." },
            { title: "Taylor-made Advice", desc: "Custom drills for your turning style." }
        ]
    },
    th: {
        whyMeTitle: "ทำไมต้องเรียนกับผม?",
        whyMeBenefits: [
            { title: "เชี่ยวชาญหลายประเภท", desc: "มีประสบการณ์แข่ง WCA หลากหลายประเภท" },
            { title: "วิเคราะห์จุดอ่อน", desc: "วิเคราะห์และแก้ไขจุดอ่อนรายบุคคล" },
            { title: "ปรับพื้นฐานให้แน่น", desc: "เสริมสร้างเทคนิคพื้นฐานเพื่อความเร็วที่ยั่งยืน" },
            { title: "คำแนะนำเฉพาะตัว", desc: "แบบฝึกหัดที่ออกแบบมาเพื่อสไตล์การหมุนของคุณ" }
        ]
    }
};

const translations = {
    en: {
        title: "Elite Speedcubing Coaching",
        subtitle: "Master advanced methods like EO to ZB, X-cross, and Domino Reduction.",
        pricingTitle: "Coaching Options",
        bookTitle: "Reserve Your Session",
        formName: "Full Name",
        formEmail: "Email Address",
        formService: "Select Service",
        formButton: "Confirm Booking",
        paymentInstruction: "Scan QR to Pay",
        receiptLabel: "Upload Payment Receipt (Required)",
        confirmCheckbox: "I have completed the payment and uploaded the receipt.",
        sending: "Sending...",
        success: "Success! Check your email soon.",
        bookNow: "Book Now",
        services: [
            { name: "Written Critique (Video Analysis)", price: "฿120", desc: ["Detailed breakdown of 5 recorded solves.",
                                                                                "Identify strengths and inefficiencies",
                                                                                "Lookahead and turning analysis",
                                                                                "Personalized feedback and improvement guide"
                                                                                ]},
            { name: "Video Critique (Video Analysis)", price: "฿200", desc: ["Detailed breakdown of 5 recorded solves.",
                                                                                "Identify strengths and inefficiencies",
                                                                                "Lookahead and turning analysis",
                                                                                "Ergonomics suggestions",
                                                                                "Personalized feedback and improvement tips"
                                                                            ]},
            { name: "Live 1-on-1 Session (30-Min)", price: "฿250", desc: ["Interactive coaching via video call.",
                                                                            "Real-time solve analysis",
                                                                            "Personalized advice on targeted practice drills",
                                                                            ]},
            { name: "Live 1-on-1 Session (1 Hour)", price: "฿400", desc: ["Interactive coaching via video call.",
                                                                            "Real-time solve breakdown",
                                                                            "Lookahead drills tailored to your speed",
                                                                            "Deep dive into effiency and ergonomics"
                                                                            ]},
            { name: "Mastery Pack (4 Sessions)", price: "฿1,440", desc: ["Comprehensive progression with a structured 4-week training plan",
                                                                            "Weekly check in to track your progress",
                                                                            "Focus on all aspects; Algorithm, Ergonomics and Efficiencies."
                                                                            ]}
        ]
    },
    th: {
        title: "สอนรูบิกส์ระดับมืออาชีพ",
        subtitle: "ฝึกฝนเทคนิคขั้นสูง เช่น EO to ZB, X-cross และ Domino Reduction",
        pricingTitle: "แพ็กเกจการสอน",
        bookTitle: "จองเวลาเรียนของคุณ",
        formName: "ชื่อ-นามสกุล",
        formEmail: "อีเมล",
        formService: "เลือกบริการ",
        formButton: "ยืนยันการจอง",
        paymentInstruction: "สแกน QR เพื่อชำระเงิน",
        receiptLabel: "แนบหลักฐานการโอนเงิน (จำเป็น)",
        confirmCheckbox: "ฉันได้ชำระเงินและแนบหลักฐานเรียบร้อยแล้ว",
        sending: "กำลังส่ง...",
        success: "สำเร็จ! โปรดรอการติดต่อกลับทางอีเมล",
        bookNow: "จองเลย",
        services: [
            { name: "ตรวจการแก้แบบเขียน (Video Analysis)", price: "฿120", desc: ["วิเคราะห์การแก้ 5 รอบแบบละเอียด",
                                                                                "ชี้ให้เห็นจุดแข็งและจุดที่่พัฒนาได้",
                                                                                "วิเคราะห์ความสามารถในการมองล่วงหน้าและการหมุน",
                                                                                "ให้คำแนะนำและแนวทางการฝึกฝนที่เฉพาะเจาะจง"
                                                                              ] },
            { name: "ตรวจการแก้แบบวิดีโอ (Video Analysis)", price: "฿200", desc: ["วิเคราะห์การแก้ 5 รอบแบบละเอียด",
                                                                                "ชี้ให้เห็นจุดแข็งและจุดที่พัฒนาได้",
                                                                                "วิเคราะห์ความสามารถในการมองล่วงหน้าและการหมุน",
                                                                                "แนะนำวิธีการหมุนที่เสริมความคล่องตัวยิ่งขึ้น",
                                                                                "ให้คำแนะนำและแนวทางการฝึกฝนที่เฉพาะเจาะจง"
                                                                              ] },
            { name: "สอนสดตัวต่อตัว (30 นาที)", price: "฿250", desc: ["เรียนสดผ่านวิดีโอคอล",
                                                                    "วิเคราะห์การแก้โจทย์ทันที",
                                                                    "ให้คำแนะนำในการฝึกเฉพาะส่วนสำหรับคุณ"
            ] },
            { name: "สอนสดตัวต่อตัว (1 ชั่วโมง)", price: "฿400", desc: ["เรียนสดเน้นเนื้อหาเจาะลึก",
                                                                    "วิเคราะห์การแก้โจทย์ทันที",
                                                                    "ฝึกการมองล่วงหน้าตามระดับความเหมาะสม",
                                                                    "เจาะลึกประสิทธิภาพและความคล่องตัวการหมุน"
            ] },
            { name: "แพ็กเกจเชี่ยวชาญ (4 ครั้ง)", price: "฿1,440", desc: ["แผนการฝึกซ้อมต่อเนื่อง 4 สัปดาห์ เพื่อการพัฒนาที่เห็นผล",
                                                                    "ติดตามผลรายสัปดาห์เพื่อเช็คการฝึกซ้อม",
                                                                    "ให้ความสำคัญรอบด้านไม่ว่าจะเป็นสูตรที่ใช้ วิธีการหมุนที่คล่องตัว และ ประสิทธิภาพในการแก้",
            ] }
        ]
    }
};

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwwqbpCMgiHXTgaCYfqt2z3WWfIdE6AEpUcf5pvsYHh5ZMF7a5lzWJYP8W0NFjsT4B0/exec';

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
});

async function handleSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('submit-btn');
    const content = translations[window.currentLang];
    
    const serviceValue = document.getElementById('service-select').value.toLowerCase();
    const selectedDays = Array.from(document.querySelectorAll('#available-date input:checked')).map(el => el.value);
    const receiptFile = document.getElementById('receipt-upload').files[0];

    if (!serviceValue.includes('critique') && selectedDays.length === 0) {
        alert(window.currentLang === 'en' ? 'Please select at least one available day.' : 'กรุณาเลือกวันที่สะดวกอย่างน้อย 1 วัน');
        return;
    }
    
    btn.disabled = true;
    btn.innerText = content.sending;

    try {
        let base64Receipt = "";
        if (receiptFile) base64Receipt = await toBase64(receiptFile);

        const data = {
            name: document.getElementById('input-name').value,
            email: document.getElementById('input-email').value,
            service: document.getElementById('service-select').value,
            availableDate: selectedDays,
            preferredTime: document.getElementById('preferred-time').value,
            secondaryTime: document.getElementById('secondary-time').value,
            videoLink: document.getElementById('video-link').value,
            wcaEvent: document.getElementById('wca-event').value,
            receiptData: base64Receipt,
            receiptName: receiptFile ? receiptFile.name : "receipt.png"
        };

        if (serviceValue.includes('critique')) {
            data.availableDate = ""; data.preferredTime = ""; data.secondaryTime = ""; data.wcaEvent = "";
        } else {
            data.videoLink = "";
        }

        await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', 
            //cache: 'no-cache',
            //headers: { 'Content-Type': 'application/json' },
            headers: {'Content-Type': 'text/plain;charset=utf-8'},
            body: JSON.stringify(data)
        });
        
        alert(content.success);
        event.target.reset();
        toggleSubmitButton();
        document.getElementById('service-select').dispatchEvent(new Event('change'));
    } catch (error) {
        console.error('Error:', error);
        alert('Error connecting to server.');
    } finally {
        btn.innerText = content.formButton;
    }
}
function applyLang() {}

function toggleSubmitButton() {
    const checkbox = document.getElementById('confirm-payment');
    const btn = document.getElementById('submit-btn');
    btn.disabled = !checkbox.checked;
    btn.classList.toggle('opacity-50', !checkbox.checked);
    btn.classList.toggle('cursor-not-allowed', !checkbox.checked);
}

function scrollToBooking(serviceName) {
    const select = document.getElementById('service-select');
    if (select) {
        // 1. Set the dropdown value to match the clicked card
        select.value = serviceName;
        // 2. Trigger the 'change' event to show/hide the correct form groups
        select.dispatchEvent(new Event('change'));
    }

    // 3. Smoothly scroll to the booking section
    const bookSection = document.getElementById('book');
    if (bookSection) {
        bookSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function render() {
    const c = cnt[window.currentLang];
    const trans = translations[window.currentLang];

    // Nav & Hero
    // document.querySelectorAll('[data-nav]').forEach((el, i) => el.textContent = c.nav[i]);
    document.getElementById('main-title').innerText = trans.title;
    document.getElementById('main-subtitle').innerText = trans.subtitle;

    // Why Me Section
    document.getElementById('why-me-title').innerHTML = `${c.whyMeTitle} <span class="text-blue-500">?</span>`;
    const benefitsList = document.getElementById('benefits-list');
    benefitsList.innerHTML = c.whyMeBenefits.map((b, i) => `
        <div class="flex gap-6">
            <div class="flex-shrink-0 w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500 text-xl">
                ${['🧩', '🔍', '🏗️', '🎯'][i]}
            </div>
            <div>
                <h3 class="text-xl font-bold mb-2">${b.title}</h3>
                <p class="text-neutral-400">${b.desc}</p>
            </div>
        </div>
    `).join('');

    // Pricing & Booking
    document.getElementById('pricing-title').innerText = trans.pricingTitle;
    document.getElementById('booking-title').innerText = trans.bookTitle;
    document.getElementById('payment-text').innerText = trans.paymentInstruction;
    document.getElementById('receipt-upload-label').innerText = trans.receiptLabel;
    document.getElementById('confirm-label').innerText = trans.confirmCheckbox;
    document.getElementById('submit-btn').innerText = trans.formButton;

    const grid = document.getElementById('pricing-grid');
    grid.innerHTML = trans.services.map((s, index) => {
        const isPopular = index === 1;
        return `
        <div class="relative bg-neutral-900 border ${isPopular ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-neutral-800'} p-8 rounded-2xl hover:border-blue-500 transition duration-300 flex flex-col justify-between h-full">
            ${isPopular ? `<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-lg">Most Popular</div>` : ''}
            <div class="flex flex-col h-full">
                <div>
                    <h3 class="text-xl font-bold text-white mb-4 min-h-[64px]">${s.name}</h3>
                    <ul class="text-neutral-400 text-sm mb-6 space-y-2">
                        ${s.desc.map(f => `<li class="flex items-start gap-2"><span class="text-blue-500 font-bold mt-[2px]">✔</span><span>${f}</span></li>`).join('')}
                    </ul>
                </div>

                <!-- Add book now button -->
                <div class="mt-auto">
                    <div class="text-3xl font-bold text-blue-500 mb-6">${s.price}</div>
                    <button 
                    onclick="scrollToBooking('${s.name}')"
                    class="w-full py-3 bg-neutral-800 hover:bg-indigo-600 text-white font-bod py-3 round-xl transition-colors shadow-lg active:scale-95"
                    >${trans.bookNow}</button>
                </div>
            </div>
        </div>`;
    }).join('');

    const select = document.getElementById('service-select');
    const prev = select.value;
    select.innerHTML = `<option value="" disabled selected>${trans.formService}</option>` + 
        trans.services.map(s => `<option value="${s.name}">${s.name} - ${s.price}</option>`).join('');
    if(prev) select.value = prev;

    document.getElementById('input-name').placeholder = trans.formName;
    document.getElementById('input-email').placeholder = trans.formEmail;
    
    //const navbar = document.querySelector('my-navbar');
    //if (navbar?.updateLanguageDisplay) navbar.updateLanguageDisplay();

    document.getElementById('service-select').dispatchEvent(new Event('change'));
}

function setupServiceLogic() {
    const serviceSelect = document.getElementById('service-select');
    const qrImage = document.getElementById('qr-code-display');  // for dynamic qr display
    const groups = {
        video: document.getElementById('video-group'),
        availability: document.getElementById('availability-group'),
        time: document.getElementById('time-group'),
        wca: document.getElementById('wca-group'),
        pay: document.getElementById('payment-group')
    };

    serviceSelect.addEventListener('change', () => {
        const selected = serviceSelect.value.toLowerCase();
        Object.values(groups).forEach(g => {
            g.classList.add('hidden');
            g.querySelectorAll('input, select').forEach(i => i.required = false);
        });

        if (!selected || selected === "") return;

        groups.pay.classList.remove('hidden');
        groups.pay.querySelector('input[type="file"]').required = true;

        if (selected.includes('analysis')) {
            groups.video.classList.remove('hidden');
            groups.video.querySelector('input').required = true;
        } else {
            groups.availability.classList.remove('hidden');
            groups.time.classList.remove('hidden');
            groups.wca.classList.remove('hidden');
            groups.wca.querySelector('select').required = true;
            groups.time.querySelectorAll('select').forEach(s => s.required = true);
        }

        // Implementing custom qr payment 
        const selectedName = serviceSelect.value;
        const lang = window.currentLang || 'en';
        // Find the selected service object to get its price
        const serviceData = translations[lang].services.find(s => s.name === selectedName);
        
        if (serviceData) {
            // Extract numbers from price (e.g., "฿1,440" -> "1440")
            const priceAmount = serviceData.price.replace(/[^0-9]/g, '');
            
            // Update the QR code source dynamically
            qrImage.src = `https://promptpay.io/0868545948/${priceAmount}.png`;
        } else {
            // Fallback to default QR if no service is selected
            qrImage.src = "image/qr_payment.jpeg";
        }
    });
}

function generateTimeOptions(id) {
    const s = document.getElementById(id);
    s.innerHTML = '<option value="">Select time</option>';
    for (let h = 0; h <= 23; h++) {
        for (let m of ['00', '30']) {
            let v = `${String(h).padStart(2, '0')}:${m}`;
            s.add(new Option(v, v));
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    //toggleLang();
    render();
    generateTimeOptions('preferred-time');
    generateTimeOptions('secondary-time');
    setupServiceLogic();
    toggleSubmitButton();
    // Prevent same time selection
    const primary = document.getElementById('preferred-time');
    const secondary = document.getElementById('secondary-time');
    [primary, secondary].forEach(el => {
        el.addEventListener('change', () => {
            if (primary.value && secondary.value && primary.value === secondary.value) {
                alert('Primary and secondary time cannot be the same');
                el.value = '';
            }
        });
    });
    window.addEventListener('languageChanged', () => {
        render();
    })
});
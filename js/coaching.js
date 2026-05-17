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
        subtitle: "Break through your plateaus with personalized training in advanced methods from a well-rounded competitive experience coach.",
        pricingTitle: "Coaching Options",
        bookTitle: "Reserve Your Session",
        formGoal: "Your Goal / Focus for this session",
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
            { name: "Written Critique (Video Analysis)", price: "฿130", desc: ["Detailed breakdown of 5 recorded solves.",
                                                                                "Identify strengths and inefficiencies",
                                                                                "Lookahead and turning analysis",
                                                                                "Personalized feedback and improvement guide"
                                                                                ]},
            { name: "Video Critique (Video Analysis)", price: "฿220", desc: ["Detailed breakdown of 5 recorded solves.",
                                                                                "Identify strengths and inefficiencies",
                                                                                "Lookahead and turning analysis",
                                                                                "Ergonomics suggestions",
                                                                                "Personalized feedback and improvement tips"
                                                                            ]},
            { name: "Live 1-on-1 Session (30-Min)", price: "฿240", desc: ["Interactive coaching via video call.",
                                                                            "Real-time solve analysis",
                                                                            "Personalized advice on targeted practice drills",
                                                                            ]},
            { name: "Live 1-on-1 Session (1 Hour)", price: "฿420", desc: ["Interactive coaching via video call.",
                                                                            "Real-time solve breakdown",
                                                                            "Lookahead drills tailored to your speed",
                                                                            "Deep dive into effiency and ergonomics"
                                                                            ]},
            { name: "Mastery Pack Live 1-on-1 (4 Sessions)", price: "฿1,550", saving: "Save ฿130", saving_desc: "vs individual sessions", desc: ["Comprehensive progression with a structured 4-week training plan",
                                                                                                            "Weekly check in to track your progress",
                                                                                                            "Focus on all aspects; Algorithm, Ergonomics and Efficiencies."
                                                                                                            ]}
        ]
    },
    th: {
        title: "โค้ชรูบิกระดับมืออาชีพ",
        subtitle: "ยกระดับการแก้รูบิคด้วยเทคนิคระดับสูงและการวิเคราะห์เฉพาะบุคคล โดยโค้ชที่มีประสบการณ์การแข่งขันรอบด้าน",
        pricingTitle: "แพ็กเกจการสอน",
        bookTitle: "จองเวลาเรียนของคุณ",
        formName: "ชื่อ-นามสกุล",
        formEmail: "อีเมล",
        formGoal: "เป้าหมายหรือสิ่งที่ต้องการเน้นใน session นี้",
        formService: "เลือกบริการ",
        formButton: "ยืนยันการจอง",
        paymentInstruction: "สแกน QR เพื่อชำระเงิน",
        receiptLabel: "แนบหลักฐานการโอนเงิน (จำเป็น)",
        confirmCheckbox: "ฉันได้ชำระเงินและแนบหลักฐานเรียบร้อยแล้ว",
        sending: "กำลังส่ง...",
        success: "สำเร็จ! โปรดรอการติดต่อกลับทางอีเมล",
        bookNow: "จองเลย",
        services: [
            { name: "ตรวจการแก้แบบเขียน (Video Analysis)", price: "฿130", desc: ["วิเคราะห์การแก้ 5 รอบแบบละเอียด",
                                                                                "ชี้ให้เห็นจุดแข็งและจุดที่่พัฒนาได้",
                                                                                "วิเคราะห์ความสามารถในการมองล่วงหน้าและการหมุน",
                                                                                "ให้คำแนะนำและแนวทางการฝึกฝนที่เฉพาะเจาะจง"
                                                                              ] },
            { name: "ตรวจการแก้แบบวิดีโอ (Video Analysis)", price: "฿220", desc: ["วิเคราะห์การแก้ 5 รอบแบบละเอียด",
                                                                                "ชี้ให้เห็นจุดแข็งและจุดที่พัฒนาได้",
                                                                                "วิเคราะห์ความสามารถในการมองล่วงหน้าและการหมุน",
                                                                                "แนะนำวิธีการหมุนที่เสริมความคล่องตัวยิ่งขึ้น",
                                                                                "ให้คำแนะนำและแนวทางการฝึกฝนที่เฉพาะเจาะจง"
                                                                              ] },
            { name: "สอนสดตัวต่อตัว (30 นาที)", price: "฿240", desc: ["เรียนสดผ่านวิดีโอคอล",
                                                                    "วิเคราะห์การแก้โจทย์ทันที",
                                                                    "ให้คำแนะนำในการฝึกเฉพาะส่วนสำหรับคุณ"
            ] },
            { name: "สอนสดตัวต่อตัว (1 ชั่วโมง)", price: "฿420", desc: ["เรียนสดเน้นเนื้อหาเจาะลึก",
                                                                    "วิเคราะห์การแก้โจทย์ทันที",
                                                                    "ฝึกการมองล่วงหน้าตามระดับความเหมาะสม",
                                                                    "เจาะลึกประสิทธิภาพและความคล่องตัวการหมุน"
            ] },
            { name: "แพ็กเกจเชี่ยวชาญ สอนสดตัวต่อตัว (4 ครั้ง)", price: "฿1,550", saving: "ประหยัด ฿130", saving_desc: "เมื่อเทียบกลับคลาสรายครั้ง", desc: ["แผนการฝึกซ้อมต่อเนื่อง 4 สัปดาห์ เพื่อการพัฒนาที่เห็นผล",
                                                                                                        "ติดตามผลรายสัปดาห์เพื่อเช็คการฝึกซ้อม",
                                                                                                        "ให้ความสำคัญรอบด้านไม่ว่าจะเป็นสูตรที่ใช้ วิธีการหมุนที่คล่องตัว และ ประสิทธิภาพในการแก้",
            ] }
        ]
    }
};

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwwqbpCMgiHXTgaCYfqt2z3WWfIdE6AEpUcf5pvsYHh5ZMF7a5lzWJYP8W0NFjsT4B0/exec';

let cachedReceiptBase64 = "";

/**
 * Compresses an image file and returns a Base64 string.
 * @param {File} file - The original image file.
 * @param {number} maxWidth - Maximum width in pixels (default 1000).
 * @param {number} quality - Compression quality from 0 to 1 (default 0.7).
 */
async function compressImage(file, maxWidth = 1000, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // 1. Calculate new dimensions while maintaining aspect ratio
                if (width > maxWidth) {
                    height = (maxWidth / width) * height;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                // 2. Draw image to canvas
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // 3. Export as JPEG with reduced quality
                // Returns data:image/jpeg;base64,...
                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                
                // Return only the base64 string part
                resolve(dataUrl.split(',')[1]);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
}

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
    // --- ส่วนที่เพิ่มใหม่: ตรวจสอบขนาดไฟล์ (2MB = 2 * 1024 * 1024 bytes) ---
    const MAX_SIZE = 2 * 1024 * 1024; 
    if (receiptFile && receiptFile.size > MAX_SIZE) {
        const errorMsg = window.currentLang === 'en' 
            ? "File is too large! Please upload an image smaller than 2MB." 
            : "ไฟล์มีขนาดใหญ่เกินไป! กรุณาแนบรูปภาพที่มีขนาดไม่เกิน 2MB";
        alert(errorMsg);
        return; // หยุดการทำงานทันที ไม่ส่งข้อมูล
    }

    if (!serviceValue.includes('analysis') && selectedDays.length === 0) {
        alert(window.currentLang === 'en' ? 'Please select at least one available day.' : 'กรุณาเลือกวันที่สะดวกอย่างน้อย 1 วัน');
        return;
    }
    
    btn.disabled = true;
    btn.innerText = content.sending;

    console.time('total-submit');
    console.time('compression');
    try {
        // let base64Receipt = "";
        // // if (receiptFile) base64Receipt = await toBase64(receiptFile);
        // if (receiptFile) {
        //     // Check if it's an image before trying to compress
        //     if (receiptFile.type.startsWith('image/')) {
        //         base64Receipt = await compressImage(receiptFile, 1000, 0.7);
        //     } else {
        //         // Fallback for non-image files (like PDFs)
        //         base64Receipt = await toBase64(receiptFile);
        //     }
        // }

        let base64Receipt = cachedReceiptBase64;
        console.log('Cache hit?', !!base64Receipt); // true = compression already done
        console.timeEnd('compression');

        const data = {
            name: document.getElementById('input-name').value,
            email: document.getElementById('input-email').value,
            service: document.getElementById('service-select').value,
            goal: document.getElementById('input-goal').value, // Add this
            availableDate: selectedDays,
            preferredTime: document.getElementById('preferred-time').value,
            secondaryTime: document.getElementById('secondary-time').value,
            videoLink: document.getElementById('video-link').value,
            wcaEvent: document.getElementById('wca-event').value,
            receiptData: base64Receipt,
            // receiptName: receiptFile ? receiptFile.name : "receipt.png"
            receiptName: receiptFile ? receiptFile.name.replace(/\.[^/.]+$/, ".jpg") : "receipt.jpg"
        };

        if (serviceValue.includes('analysis')) {
            data.availableDate = ""; data.preferredTime = ""; data.secondaryTime = ""; data.wcaEvent = "";
        } else {
            data.videoLink = "";
        }

        console.time('fetch');
        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', 
            //cache: 'no-cache',
            //headers: { 'Content-Type': 'application/json' },
            headers: {'Content-Type': 'text/plain;charset=utf-8'},
            body: JSON.stringify(data)
        }).catch(err => console.error('Background send failed:', err)); // to don't let user wait for backend
        
        // Alert instantly
        alert(content.success);

        console.timeEnd('fetch'); // should be near 0ms now
        console.timeEnd('total-submit');

        // const msg = document.getElementById('success-msg');
        // msg.textContent = content.success;
        // msg.classList.remove('hidden');
        // setTimeout(() => msg.classList.add('hidden'), 5000); // auto-hide after 5s

        cachedReceiptBase64 = "";
        event.target.reset();
        showStep(1);                      // Return UI to Step 1
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


let progressStepsMap = [1];  // default: only step 1 visible
let currentStep = 1;         // track current wizard step

let serviceLogicInitialized = false;
let selectedServiceIndex = -1;

function getProgressModeFromService() {
    const select = document.getElementById('service-select');
    const raw = (select?.value || '').toLowerCase();

    if (!raw) return 1;                 // service not selected
    if (raw.includes('analysis')) return 2;  // critique services
    return 3;                           // other services
}

function renderProgressBlocks(mode) {
    const blocksWrap = document.getElementById('progress-blocks');
    const labelsWrap = document.getElementById('progress-labels');

    // 1) Decide what steps are represented by blocks
    // mode 1: [1]
    // mode 2: [1,3] (critique skips step 2)
    // mode 3: [1,2,3]
    progressStepsMap = mode === 1 ? [1] : (mode === 2 ? [1, 3] : [1, 2, 3]);

    // 2) Labels for each block (you can rename these)
    const labels = mode === 1
        ? ['Service']
        : (mode === 2 ? ['Service', 'Payment'] : ['Service', 'Details', 'Payment']);

    // 3) Set layout columns dynamically (grid-cols-1/2/3)
    const colsClass = mode === 1 ? 'grid-cols-1' : (mode === 2 ? 'grid-cols-2' : 'grid-cols-3');
    blocksWrap.className = `grid ${colsClass} gap-3`;
    labelsWrap.className = `grid ${colsClass} gap-3 mt-3 text-xs text-neutral-500`;

    // 4) Render blocks
    blocksWrap.innerHTML = progressStepsMap.map((stepNum) => `
        <div 
          class="progress-block h-2 rounded-full bg-neutral-800 transition-colors duration-300"
          data-step="${stepNum}"
          aria-label="Step ${stepNum}"
        ></div>
    `).join('');

    // 5) Render labels
    labelsWrap.innerHTML = labels.map((t, i) => `
        <div class="${i === 0 ? 'text-left' : (i === labels.length - 1 ? 'text-right' : 'text-center')}">
          ${t}
        </div>
    `).join('');
}

function updateProgressBlocks(stepNumber) {
    const blocks = document.querySelectorAll('.progress-block');
    const service = document.getElementById('service-select').value;
    const isCritique = service && service.includes('Analysis');
    
    const totalSteps = isCritique ? 2 : 3;

    blocks.forEach(block => {
        const stepForThisBlock = Number(block.dataset.step);

        // Reset
        block.classList.remove('bg-blue-600', 'bg-blue-500/60');
        block.classList.add('bg-neutral-800');

        // Completed blocks (mapped step < current step)
        if (stepForThisBlock < stepNumber) {
            block.classList.remove('bg-neutral-800');
            block.classList.add('bg-blue-500/60');
        }

        // Current block
        if (stepForThisBlock === stepNumber) {
            block.classList.remove('bg-neutral-800');
            block.classList.add('bg-blue-600');
        }
    });
}

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

function showStep(stepNumber) {
    
    // 1. Hide all steps
    document.querySelectorAll('.step-container').forEach(el => el.classList.add('hidden'));
    
    // 2. Show the target step
    document.getElementById(`step-${stepNumber}`).classList.remove('hidden');
    // const target = document.getElementById(`stepNumber-${stepNumber}`);
    // if (target) target.classList.remove('hidden');

    const service = document.getElementById('service-select').value;
    const isCritique = service && service.toLowerCase().includes('analysis');
    
    renderProgressBlocks(isCritique ? 2 : 3);
    
    // 3. Update the progress bar
    updateProgressBlocks(stepNumber);

    currentStep = stepNumber;
}

function nextStep(step) {
    // Determine which step we are currently on
    const fromStep = step > 1 ? (step === 3 && document.getElementById('service-select').value.toLowerCase().includes('analysis') ? 1 : step - 1) : 1;
    const currentContainer = document.getElementById(`step-${currentStep}`);

    // Check validity of all required inputs in the CURRENT step only
    const inputs = currentContainer.querySelectorAll('input[required], select[required], textarea[required]');
    const allValid = Array.from(inputs).every(input => {
        const isValid = input.checkValidity();
        if (!isValid) input.reportValidity(); // Shows the browser's default tooltip
        return isValid;
    });

    if (!allValid && step > currentStep) return; // Block forward movement if invalid
    
    const serviceValue = document.getElementById('service-select').value.toLowerCase();
    const isCritique = serviceValue.includes('analysis');

    // Skip Step 2 (Logistics) if it's a Critique service
    if (step === 2 && isCritique) {
        step = 3;
    }
    
    // Logic for going back from Step 3 to Step 1 for Critique
    // if (step === 2 && event.target.id === 'back-to-2' && isCritique) {
    //     step = 1;
    // }

    currentStep = step;

    // Toggle visibility
    document.querySelectorAll('.step-container').forEach(el => el.classList.add('hidden'));
    document.getElementById(`step-${step}`).classList.remove('hidden');
    
    // Update the "Back" button on Step 3 dynamically
    const backBtn = document.getElementById('back-to-2');
    if (backBtn) backBtn.onclick = () => nextStep(isCritique ? 1 : 2);

    // for progress bar
    // function updateProgressBar(step) {
    //     const bar = document.getElementById('progress-bar');
    //     const width = (step / 3) * 100;
    //     bar.style.width = `${width}%`;
    // }

    // updateProgressBar(step); // Update the bar visual

    updateProgressBlocks(currentStep);
    showStep(currentStep);
}

function refreshFormState() {
    const mode = getProgressModeFromService();
    renderProgressBlocks(mode);
    updateProgressBlocks(currentStep);
    showStep(currentStep);
}

function render() {
    const c = cnt[window.currentLang];
    const trans = translations[window.currentLang];

    // Nav & Hero
    // document.querySelectorAll('[data-nav]').forEach((el, i) => el.textContent = c.nav[i]);
    document.getElementById('main-title').innerText = trans.title;
    document.getElementById('main-subtitle').innerText = trans.subtitle;
    document.getElementById('label-goal').innerText = trans.formGoal;

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
        const isPopular = (index === 1 || index === 3);
        const isMastery = index === 4;
        return `
        <div class="relative bg-neutral-900 border ${isPopular ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : isMastery ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.15)]' : 'border-neutral-800'} p-8 rounded-2xl hover:border-blue-500 transition duration-300 flex flex-col justify-between h-full">
            ${isPopular ? `<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-lg">Most Popular</div>` : ''}
            ${isMastery && s.saving ? `<div class="absolute -top-4 right-4 bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-lg">${s.saving}</div>` : ''}
            <div class="flex flex-col h-full">
                <div>
                    <h3 class="text-xl font-bold text-white mb-4 min-h-[64px]">${s.name}</h3>
                    <ul class="text-neutral-400 text-sm mb-6 space-y-2">
                        ${s.desc.map(f => `<li class="flex items-start gap-2"><span class="text-blue-500 font-bold mt-[2px]">✔</span><span>${f}</span></li>`).join('')}
                    </ul>
                </div>

                <!-- Add book now button -->
                <div class="mt-auto">
                    <div class="mb-6">
                        <div class="text-3xl font-bold text-blue-500">${s.price}</div>
                        ${s.saving ? `<div class="text-sm text-green-400 font-semibold mt-1">${s.saving} ${s.saving_desc}</div>` : ''}
                    </div>
                    <button 
                    onclick="scrollToBooking('${s.name}')"
                    class="w-full py-3 bg-neutral-800 hover:bg-indigo-600 text-white font-bod py-3 round-xl transition-colors shadow-lg active:scale-95"
                    >${trans.bookNow}</button>
                </div>
            </div>
        </div>`;
    }).join('');

    // const select = document.getElementById('service-select');
    // const prev = select.value;
    // select.innerHTML = `<option value="" disabled selected>${trans.formService}</option>` + 
    //     trans.services.map(s => `<option value="${s.name}">${s.name} - ${s.price}</option>`).join('');
    // if(prev) select.value = prev;

    const select = document.getElementById('service-select');
    select.innerHTML = `<option value="" disabled selected>${trans.formService}</option>` +
        trans.services.map(s => `<option value="${s.name}">${s.name} - ${s.price}</option>`).join('');
    if (selectedServiceIndex > 0) select.selectedIndex = selectedServiceIndex;

    document.getElementById('input-name').placeholder = trans.formName;
    document.getElementById('input-email').placeholder = trans.formEmail;
    
    //const navbar = document.querySelector('my-navbar');
    //if (navbar?.updateLanguageDisplay) navbar.updateLanguageDisplay();

    // document.getElementById('service-select').dispatchEvent(new Event('change'));

    // showStep(currentStep);
    // setupServiceLogic();
    refreshFormState();
}

function setupServiceLogic() {
    if (serviceLogicInitialized) return;
    serviceLogicInitialized = true;
    
    const serviceSelect = document.getElementById('service-select');
    const qrImage = document.getElementById('qr-code-display');  // for dynamic qr display
    const groups = {
        video: document.getElementById('video-group'),
        goal: document.getElementById('goal-group'), // New group
        availability: document.getElementById('availability-group'),
        time: document.getElementById('time-group'),
        wca: document.getElementById('wca-group'),
        pay: document.getElementById('payment-group')
    };

    serviceSelect.addEventListener('change', () => {
        // Save selected index so language switch can restore it
        selectedServiceIndex = serviceSelect.selectedIndex;
        
        // 1. Reset logic: Clear values of hidden groups to prevent stale data
        const fieldsToClear = [
            'video-link', 'input-goal', 'wca-event', 
            'preferred-time', 'secondary-time'
        ];
        fieldsToClear.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });

        // Uncheck all days
        document.querySelectorAll('#available-date input').forEach(cb => cb.checked = false);
        
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
            groups.goal.classList.add('hidden'); // Hide goal for critique
            groups.video.querySelector('input').required = true;
        } else {
            groups.goal.classList.remove('hidden'); // Hide goal for critique
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

        const mode = getProgressModeFromService();
        renderProgressBlocks(mode);
        // updateProgressBlocks(currentStep);

        //If service not selected, keep them on step 1
        if (mode === 1) {
            showStep(1);
        }
        else {
            // Ensure block highlight matches whatever step is visible now
            // If critique, step 2 shouldn't be shown; your nextStep() already handles skipping.
            updateProgressBlocks(currentStep);
        }

        // Refresh time dropdowns whenever available days change
        document.querySelectorAll('#available-date input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', () => {
                const startHour = getStartHourFromSelectedDays();
                generateTimeOptions('preferred-time', startHour);
                generateTimeOptions('secondary-time', startHour);
            });
        });
    });
}

function generateTimeOptions(id, startHour = 0) {
    // const s = document.getElementById(id);
    // s.innerHTML = '<option value="" data-en="Select time" data-th="เลือกเวลา">Select time</option>';
    // for (let h = 0; h <= 23; h++) {
    //     for (let m of ['00', '30']) {
    //         let v = `${String(h).padStart(2, '0')}:${m}`;
    //         s.add(new Option(v, v));
    //     }
    // }
    const s = document.getElementById(id);
    const prev = s.value; // preserve selection if already chosen
    s.innerHTML = '<option value="" data-en="Select time" data-th="เลือกเวลา">Select time</option>';
    for (let h = startHour; h <= 23; h++) {
        for (let m of ['00', '30']) {
            let v = `${String(h).padStart(2, '0')}:${m}`;
            s.add(new Option(v, v));
        }
    }
    // Restore previous value only if it's still valid in the new range
    if (prev && parseInt(prev.split(':')[0]) >= startHour) s.value = prev;
}

function getStartHourFromSelectedDays() {
    const checked = Array.from(document.querySelectorAll('#available-date input:checked'))
        .map(el => el.value);

    if (checked.length === 0) return 19; // default to 7pm if nothing selected yet

    const isWeekendOnly = checked.some(d => d === 'Sat' || d === 'Sun');
    return isWeekendOnly ? 14 : 19; // 2pm if any weekend, 7pm if Mon/Fri only
}

document.addEventListener('DOMContentLoaded', () => {
    //toggleLang();
    render();
    
    document.getElementById('receipt-upload').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) { cachedReceiptBase64 = ""; return; }

        if (file.type.startsWith('image/')) {
            cachedReceiptBase64 = await compressImage(file, 1000, 0.7);
        } else {
            cachedReceiptBase64 = await toBase64(file);
        }
    });

    // Default to 1 block until a service is selected
    renderProgressBlocks(1);
    updateProgressBlocks(1);

    generateTimeOptions('preferred-time', 19);
    generateTimeOptions('secondary-time', 19);
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
        // 2. สั่งให้แสดงผล Step ล่าสุดที่ผู้ใช้เปิดค้างไว้ (แก้ปัญหาเมนูหาย)
        // document.querySelectorAll('.step-container').forEach(el => el.classList.add('hidden'));
        // const activeStep = document.getElementById(`step-${currentStep}`);
        // if (activeStep) activeStep.classList.remove('hidden');
        //document.getElementById(`step-${currentStep}`).classList.remove('hidden');

        // 3. อัปเดตแถบ Progress Bar ให้เป็นสีตาม Step ปัจจุบัน
        // updateProgressBlocks(currentStep);
        
        // 4. ตรวจสอบว่าฟิลด์ Video Link ควรโชว์หรือซ่อน (สำหรับบริการ Critique)
        // setupServiceLogic();
    })
});

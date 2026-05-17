tailwind.config = {
    theme: {
    extend: {
        fontFamily: {
        sans: ['Inter', 'Sarabun', 'ui-sans-serif', 'system-ui'],
        },
    },
    },
}

window.currentLang = localStorage.getItem('preferredLang') || 'en';

const content = {
    en: {
    nav: ['Home', 'Courses', 'Coaching', 'Resources', 'Contact'],
    heroSubtitle: 'Master the Cube with structured courses, modern resources, and personal coaching.',
    journeyTitle: 'My Cubing Journey',
    journeySteps: [
        { year: 'Start', ach: 'Discovered the cube with a few pieces left unsolved and complete it without help.' },
        { year: 'Competed 2-3 Years', ach: 'Placed 3rd on 3x3 at National Championship, and break my first ever National Record.' },
        { year: '2020-2021', ach: 'Started learning ZBLL and complete all necessary sets.' },
        { year: '2022', ach: 'Become the first person in Thailand to break sub-7 barrier on 3x3.' },
        { year: '2024', ach: 'Ranked 9th in the world at the time for fastest 3x3 solve.' },
        { year: '2026', ach: 'Keep competing and launch NTP Cuber Academy.' }
    ],
    // ... rest of content same as before
    introTitle: 'About Me',
    introText1: 'Hi, I’m Natthaphat Mahtani. I am a competitive speedcuber dedicated to helping others break their personal records through structured, logic-based, and fun training.',
    introText2: 'This website provides a complete ecosystem for cubers: from beginner courses to advanced techniques on various events, plus 1-on-1 coaching to refine your hardware and execution.',
    courseCards: [
        { title: 'Beginner 3×3', price: '$19', desc: 'Learn to solve from zero.' },
        { title: 'Intermediate CFOP', price: '$39', desc: 'Improve efficiency.' },
        { title: 'Advanced Speedcubing', price: '$79', desc: 'Full CFOP and TPS training.' }
    ],
    coachingTitle: 'Coaching & Services',
    coachingText: 'Improve your skill with advice from experienced cuber.',
    resourcesTitle: 'Free Resources',
    resourcesText: 'Algorithms and tips.',
    contactTitle: 'Book a Session',
    // THIS WILL BE USE FOR COMING SOON 
    coursesTitle: "Online Course",
    coursesSubtitle: "I am currently filming and structuring these modules. Stay tuned!",
    courseComingSoon: [
        { title: "3x3 Fundamentals", desc: "Mastering the cross, basic F2L, and intuitive 2-look LL." },
        { title: "Advanced F2L", desc: "Solving cases from different angles and reducing rotations." },
        { title: "The Sub-10 Path", desc: "Advanced look-ahead, efficiency, and full ZBLL/coll subsets." }
    ],
    badgeComingSoon: "Under Development"
    },
    th: {
    nav: ['หน้าแรก', 'คอร์สเรียน', 'เรียนตัวต่อตัว', 'แหล่งเรียนรู้', 'ติดต่อ'],
    heroSubtitle: 'เชี่ยวชาญรูบิกด้วยคอร์สเรียนที่เป็นระบบ แหล่งเรียนรู้ที่ทันสมัย และบริการโค้ชตัวต่อตัวเพื่อพัฒนาทักษะได้ตรงจุด',
    journeyTitle: 'เส้นทางรูบิกของผม',
    journeySteps: [
        { year: 'เริ่มต้น', ach: 'แก้รูบิกที่ถูกวางไว้โดยเหลือเพียงไม่กี่ชิ้นได้ด้วยตัวเอง เกิดความสนใจ' },
        { year: 'เข้าร่วมแข่งขัน 2-3 ปี', ach: 'ได้อันดับ 3 ในการแข่งขันระดับประเทศ และได้ทำลายสถิติประเทศครั้งแรก' },
        { year: '2020-2021', ach: 'เริ่มเรียนรู้และทบทวน ZBLL อย่างจริงจัง จนสามารถจำเซตที่สำคัญได้ครบ' },
        { year: '2022', ach: 'เป็นคนไทยคนแรกที่ทำลายกำแพงเวลา 7 วินาทีของรูบิก 3x3' },
        { year: '2024', ach: 'แก้รูบิกด้วยเวลาเร็วที่สุดขึ้นเป็นอันดับ 9 ของโลกในตอนนั้น' },
        { year: '2026', ach: 'แข่งขันและทำสถิติต่อไป แล้วเปิดตัว NTP Cuber Academy เพื่อเผยแพร่ความรู้รูบิก' }
    ],
    // ... rest of content same as before
    introTitle: 'เกี่ยวกับผม',
    introText1: 'สวัสดีครับผมณัฐภัทร มาทานี ผมเป็นนักแข่งรูบิกที่มุ่งเน้นการช่วยให้ทุกคนทำลายสถิติส่วนตัวด้วยการฝึกฝนอย่างเป็นระบบและมีความสนุกไปกับการฝึก',
    introText2: 'เว็บไซต์นี้เป็นแหล่งรวมทุกอย่างสำหรับผู้ที่สนใจพัฒนาความสามารถด้านรูบิก ตั้งแต่คอร์สพื้นฐานไปจนถึงเทคนิคขั้นสูงอย่างสำหรับรูบิกหลายประเภท พร้อมบริการโค้ชแบบตัวต่อตัวเพื่อพัฒนาทั้งทักษะและวิธีคิดของคุณ',
    courseCards: [
        { title: 'พื้นฐาน 3×3', price: '฿690', desc: 'เริ่มต้นแก้รูบิกส์ตั้งแต่ศูนย์' },
        { title: 'ระดับกลาง CFOP', price: '฿1,390', desc: 'พัฒนาเทคนิคและความเร็ว' },
        { title: 'ขั้นสูง Speedcubing', price: '฿2,790', desc: 'เทคนิคแข่งขัน' }
    ],
    coachingTitle: 'โค้ช & บริการอื่น ๆ',
    coachingText: 'พัฒนาทักษะตามคำแนะนำของนักแข่งรูบิกมากประสบการณ์',
    resourcesTitle: 'แหล่งเรียนรู้ฟรี',
    resourcesText: 'สูตรการหมุนและแผนฝึก',
    contactTitle: 'จองคลาสโค้ช',
    // THIS WILL BE USE FOR COMING SOON
    coursesTitle: "คอร์สเรียนออนไลน์",
    coursesSubtitle: "กำลังเตรียมเนื้อหาและถ่ายทำคอร์สเรียนคุณภาพสูง เร็วๆ นี้!",
    courseComingSoon: [
        { title: "พื้นฐาน 3x3", desc: "เจาะลึกการทำ Cross, F2L พื้นฐาน และการแก้แบบ 2-look." },
        { title: "F2L ขั้นสูง", desc: "เทคนิคการเก็บคู่จากทุกมุมและการลดจำนวนการหมุนลูก." },
        { title: "เส้นทางสู่ Sub-10", desc: "เทคนิคการมองล่วงหน้า ความคล่องตัว และสูตร ZBLL." }
    ],
    badgeComingSoon: "กำลังเตรียมเนื้อหา"
    }
};

function applyLang() {
    const c = content[window.currentLang] || content['en'];
    if (!c) return;
    
    // const c = content[window.currentLang];
    
    // Update basic text
    document.getElementById('heroSubtitle').textContent = c.heroSubtitle;
    document.getElementById('journeyTitle').textContent = c.journeyTitle;
    document.getElementById('introTitle').textContent = c.introTitle;
    document.getElementById('introText1').textContent = c.introText1;
    document.getElementById('introText2').textContent = c.introText2;
    document.getElementById('coachingTitle').textContent = c.coachingTitle;
    document.getElementById('coachingText').textContent = c.coachingText;
    document.getElementById('resourcesTitle').textContent = c.resourcesTitle;
    document.getElementById('resourcesText').textContent = c.resourcesText;
    document.getElementById('contactTitle').textContent = c.contactTitle;
    // Set text for titles
    document.getElementById('coursesTitle').textContent = c.coursesTitle;
    document.getElementById('coursesSubtitle').textContent = c.coursesSubtitle;

    // Update Journey Checkpoints
    const journeyGrid = document.getElementById('journeyGrid');
    if (journeyGrid) {
    journeyGrid.innerHTML = c.journeySteps.map((step, i) => `
        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group reveal">
        <div class="flex items-center justify-center w-10 h-10 rounded-full border-2 border-indigo-500 bg-neutral-950 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            ${i + 1}
        </div>
        <div class="w-[calc(100%-3.5rem)] md:w-[45%] p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 hover:border-indigo-500/40 transition-all backdrop-blur-sm">
            <span class="text-indigo-400 font-bold text-xs uppercase tracking-widest block mb-2">${step.year}</span>
            <p class="text-neutral-200">${step.ach}</p>
        </div>
        </div>
    `).join('');
    };

    // Update Course Cards
    // const cards = document.getElementById('courseCards');
    // cards.innerHTML = '';
    // c.courseCards.forEach((card, index) => {
    // const isPremium = index === 2; // Highlights the Advanced course
    // cards.innerHTML += `
    //     <div class="relative group bg-neutral-900 border ${isPremium ? 'border-indigo-500/50' : 'border-neutral-800'} rounded-3xl p-8 hover:bg-neutral-800/50 transition-all duration-500 flex flex-col h-full">
    //     ${isPremium ? '<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg shadow-indigo-600/20">Most Advanced</div>' : ''}
        
    //     <div class="mb-8">
    //         <h3 class="text-2xl font-bold text-white mb-2">${card.title}</h3>
    //         <p class="text-neutral-400 text-sm leading-relaxed">${card.desc}</p>
    //     </div>

    //     <div class="mt-auto">
    //         <div class="flex items-baseline gap-1 mb-6">
    //         <span class="text-4xl font-bold text-white">${card.price}</span>
    //         <span class="text-neutral-500 text-sm">/ course</span>
    //         </div>
            
    //         <a href="courses.html" class="block text-center w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${isPremium ? 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20' : 'bg-neutral-800 hover:bg-neutral-700'}">
    //         Get Started
    //         </a>
    //     </div>
    //     </div>`;
    //     });

    // THIS IS FOR COMING SOON COURSE CARDS
    const cardsContainer = document.getElementById('courseCards');
    if (cardsContainer) {
        cardsContainer.innerHTML = c.courseComingSoon.map(card => `
            <div class="relative bg-neutral-900/40 border border-neutral-800 p-8 rounded-3xl overflow-hidden group">
                <div class="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px] z-10"></div>
                
                <div class="absolute top-6 right-6 z-20">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-neutral-500 border border-neutral-700 px-3 py-1 rounded-full bg-neutral-900">
                        ${c.badgeComingSoon}
                    </span>
                </div>

                <div class="relative z-20 opacity-60">
                    <div class="w-12 h-12 bg-neutral-800 rounded-xl mb-6 flex items-center justify-center">
                        <svg class="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-3">${card.title}</h3>
                    <p class="text-neutral-500 text-sm leading-relaxed">${card.desc}</p>
                </div>
            </div>
        `).join('');
        };


    // Re-initialize the scroll reveal so it picks up the new HTML
    initScrollReveal();
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('active');
        }
    });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', applyLang);

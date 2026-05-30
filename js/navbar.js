class MyNavbar extends HTMLElement {
    connectedCallback() {
        // 1. Determine the path to the root
        const isGitHub = window.location.hostname.includes('github.io');
        const isLocalServer = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
        
        this.rootPath = '';

        if (isGitHub) {
            // Change 'your-repo-name' to your actual GitHub repository name
            this.rootPath = '/'; 
        } else if (isLocalServer) {
            // Live Server treats the project folder as root
            this.rootPath = '/'; 
        } else {
            // Fallback for double-clicking: calculates levels to go up
            // This counts how many folders deep you are and adds ../ for each
            const depth = window.location.pathname.split('/').filter(Boolean).length;
            this.rootPath = '../'.repeat(Math.max(0, depth - 1));
        }
        
        this.render();
        // Listen for a custom event so the navbar updates when the language changes elsewhere
        window.addEventListener('languageChanged', () => this.updateLanguageDisplay());
        // Init auth widget after render
        this.initAuth();
    }

    render() {
        this.innerHTML = `
        <header class="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800/50">
            <div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                <div class="font-bold text-xl tracking-tighter cursor-pointer" onclick="window.location.href='/index.html'">
                    NTP Cuber <span class="text-blue-500">Academy</span>
                </div>
                
                <nav class="hidden md:flex gap-8 text-sm font-medium">
                    <a href="${this.rootPath}index.html" class="nav-link text-neutral-400 hover:text-indigo-400 transition-colors" data-en="Home" data-th="หน้าแรก">Home</a>
                    <a href="${this.rootPath}404.html" class="nav-link text-neutral-400 hover:text-indigo-400 transition-colors" data-en="Courses (Coming Soon)" data-th="คอร์สเรียน (เร็ว ๆ นี้)">Courses (Coming Soon)</a>
                    <a href="${this.rootPath}coaching.html" class="nav-link text-neutral-400 hover:text-indigo-400 transition-colors" data-en="Coaching" data-th="เรียนตัวต่อตัว">Coaching</a>
                    
                    <!-- Resources Dropdown Container -->
                    <div class="relative group flex items-center">
                        <!-- Main Link -->
                        <a href="${this.rootPath}resources.html" 
                        class="nav-link text-neutral-400 group-hover:text-indigo-400 transition-colors" 
                        data-en="Resources" data-th="แหล่งเรียนรู้">
                            Resources
                            <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </a>
                        
                        <!-- Main Submenu: CRITICAL - Removed 'overflow-hidden' here -->
                        <div class="absolute top-full left-0 hidden group-hover:block pt-2 min-w-[200px] z-50">
                            <div class="bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2 backdrop-blur-xl">
                                
                                <!-- 2x2 Container -->
                                <div class="relative group/sub w-full">
                                    <a href="${this.rootPath}resources.html#2x2-title" 
                                    class="nav-link w-full flex items-center justify-between px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors">
                                        <span>2x2</span>
                                        <!-- Arrow pointing right -->
                                        <svg class="w-4 h-4 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </a>

                                    <!-- 2x2 Sub-submenu: Positioned to the right -->
                                    <!-- We add 'pl-1' to create an invisible bridge so the menu stays open while moving the mouse -->
                                    <div class="absolute left-full top-0 hidden group-hover/sub:block pl-1 min-w-[180px] z-50">
                                        <div class="bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2 backdrop-blur-xl">
                                            <a href="${this.rootPath}algorithms/2x2/cll.html" class="nav-link block px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors">CLL</a>
                                            <a href="${this.rootPath}algorithms/2x2/eg1.html" class="nav-link block px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors">EG-1</a>
                                            <a href="${this.rootPath}algorithms/2x2/eg2.html" class="nav-link block px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors">EG-2</a>
                                        </div>
                                    </div>
                                </div>
                                
                                <a href="${this.rootPath}resources.html#3x3-title" class="nav-link block px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors">3x3</a>
                                
                                <!-- Megaminx Container -->
                                <div class="relative group/sub w-full">
                                    <a href="${this.rootPath}resources.html#mega-title" 
                                    class="nav-link w-full flex items-center justify-between px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors">
                                        <span>Megaminx</span>
                                        <!-- Arrow pointing right -->
                                        <svg class="w-4 h-4 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </a>

                                    <!-- Megaminx Sub-submenu: Positioned to the right -->
                                    <!-- We add 'pl-1' to create an invisible bridge so the menu stays open while moving the mouse -->
                                    <div class="absolute left-full top-0 hidden group-hover/sub:block pl-1 min-w-[180px] z-50">
                                        <div class="bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2 backdrop-blur-xl">
                                            <a href="${this.rootPath}algorithms/megaminx/4lll.html#eo" class="nav-link block px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors">4LLL - EO</a>
                                            <a href="${this.rootPath}algorithms/megaminx/4lll.html#co" class="nav-link block px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors">4LLL - CO</a>
                                            <a href="${this.rootPath}algorithms/megaminx/4lll.html#ep" class="nav-link block px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors">4LLL - EP</a>
                                            <a href="${this.rootPath}algorithms/megaminx/4lll.html#cp" class="nav-link block px-5 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-indigo-400 transition-colors">4LLL - CP</a>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </nav>
                
                <div class="flex items-center gap-3">

                    <!-- Auth Button (desktop) — populated by renderAuthWidget() -->
                    <div id="ntp-auth-widget" class="hidden md:block"></div>

                    <button
                        id="lang-btn-nav"
                        type="button"
                        class="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-1.5 text-xs font-bold uppercase tracking-widest hover:border-indigo-500 hover:text-indigo-400 transition-all"
                    >
                        <span id="lang-text-nav">TH</span>
                    </button>

                    <!-- Hamburger Button (Visible on Mobile Only) -->
                    <button id="mobile-menu-btn" class="md:hidden p-2 text-neutral-400 hover:text-white">
                        <svg id="menu-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu Drawer (Hidden by Default) -->
            <div id="mobile-menu" class="hidden md:hidden bg-neutral-900 border-b border-neutral-800 max-h-[80vh] overflow-y-auto">
                <nav class="flex flex-col px-6 py-4 gap-2 text-sm font-medium">
                    <a href="${this.rootPath}index.html" class="nav-link text-neutral-400 py-2 border-b border-neutral-800/50" data-en="Home" data-th="หน้าแรก">Home</a>
                    <a href="${this.rootPath}404.html" class="nav-link text-neutral-400 py-2 border-b border-neutral-800/50" data-en="Courses (Coming Soon)" data-th="คอร์สเรียน (เร็ว ๆ นี้)">Courses (Coming Soon)</a>
                    <a href="${this.rootPath}coaching.html" class="nav-link text-neutral-400 py-2 border-b border-neutral-800/50" data-en="Coaching" data-th="เรียนตัวต่อตัว">Coaching</a>

                    <!-- Auth links (mobile) — populated by renderAuthWidget() -->
                    <div id="ntp-auth-widget-mobile" class="py-2 border-b border-neutral-800/50"></div>
                    
                    <!-- Resources Section with Mobile Toggle -->
                    <div class="flex flex-col border-b border-neutral-800/50">
                        <div class="flex items-center justify-between py-2">
                            <a href="${this.rootPath}resources.html" class="nav-link text-neutral-400" data-en="Resources" data-th="แหล่งเรียนรู้">Resources</a>
                            <button class="submenu-toggle p-2 text-neutral-500" data-target="mobile-res-list">
                                <svg class="w-4 h-4 transition-transform pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                        </div>
                        
                        <!-- Resources Sub-list -->
                        <div id="mobile-res-list" class="hidden flex flex-col pl-4 pb-2 gap-1">
                            <!-- 2x2 Toggle -->
                            <div class="flex items-center justify-between py-2">
                                <a href="${this.rootPath}resources.html#2x2-title" class="nav-link text-neutral-500">2x2</a>
                                <button class="submenu-toggle p-2 text-neutral-500" data-target="mobile-2x2-list">
                                    <svg class="w-4 h-4 transition-transform pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                            </div>
                            <div id="mobile-2x2-list" class="hidden flex flex-col pl-4 gap-2 pb-2">
                                <a href="${this.rootPath}algorithms/2x2/cll.html" class="text-neutral-500 py-1">CLL</a>
                                <a href="${this.rootPath}algorithms/2x2/eg1.html" class="text-neutral-500 py-1">EG-1</a>
                                <a href="${this.rootPath}algorithms/2x2/eg2.html" class="text-neutral-500 py-1">EG-2</a>
                            </div>

                            <a href="${this.rootPath}resources.html#3x3-title" class="text-neutral-500 py-2">3x3</a>

                            <!-- Megaminx Toggle -->
                            <div class="flex items-center justify-between py-2">
                                <a href="${this.rootPath}resources.html#mega-title" class="nav-link text-neutral-500">Megaminx</a>
                                <button class="submenu-toggle p-2 text-neutral-500" data-target="mobile-mega-list">
                                    <svg class="w-4 h-4 transition-transform pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                            </div>
                            <div id="mobile-mega-list" class="hidden flex flex-col pl-4 gap-2 pb-2">
                                <a href="${this.rootPath}algorithms/megaminx/4lll.html#eo" class="text-neutral-500 py-1">4LLL - EO</a>
                                <a href="${this.rootPath}algorithms/megaminx/4lll.html#co" class="text-neutral-500 py-1">4LLL - CO</a>
                                <a href="${this.rootPath}algorithms/megaminx/4lll.html#ep" class="text-neutral-500 py-1">4LLL - EP</a>
                                <a href="${this.rootPath}algorithms/megaminx/4lll.html#cp" class="text-neutral-500 py-1">4LLL - CP</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        `;
        this.setupEventListeners();
        
        // OLD SETUP FOR LANGUAGE TOGGLE
        // Attach the language toggle logic to the button inside the component
        // const btn = this.querySelector('#lang-btn-nav');
        // if (btn) {
        //     btn.addEventListener('click', () => {
        //         // Call the existing toggleLang() function defined in your page's script
        //         if (typeof toggleLang === 'function') {
        //             toggleLang();
        //         } else if (typeof switchLang === 'function') {
        //             switchLang();
        //         }
        //     });
        // }
        
        this.updateLanguageDisplay();
    }

    setupEventListeners() {
        const menuBtn = this.querySelector('#mobile-menu-btn');
        const mobileMenu = this.querySelector('#mobile-menu');
        const langBtn = this.querySelector('#lang-btn-nav');

        // Toggle Mobile Menu
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Optional: Change icon to an "X" when open
        });
        
        // Handle Nested Submenu Toggles
        const toggles = this.querySelectorAll('.submenu-toggle');
        toggles.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevents clicks from bubbling up
                const targetId = btn.getAttribute('data-target');
                const targetEl = this.querySelector(`#${targetId}`);
                const icon = btn.querySelector('svg');

                if (targetEl) {
                    const isHidden = targetEl.classList.toggle('hidden');
                    // Rotate the arrow icon when expanded
                    icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
                }
            });
        });

        // Language Toggle
        langBtn.addEventListener('click', () => {
            if (typeof toggleLang === 'function') toggleLang();
        });
    }

    // Helper to update the navbar text based on the current global language variable
    updateLanguageDisplay() {
        //const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';
        const lang = window.currentLang || 'en';
        const links = this.querySelectorAll('.nav-link');
        links.forEach(link => {
            const translation = link.getAttribute(`data-${lang}`);
            if (translation) link.textContent = translation;
        });
        const langText = this.querySelector('#lang-text-nav');
        if (langText) {
            langText.textContent = lang === 'en' ? 'TH' : 'EN';
        }
    }

    // ── Auth ──────────────────────────────────────────────────

    async initAuth() {
        // Requires supabase-config.js to be loaded before navbar.js
        if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON === 'undefined') return;

        // Dynamically import Supabase (ESM CDN)
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
        this._sb = createClient(SUPABASE_URL, SUPABASE_ANON);

        await this.renderAuthWidget();

        // Re-render on login/logout
        this._sb.auth.onAuthStateChange(() => this.renderAuthWidget());


        // UPDATED LOGIC:
        this._sb.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_OUT') {
                window.location.href = '/index.html';
            } else {
                this.renderAuthWidget();
            }
        });
    }

    async renderAuthWidget() {
        const desktop = this.querySelector('#ntp-auth-widget');
        const mobile  = this.querySelector('#ntp-auth-widget-mobile');
        if (!desktop || !mobile) return;

        const { data: { user } } = await this._sb.auth.getUser();

        if (!user) {
            // ... (keep your existing "Logged out" HTML here) ...
            desktop.innerHTML = `<a href="/login.html" class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 transition text-xs font-bold text-white"><svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9A3.75 3.75 0 1 1 8.25 9a3.75 3.75 0 0 1 7.5 0zM4.5 20.118a7.5 7.5 0 0 1 15 0"/></svg>Login</a>`;
            mobile.innerHTML = `<a href="/login.html" class="flex items-center gap-2 text-neutral-400 text-sm font-semibold">Login / Sign Up</a>`;
        } else {
            // ── Logged in ──
            const name     = user.user_metadata?.full_name || user.email.split('@')[0];
            const initials = name.slice(0, 2).toUpperCase();
            const avatar   = user.user_metadata?.avatar_url;
            
            // CHECK IF ADMIN
            const isAdmin = user.app_metadata?.is_admin === true;

            const avatarHtml = avatar
                ? `<img src="${avatar}" class="w-6 h-6 rounded-full object-cover">`
                : `<div style="width:1.5rem;height:1.5rem;border-radius:50%;background:linear-gradient(135deg,#4f46e5,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:.55rem;font-weight:800;color:#fff;">${initials}</div>`;

            // HTML for the Admin Link (only if isAdmin is true)
            const adminLink = isAdmin ? `
                <a href="/admin.html" style="display:flex;align-items:center;gap:.5rem;padding:.55rem .75rem;border-radius:.5rem;font-size:.78rem;font-weight:600;color:#22c55e;text-decoration:none;transition:background .1s;"
                    onmouseover="this.style.background='rgba(34,197,94,.1)'" onmouseout="this.style.background='transparent'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path d="M12 15V17M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Admin Console
                </a>
            ` : '';

            desktop.innerHTML = `
                <div style="position:relative;">
                    <button id="ntp-avatar-btn" style="display:inline-flex;align-items:center;gap:.4rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:9999px;padding:.3rem .75rem .3rem .3rem;cursor:pointer;transition:border-color .15s;">
                        ${avatarHtml}
                        <span style="font-size:.75rem;font-weight:700;color:#e5e7eb;max-width:6rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${name.split(' ')[0]}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    <div id="ntp-avatar-menu" style="display:none;position:absolute;right:0;top:calc(100% + .4rem);min-width:11rem;background:#111113;border:1px solid #27272a;border-radius:1rem;padding:.4rem;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,.5);">
                        <div style="padding:.5rem .75rem;border-bottom:1px solid #27272a;margin-bottom:.3rem;">
                            <p style="font-size:.65rem;color:#6b7280;margin:0;">Signed in as</p>
                            <p style="font-size:.75rem;font-weight:600;color:#e5e7eb;margin:0;overflow:hidden;text-overflow:ellipsis;">${user.email}</p>
                        </div>
                        
                        ${adminLink} <!-- THE ADMIN LINK APPEARS HERE -->

                        <a href="/dashboard.html" style="display:flex;align-items:center;gap:.5rem;padding:.55rem .75rem;border-radius:.5rem;font-size:.78rem;font-weight:600;color:#d1d5db;text-decoration:none;transition:background .1s;"
                            onmouseover="this.style.background='rgba(79,70,229,.15)'" onmouseout="this.style.background='transparent'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                            My Dashboard
                        </a>
                        <button onclick="window._ntpSb && window._ntpSb.auth.signOut()"
                            style="display:flex;align-items:center;gap:.5rem;width:100%;padding:.55rem .75rem;border-radius:.5rem;font-size:.78rem;font-weight:600;color:#f87171;background:none;border:none;cursor:pointer;text-align:left;transition:background .1s;"
                            onmouseover="this.style.background='rgba(239,68,68,.1)'" onmouseout="this.style.background='transparent'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"/></svg>
                            Sign Out
                        </button>
                    </div>
                </div>`;

            window._ntpSb = this._sb;
            const btn  = desktop.querySelector('#ntp-avatar-btn');
            const menu = desktop.querySelector('#ntp-avatar-menu');
            btn.addEventListener('click', e => {
                e.stopPropagation();
                menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
            });
            document.addEventListener('click', () => { if (menu) menu.style.display = 'none'; });

            // Mobile: Add Admin link there too
            mobile.innerHTML = `
                <div class="flex flex-col gap-2">
                    ${isAdmin ? `<a href="/admin.html" class="flex items-center gap-2 text-green-400 text-sm font-semibold">Admin Console</a>` : ''}
                    <a href="/dashboard.html" class="flex items-center gap-2 text-neutral-400 text-sm font-semibold">My Dashboard</a>
                    <button onclick="window._ntpSb && window._ntpSb.auth.signOut()"
                        class="flex items-center gap-2 text-red-400 text-sm font-semibold bg-none border-none p-0 cursor-pointer text-left">Sign Out</button>
                </div>`;
        }
    }
}

customElements.define('my-navbar', MyNavbar);
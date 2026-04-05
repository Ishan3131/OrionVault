const nav_bar = document.querySelector('.navbar')
const nav_elem1 = document.querySelector('.nav-elems.tabs-container');
const nav_elem2 = document.querySelector('.nav-elems.theme-sign-in-up');
const more_option_button = document.querySelector('.nav-more-options-button')
const toggle_theme_button = document.querySelector('.toggle-theme')
const theme_icons = {'dark': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon w-4 h-4" aria-hidden="true" data-hercules-id="src/pages/_components/Navbar.tsx:161:20" data-hercules-name="Moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path></svg>`,
    'light': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun w-4 h-4" aria-hidden="true" data-hercules-id="src/pages/_components/Navbar.tsx:90:18" data-hercules-name="Sun"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`
}
let is_nav_opened = false;


function moreOptions() {
    if(!is_nav_opened) {
        is_nav_opened = true;
        nav_bar.style.height = '37vh';
        setTimeout(() => {
            nav_elem1.style.display = 'flex';
            nav_elem2.style.display = 'flex';
            nav_elem1.style.opacity = '1';
            nav_elem2.style.opacity = '1';
        }, 200)
        more_option_button.innerText = 'x';
    }
    else {
        is_nav_opened = false;
        nav_bar.style.height = '64px';
        nav_elem1.style.opacity = '0';
        nav_elem2.style.opacity = '0';
        setTimeout(() => {
            nav_elem1.style.display = 'none';
            nav_elem2.style.display = 'none';
        },400)
        more_option_button.innerText = '≡';
    }
}

function toggleTheme(light) {
    if(light == true) {
        document.documentElement.setAttribute('data-theme', 'light');
        toggle_theme_button.innerHTML = theme_icons.dark;
    }
    else if(localStorage.getItem('theme') == 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggle_theme_button.innerHTML = theme_icons.dark;
    }
    else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggle_theme_button.innerHTML = theme_icons.light;
    }
}

export {moreOptions, toggleTheme}
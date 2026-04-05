const nav_bar = document.querySelector('.navbar')
const nav_elem1 = document.querySelector('.nav-elems.tabs-container');
const nav_elem2 = document.querySelector('.nav-elems.theme-sign-in-up');
const more_option_button = document.querySelector('.nav-more-options-button')
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
    }
    else if(localStorage.getItem('theme') == 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

export {moreOptions, toggleTheme}
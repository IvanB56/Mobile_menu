import MOBILE_MENU from './assets/MobileMenu';
import "./styles.less";

document.addEventListener('DOMContentLoaded', () => {
    let isOpened = false;
    const menuList = document.querySelector('.menu-list');
    const menuBtn = document.querySelector('#menu_checkbox');
    const hiddenMenu = document.querySelector('.hidden-menu');
    const hiddenMenuTitle = document.querySelector('.hidden-menu__title');
    const hiddenMenuFooter = document.querySelector('.hidden-menu__footer');
    const langBtn = document.querySelector('.lang-btn');
    const langSelect = document.querySelector('.lang-select');
    const langs = langSelect.querySelectorAll('.lang-select__item');

    const activeItemMenu = [];


    menuBtn.addEventListener('click', () => {
        createMenu(menuList, getItems(activeItemMenu));
        hiddenMenu.classList.add('opened');
        hiddenMenu.getElementsByClassName('hidden-menu__close')[0].addEventListener('click', () => closeMenu(), {once: true})
    })

    hiddenMenuTitle.addEventListener('click', () => {
        activeItemMenu.pop();
        createMenu(menuList, getItems(activeItemMenu));
    });

    langBtn.addEventListener('click', () => openLangMenu());

    function createMenu(menu, items) {
        let html = '';
        if (activeItemMenu.length) {
            hiddenMenuTitle.innerHTML = activeItemMenu[activeItemMenu.length - 1];
            hiddenMenuTitle.style.opacity = 1;
            hiddenMenuFooter.style.display = 'none';
        } else {
            hiddenMenuTitle.innerHTML = '&nbsp;';
            hiddenMenuTitle.style.opacity = 0;
            hiddenMenuFooter.style.display = 'block';
        }
        if (Array.isArray(items)) {
            items.forEach(item => {
                if (item.title) {
                    html += `<li class="menu-list-item end" data-name="${item}">
                        <h5>${item.title}</h5>
                        <p>${item.text}</p>
                    </li>`;
                } else {
                    html += `<li class="menu-list-item end" data-name="${item}">${item}</li>`;
                }
            })
        } else {
            Object.keys(items).forEach(item => {
                html += `<li class="menu-list-item" data-name="${item}">${item}</li>`;
            });
        }
        menu.innerHTML = '';
        menu.insertAdjacentHTML('beforeend', html);
        menuList.querySelectorAll('.menu-list-item:not(.end)').forEach(item => {
            item.addEventListener('click', e => openSubMenu(e), {once: true});
        });
    }

    function closeMenu() {
        menuBtn.checked = false;
        hiddenMenu.classList.remove('opened');
        activeItemMenu.length = 0;
    }

    function openSubMenu(e) {
        activeItemMenu.push(e.target.dataset.name)
        createMenu(menuList, getItems(activeItemMenu));
    }

    function getItems(arr) {
        let items = JSON.parse(JSON.stringify(MOBILE_MENU));
        if (arr.length) {
            for (let i = 0; i < arr.length; i++) {
                let key = arr[i];
                items = items[key];
            }
        }

        return items;
    }

    function openLangMenu() {
        langSelect.style.display = 'block';

        langSelect.querySelector('.overlay').addEventListener('click', () => {
            langSelect.style.display = 'none';
        }, {once: true})


        langs.forEach(lang => {
            lang.addEventListener('click', selectLang, {capture: true});
        })
    }

    function selectLang() {
        langs.forEach(lang => {
            lang.classList.remove('active');
        })
        this.classList.add('active');
        setTimeout(() => {
            langSelect.style.display = 'none';
        }, 100);
    }
})

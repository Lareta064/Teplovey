document.addEventListener("DOMContentLoaded", function () {
    $('lazy').lazy();
    // моб меню - показать по клику на бургер-иконку
    const bodyEl = document.body;
    const mobMenu = document.querySelector('#mob-menu');
    const pageHeader = document.querySelector('#header');
    const mobMenuOpen = document.querySelector('#toggle-menu');
    const mobMenuClose = document.querySelector('#close-menu');
    const dropMenuItems = document.querySelectorAll('.header-menu-list .drop-menu');
    let isMobileMode = isMobile(); // Храним текущее состояние экрана (мобильный/десктопный)

    // Фиксация меню при скролле
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            pageHeader.classList.add('sticky-header');
        } else {
            pageHeader.classList.remove('sticky-header');
        }
    });

    // Открытие/закрытие мобильного меню
    if (mobMenu) {
        mobMenuOpen.addEventListener('click', () => {
            mobMenu.classList.add('active');
            bodyEl.classList.add('lock');
        });

        mobMenuClose.addEventListener('click', () => {
            mobMenu.classList.remove('active');
            bodyEl.classList.remove('lock');
        });
    }

    // Определяем, мобильное устройство или нет
    function isMobile() {
        return window.innerWidth < 1024;
    }

    // Обработка кликов по подменю на мобильных устройствах
    function handleMobileMenu() {
        dropMenuItems.forEach(item => {
            const dropIcon = item.querySelector('.drop-icon');
            const submenu = item.querySelector('.submenu');

            if (dropIcon && submenu) {
                item.addEventListener('click', handleMobileClick);
            }
        });
    }

    // Обработка кликов по подменю
    function handleMobileClick(e) {
        if (isMobile()) {
            e.preventDefault();
            e.stopPropagation();

            const dropIcon = this.querySelector('.drop-icon');
            const submenu = this.querySelector('.submenu');
            const isActive = dropIcon.classList.contains('active') && submenu.classList.contains('active');

            // Закрытие всех подменю на том же уровне
            const siblingMenus = this.parentElement.querySelectorAll('.drop-menu');
            siblingMenus.forEach(sibling => {
                const siblingIcon = sibling.querySelector('.drop-icon');
                const siblingSubmenu = sibling.querySelector('.submenu');
                if (siblingIcon && siblingSubmenu && sibling !== this) {
                    siblingIcon.classList.remove('active');
                    siblingSubmenu.classList.remove('active');
                }
            });

            // Открытие/закрытие текущего подменю
            if (isActive) {
                dropIcon.classList.remove('active');
                submenu.classList.remove('active');
            } else {
                dropIcon.classList.add('active');
                submenu.classList.add('active');
            }
        }
    }

    // Обработка ховера на десктопных устройствах
    function handleDesktopMenu() {
        const headerMenu = document.querySelector('.header-menu');

        headerMenu.addEventListener('mouseover', handleHover);
        headerMenu.addEventListener('mouseout', handleHover);
    }

    // Ховер на десктопе
    function handleHover(e) {
        if (!isMobile()) {
            const item = e.target.closest('.drop-menu');
            if (item) {
                const submenu = item.querySelector('.submenu');
                if (submenu) {
                    if (e.type === 'mouseover') {
                        submenu.classList.add('active');
                    } else if (e.type === 'mouseout') {
                        submenu.classList.remove('active');
                    }
                }
            }
        }
    }

    // Удаление старых обработчиков для мобильных устройств
    function removeMobileHandlers() {
        dropMenuItems.forEach(item => {
            item.removeEventListener('click', handleMobileClick);
        });
    }

    // Инициализация меню
    function initMenu() {
        if (isMobile()) {
            removeDesktopHandlers();
            handleMobileMenu();
        } else {
            removeMobileHandlers();
            handleDesktopMenu();
        }
    }

    // Удаление обработчиков для десктопных устройств
    function removeDesktopHandlers() {
        const headerMenu = document.querySelector('.header-menu');
        headerMenu.removeEventListener('mouseover', handleHover);
        headerMenu.removeEventListener('mouseout', handleHover);
    }

    // Перезапуск логики при изменении размера экрана
    window.addEventListener('resize', function () {
        const currentIsMobile = isMobile();
        if (currentIsMobile !== isMobileMode) {
            isMobileMode = currentIsMobile;
            initMenu(); // Перезапуск инициализации
        }
    });

    // Изначальная инициализация
    initMenu();
    /*********select-city********** */
	const trigger = document.querySelector('.select-city-trigger');
	const tabs = document.querySelector('.select-city-tabs');
	const tabButtons = document.querySelectorAll('.tab-btn');
	const tabItems = document.querySelectorAll('.tab-item');
	const customOptions = document.querySelectorAll('.custom-option');
	if(trigger){
		// Toggle visibility of tabs on trigger click
		trigger.addEventListener('click', () => {
			tabs.classList.toggle('active');
			trigger.classList.toggle('open', tabs.classList.contains('active')); // Update trigger class
		});
        tabs.querySelector('.btn-close').addEventListener('click', () => {
            tabs.classList.remove('active');
            trigger.classList.remove('open');
        });
		// Handle tab button clicks
		tabButtons.forEach((button, index) => {
			button.addEventListener('click', () => {
			// Remove active class from all tab buttons
			tabButtons.forEach(btn => btn.classList.remove('active'));
			// Add active class to the clicked tab button
			button.classList.add('active');

			// Remove active class from all tab items
			tabItems.forEach(item => item.classList.remove('active'));
			// Add active class to the tab item corresponding to the clicked button
			tabItems[index].classList.add('active');
			});
		});

		// Handle option selection
		customOptions.forEach(option => {
			option.addEventListener('click', () => {
			// Set the text of the trigger to the selected option's text
			trigger.textContent = option.textContent;
			// Hide the tab content and remove open class
			tabs.classList.remove('active');
			trigger.classList.remove('open');
			});
		});

		// Close tabs if clicked outside
		document.addEventListener('click', (event) => {
			if (!tabs.contains(event.target) && !trigger.contains(event.target)) {
			tabs.classList.remove('active');
			trigger.classList.remove('open');
			}
		});
	}
	//======= modal wrapper ========
	const modals = document.querySelectorAll('.modal-wrapper');
	if(modals.length > 0){
		const modalOpenButtons = document.querySelectorAll('[data-target]');
		const modalCloseButtons = document.querySelectorAll('[data-role]');
		for(let item of modalOpenButtons){
			
			item.addEventListener('click', (e)=>{
				const itemDataValue = item.getAttribute('data-target');
				for(let modalItem of modals ){
					const modalItemData = modalItem.getAttribute('data-modal');
					if(modalItemData == itemDataValue){
						modalItem.classList.add('active');
						bodyEl.classList.add('lock');
					}
				}
			});
			
		}
		for(let modalClose of modalCloseButtons){
			modalClose.addEventListener('click', (e)=>{
				modalClose.closest('.modal-wrapper').classList.remove('active');
				bodyEl.classList.remove('lock');
			});
		}
		for(let modal of modals){
			
			modal.addEventListener('click', (e)=>{
				if(e.target == e.currentTarget){
					modal.classList.remove('active');
					bodyEl.classList.remove('lock');
				}
			});
		}
	}
    /* CLIENTS SLIDER */
	var clientSlider = new Swiper('.our-clients-swiper',{
		slidesPerView: 'auto',
		speed: 3500,
		loop: true,
		autoplay:{
			delay: 0,
			disableOnInteraction: false,
		},
		freeMode: true,
		freeModeMomentum: false,

	});
});

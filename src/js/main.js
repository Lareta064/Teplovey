document.addEventListener("DOMContentLoaded", function () {
    $('lazy').lazy();
    // моб меню - показать по клику на бургер-иконку
	const bodyEl = document.body;
	
	const mobMenu = document.querySelector('#mob-menu');
	const pageHeader = document.querySelector('#header');

	const mobMenuOpen = document.querySelector('#toggle-menu');
	const mobMenuClose = document.querySelector('#close-menu');
	/* зафикировать меню в шапке при скролле */
	window.addEventListener('scroll', ()=>{
		if(window.scrollY > 100){
			pageHeader.classList.add('sticky-header');
		}else{
			pageHeader.classList.remove('sticky-header');
		}
	});
	if(mobMenu){
		mobMenuOpen.addEventListener('click',()=>{
			mobMenu.classList.add('active');
			bodyEl.classList.add('lock');
		});
		mobMenuClose.addEventListener('click',()=>{
			mobMenu.classList.remove('active');
			bodyEl.classList.remove('lock');
		});
	}

	let lastWindowWidth = window.innerWidth;
	window.addEventListener('resize', function () {
		let currentWindowWidth = window.innerWidth;

		// Проверяем, что ширина экрана изменилась и она больше 1023 пикселей
		if (currentWindowWidth !== lastWindowWidth && currentWindowWidth > 1023) {
			mobMenu.classList.remove('active');
			bodyEl.classList.remove('lock');
		}

		// Обновляем значение предыдущей ширины
		lastWindowWidth = currentWindowWidth;
	});

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

    // Определяем ширину экрана
    function isMobile() {
        return window.innerWidth < 1024;
    }

    const dropMenuItems = document.querySelectorAll('.header-menu-list .drop-menu');

    // Обработка кликов по подменю на мобильных устройствах
    function handleMobileMenu() {
        dropMenuItems.forEach(item => {
            const dropIcon = item.querySelector('.drop-icon');
            const submenu = item.querySelector('.submenu');

            if (dropIcon && submenu) {
                item.addEventListener('click', function(e) {
                    if (isMobile()) {
                        e.preventDefault(); // Предотвращаем переход по ссылке
                        e.stopPropagation(); // Предотвращаем всплытие события

                        // Проверяем, открыто ли текущее подменю
                        const isActive = dropIcon.classList.contains('active') && submenu.classList.contains('active');

                        // Закрываем все подменю только на том же уровне вложенности
                        const siblingMenus = item.parentElement.querySelectorAll('.drop-menu');
                        siblingMenus.forEach(sibling => {
                            const siblingIcon = sibling.querySelector('.drop-icon');
                            const siblingSubmenu = sibling.querySelector('.submenu');
                            if (siblingIcon && siblingSubmenu && sibling !== item) {
                                siblingIcon.classList.remove('active');
                                siblingSubmenu.classList.remove('active');
                            }
                        });

                        // Если текущее подменю активно, закрываем его, иначе открываем
                        if (isActive) {
                            dropIcon.classList.remove('active');
                            submenu.classList.remove('active');
                        } else {
                            dropIcon.classList.add('active');
                            submenu.classList.add('active');
                        }
                    }
                });
            }
        });
    }

    // Обработка ховера на десктопных устройствах
    function handleDesktopMenu() {
        const headerMenu = document.querySelector('.header-menu');

        headerMenu.addEventListener('mouseover', function(e) {
            if (!isMobile() && e.target.closest('.drop-menu')) {
                const item = e.target.closest('.drop-menu');
                const submenu = item.querySelector('.submenu');

                if (submenu) {
                    submenu.classList.add('active');
                }
            }
        });

        headerMenu.addEventListener('mouseout', function(e) {
            if (!isMobile() && e.target.closest('.drop-menu')) {
                const item = e.target.closest('.drop-menu');
                const submenu = item.querySelector('.submenu');

                if (submenu) {
                    submenu.classList.remove('active');
                }
            }
        });
    }

    // Инициализация
    function initMenu() {
        if (isMobile()) {
            handleMobileMenu(); // Работаем с кликами на мобильных устройствах
        } else {
            handleDesktopMenu(); // Работаем с ховером на десктопе
        }
    }

    // Перезапускаем логику при изменении размера экрана
    window.addEventListener('resize', function() {
        initMenu();
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
});

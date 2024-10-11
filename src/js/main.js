document.addEventListener("DOMContentLoaded", function () {
    // моб меню - показать по клику га бургер-иконку
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
	// моб меню - показать выпадающие меню
	const openMenuLevel2 = document.querySelectorAll('.drop-menu_2');
	const openMenuLevel3 = document.querySelectorAll('.drop-menu_3');
	const openMenuLevel4 = document.querySelectorAll('.drop-menu_4');

	function foldWithChildren(dropMenuItem) {
		let itemIcon = dropMenuItem.querySelector(".drop-icon");
		let childrenMenu = dropMenuItem.querySelector(".submenu");

		// Проверяем, существует ли элемент childrenMenu
		if (!childrenMenu) {
			return; // Если подменю нет, выходим из функции
		}

		itemIcon.classList.remove('active');
		childrenMenu.classList.remove('active');

		// Также проверяем, есть ли вложенные элементы перед тем, как пытаться их сворачивать
		let childrenMenuChildren = childrenMenu.querySelectorAll('.drop-menu');
		if (childrenMenuChildren.length > 0) {
			for (let item of childrenMenuChildren) {
				foldWithChildren(item);
			}
		}
	}
	function goUpAndFoldSiblings(dropMenuItem) {
		let ancestor = dropMenuItem.parentElement.closest('.drop-menu');

		if (ancestor == null)
			return;

		let next = dropMenuItem.nextElementSibling;
		while (next != null) {
			if (next.classList.contains("drop-menu")) {
				foldWithChildren(next);
			}
			next = next.nextElementSibling;
		}
		let prev = dropMenuItem.previousElementSibling;
		while (prev != null) {
			if (prev.classList.contains("drop-menu")) {
				foldWithChildren(prev);
			}
			prev = prev.previousElementSibling;
		}
		goUpAndFoldSiblings(ancestor);
	}

	function showSubmenu(item, subMenuClass) {
		item.addEventListener('click', function (e) {
			
			const thisIcon = this.querySelector('.drop-icon')
			const subMenuLevel = this.querySelector(`${subMenuClass}`)

			if (e.target == thisIcon) {

				if (thisIcon.classList.contains('active')) {
					foldWithChildren(item);
					
				} else {
					goUpAndFoldSiblings(item);
					subMenuLevel.classList.add('active');
					thisIcon.classList.add('active');
				}
			}
		});
	}
	for (let item of openMenuLevel2) {
		showSubmenu(item, '.submenu-2');
	}
	for (let item of openMenuLevel3) {
		showSubmenu(item, '.submenu-3');
	}
	for (let item of openMenuLevel4) {
		showSubmenu(item, '.submenu-4');
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
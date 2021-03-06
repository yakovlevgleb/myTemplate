﻿"use strict";

	window.okha = {};

	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}

	function fadeIn(elem, ms, cb, d) {
		if (!d) d = 'block';
		if (!elem) return;

		elem.style.opacity = 0;
		elem.style.display = d;

		if (ms) {
			var opacity = 0;
			var timer = setInterval(function () {
				opacity += 50 / ms;
				if (opacity >= 1) {
					clearInterval(timer);
					opacity = 1;
					if (cb) cb();
				}
				elem.style.opacity = opacity;
			}, 50);
		} else {
			elem.style.opacity = 1;
			if (cb) cb();
		}
	};

	function fadeOut(elem, ms, cb) {
		if (!elem) return;

		elem.style.opacity = 1;

		if (ms) {
			var opacity = 1;
			var timer = setInterval(function () {
				opacity -= 50 / ms;
				if (opacity <= 0) {
					clearInterval(timer);
					opacity = 0;
					elem.style.display = 'none';
					if (cb) cb();
				}
				elem.style.opacity = opacity;
			}, 50);
		} else {
			elem.style.opacity = 0;
			elem.style.display = 'none';
			if (cb) cb();
		}
	};

	function toggleClass(selector, newclass) {
		if (selector.classList) {
			selector.classList.toggle(newclass);
		} else {
			var classes = selector.className.split(' ');
			var existingIndex = classes.indexOf(newclass);

			if (existingIndex >= 0)
				classes.splice(existingIndex, 1);
			else
				classes.push(newclass);

			selector.className = classes.join(' ');
		}
	};

	window.okha.showFeatures = ({
		init: function () {
			var btns = document.querySelectorAll('.js-show-features');
			var typesBtns = document.querySelectorAll('.js-types-features');
			if(typesBtns){
				typesBtns.forEach(function(item){
					item.addEventListener('click', function () {
						typesBtns.forEach(function(item){
							toggleClass(item, 'active');
						})
						var typesFeatures = document.querySelectorAll('.types .prices__features-list');
						if(typesFeatures){
							typesFeatures.forEach(function (item) {
								toggleClass(item, 'active');
							})
						}
					});
				});

			}
			if(btns){
				btns.forEach(function(item){
					item.addEventListener('click', function () {
						if(window.innerWidth > 650){
							toggleClass(this, 'active');
							features = this.parentElement.querySelector('.prices__features-list');
							if(features)
								toggleClass(features, 'active')
						}
			
						var features;
						if(window.innerWidth < 651){
							btns.forEach(function(item){
								toggleClass(item, 'active');
							})

							features = document.querySelectorAll('.prices--main .prices__features-list');
							if(features){
								features.forEach(function (item) {
									toggleClass(item, 'active');
								})
							}

							var series = document.querySelectorAll('.prices__series');
							if(series){
								series.forEach(function (item) {
									toggleClass(item, 'active');
								})
							}

						}
					});
				})
			}
	}
	}).init();


	window.okha.featuresSwiper = ({
		init: function () {
			var featuresSwiper = document.querySelectorAll('.js-features-swiper');
			if (featuresSwiper) {
				var swiper;
				featuresSwiper.forEach(function (item) {
					var slide = item.querySelectorAll('.swiper-slide')
					if (slide.length > 1) {
						swiper = new Swiper(item, {
							slidesPerView: 4,
							speed: 800,
							spaceBetween: 30,
							loop:true,
							navigation: {
								nextEl: '.js-features-swiper .swiper-button-next',
								prevEl: '.js-features-swiper .swiper-button-prev',
							},
							breakpoints: {
								550:{
									slidesPerView: 1.07,
									loop: false,
									spaceBetween: 15
								},
								1050: {
									slidesPerView: 2,
								},
								1500: {
									slidesPerView: 3,
								}
							}
						})
					}
				})
				window.addEventListener('resize', function(){
					swiper.update();
				})
			}
		}
	}).init();

	window.okha.worksSwiper = ({
		init: function () {
			var worksSwiper = document.querySelectorAll('.js-works-swiper');
			if (worksSwiper) {
				worksSwiper.forEach(function (item) {
					var slide = item.querySelectorAll('.swiper-slide')
					if (slide.length > 1) {
						var swiper = new Swiper(item, {
							slidesPerView: 3,
							speed: 800,
							spaceBetween: 25,
							loop:true,
							navigation: {
								nextEl: '.js-works-swiper .swiper-button-next',
								prevEl: '.js-works-swiper .swiper-button-prev',
							},
							pagination: {
								el: '.js-works-swiper .swiper-pagination',
								type: 'bullets',
								clickable: 1
							},
							breakpoints: {
								600:{
									slidesPerView: 1
								},
								1150: {
									slidesPerView: 2,
								},
							}
						})
					}
				})
			}
		}
	}).init();

	window.okha.worksAboutSwiper = ({
		init: function () {
			var worksSwiper = document.querySelectorAll('.about-page .js-works-swiper');
			if (worksSwiper) {
				worksSwiper.forEach(function (item) {
					var slide = item.querySelectorAll('.swiper-slide')
					if (slide.length > 1) {
						var swiper = new Swiper(item, {
							slidesPerView: 3,
							speed: 800,
							spaceBetween: 25,
							navigation: {
								nextEl: '.js-works-swiper .swiper-button-next',
								prevEl: '.js-works-swiper .swiper-button-prev',
							},
							pagination: {
								el: '.js-works-swiper .swiper-pagination',
								type: 'bullets',
								clickable: 1
							},
							breakpoints: {
								600:{
									slidesPerView: 1
								},
								1150: {
									slidesPerView: 2,
								},
							}
						})
					}
				})
			}
		}
	}).init();

	window.okha.waves = ({
		init: function(){
			var btnNext = document.querySelector('.main-page .js-works-swiper .swiper-button-next');
			var btnPrev = document.querySelector('.main-page .js-works-swiper .swiper-button-prev');
			if(btnNext){
				var length = 0;
				btnNext.addEventListener('click', function(){
					var wave = document.querySelector('.reviews__wave');
					if (wave){
						if(window.innerWidth < 650){
							length = length - 80;
						}
	
						else if(window.innerWidth < 1200){
							length = length - 200;
						}
						else
							length = length - 300;
						wave.style.backgroundPositionX = length + 'px';
					}

				})
			}

			if(btnPrev){
				var length = 0;
				btnPrev.addEventListener('click', function(){
					var wave = document.querySelector('.reviews__wave');
					if (wave){
						if(window.innerWidth < 650){
							length = length + 80;
						}

						else if (window.innerWidth < 1200){
							length = length + 200;
						}
						else
							length = length + 300;
						wave.style.backgroundPositionX = length + 'px';
				}
				})
			}
		}
	}).init();
	
	window.okha.pricesSwiper = ({
		init: function () {

			var swiper;
			var swipers = [];
			var flag;

			var firstSwiper = document.querySelector('.js-prices-windows-swiper');
			if (firstSwiper){
				var slide = firstSwiper.querySelectorAll('.swiper-slide');

				if (slide.length > 4) {
					firstSwiper.classList.add('swiped');
				}
			}

			function enableWindowsSwiper() {

				var pricesWindowsSwiper = document.querySelectorAll('.js-prices-swiper');
				if (pricesWindowsSwiper){
					pricesWindowsSwiper.forEach(function(item){
						var slide = item.querySelectorAll('.swiper-slide');

						// if (slide.length > 4) {
						// 	item.classList.add('swiped');
						// }

							swiper = new Swiper(item, {
								slidesPerView: 4,
								speed: 800,
								// loop: true,
								allowTouchMove: false,
								spaceBetween: 30,
								navigation: {
									nextEl: '.js-prices-swiper .swiper-button-next',
									prevEl: '.js-prices-swiper .swiper-button-prev',
								},
								pagination: {
									el: '.js-prices-swiper .swiper-pagination',
									type: 'bullets',
									clickable: 1
								},
								breakpoints:{
									1150:{
										slidesPerView: 1,
										allowTouchMove: true
									},
									1500:{
										slidesPerView: 3
									},
								}
							})

						swipers.push(swiper);
						
					})
				}

			}

				enableWindowsSwiper();

				if(document.querySelectorAll('.js-prices-switcher')){
					document.querySelectorAll('.js-prices-switcher').forEach(function(item){
						item.addEventListener('click', function(){
							setTimeout(function(){
								swipers.forEach(function(item){
									item.update();

									var balconies = document.querySelector('.js-prices-balconies-swiper');
									if (balconies){
										var slide = balconies.querySelectorAll('.swiper-slide');
										if (slide.length > 4) {
											balconies.classList.add('swiped');
										}
									}
					
								});
								
							}, 170)
							
						})
					})
				}
			

			
			window.addEventListener('resize', () => {

				if(window.innerWidth > 1500){ 
					if (swiper!=undefined){
						swipers.forEach(function(item){
							setTimeout(function(){
								item.update();
							}, 170)
						});
						flag = true;
						return false;
					}
				}
				else{
					if(swiper == undefined){
						enableWindowsSwiper();
						if(document.querySelectorAll('.js-prices-switcher')){
							document.querySelectorAll('.js-prices-switcher').forEach(function(item){
								item.addEventListener('click', function(){
									setTimeout(function(){
										swipers.forEach(function(item){
											item.update();
										});
									}, 170)
									
								})
							})
						}
					}
					// else{
					// 	if(flag==true){
					// 		enableWindowsSwiper();
					// 		flag=false;
					// 	}
					// }
				}
			});

		}
	}).init();

	window.okha.componentsSwiper = ({
		init: function(){

			var flag;
			var swiper;
			var swipers = [];
			var componentsSwiper = document.querySelectorAll('.js-components-swiper');

			function enableSwiper() {

					if(componentsSwiper){
						componentsSwiper.forEach(function(item){
							swiper = new Swiper(item, {
								slidesPerView: 3,
								speed: 800,
								loop: true,
								spaceBetween: 30,
								navigation: {
									nextEl: '.js-components-swiper .swiper-button-next',
									prevEl: '.js-components-swiper .swiper-button-prev',
								},
								pagination: {
									el: '.js-components-swiper .swiper-pagination',
									type: 'bullets',
									clickable: 1
								},
								breakpoints: {
									450:{
										slidesPerView: 1,
									},
									650:{
										slidesPerView: 2,
									}
								}
							})
							swipers.push(swiper);
							console.log(swipers)
						})
					}
			}

			if(window.innerWidth < 769){

				enableSwiper();

				if(document.querySelectorAll('.js-components-switcher')){
					document.querySelectorAll('.js-components-switcher').forEach(function(item){
						item.addEventListener('click', function(){
							setTimeout(function(){
								swipers.forEach(function(item){
									item.update();
								});
							}, 50)
							
						})
					})
				}
			}

			
			window.addEventListener('resize', () => {

				if(window.innerWidth > 768){
					if (swiper!=undefined){
						swipers.forEach(function(item){
							item.destroy();
						});
						flag = true;
						return false;
					}
				}
				else{
					if(swiper == undefined){
						enableSwiper();
						if(document.querySelectorAll('.js-components-switcher')){
							document.querySelectorAll('.js-components-switcher').forEach(function(item){
								item.addEventListener('click', function(){
									setTimeout(function(){
										swipers.forEach(function(item){
											item.update();
										});
									}, 50)
									
								})
							})
						}
					}
					else{
						if(flag==true){
							enableSwiper();
							flag=false;
						}
					}
				}
			});
		
		
		}
	}).init();
	
	window.okha.typesSwiper = ({
		init: function(){
			var typesSwiper = document.querySelector('.js-types-swiper');
			if (typesSwiper) {
					var swiper = new Swiper(typesSwiper, {
						slidesPerView: 4,
						speed: 800,
						spaceBetween: 30,
						navigation: {
							nextEl: '.js-types-swiper .swiper-button-next',
							prevEl: '.js-types-swiper .swiper-button-prev',
						},
						pagination: {
							el: '.js-types-swiper .swiper-pagination',
							type: 'bullets',
							clickable: 1
						},
						breakpoints: {
							650:{
								loop: true,
								slidesPerView: 1,
							},
							749:{
								loop: true,
								slidesPerView: 2,
							},
							1500:{
								loop: true,
								slidesPerView: 3,
							},
						}
					})

			}
		}
	}).init();

	window.okha.reviewsSwiper = ({
		init: function () {
			var reviewsSwiper = document.querySelector('.js-reviews-swiper');
			if (reviewsSwiper) {
					var slide = reviewsSwiper.querySelectorAll('.swiper-slide')
					if (slide.length > 1) {
						var swiper = new Swiper(reviewsSwiper, {
							slidesPerView: 3,
							speed: 800,
							spaceBetween: 30,
							navigation: {
								nextEl: '.js-reviews-swiper .swiper-button-next',
								prevEl: '.js-reviews-swiper .swiper-button-prev',
							},
							pagination: {
								el: '.js-reviews-swiper .swiper-pagination',
								type: 'bullets',
								clickable: 1
							},
							breakpoints: {
								749:{
									loop: true,
									slidesPerView: 1
								},
								1365:{
									loop: true,
									slidesPerView: 2,
								},
								1770: {
									slidesPerView: 2,
								},
							}
						})
					}

			}
		}
	}).init();

	window.okha.switcher = ({
		init: function () {

			var switcher = document.querySelectorAll('.js-switcher');
			if (switcher) {
				switcher.forEach(function (item) {
					item.addEventListener('click', function () {
						var switcher = document.querySelectorAll('.js-switcher');
			
						var bg = this.parentElement.querySelector('.tab--bg');
						switcher.forEach(function (elem) {
							elem.classList.remove('tab--active');
						});
						
						this.classList.add('tab--active');
						if (item.classList.contains('js-prices-switcher')) {
							var w = this.offsetWidth;
						} else {
							var w = this.offsetWidth + 2;
						}
						
						bg.setAttribute('style', 'left:' + this.offsetLeft + 'px ; width:' + w + 'px');

						if(this.classList.contains('prices__tab')){

							if (item.classList.contains('js-prices-switcher')) {
								w = this.offsetWidth;
							} else {
								w = this.offsetWidth - 2;
							}
							
							bg.setAttribute('style', 'left:' + this.offsetLeft + 'px ; width:' + w + 'px');
						}
					});

				})
			}

			window.addEventListener('resize', function(){
				var switcher = document.querySelectorAll('.js-switcher.tab--active');
				if(switcher){
					switcher.forEach(function(item){
						var bg = item.parentElement.querySelector('.tab--bg');
						bg.setAttribute('style', 'left:' + item.offsetLeft + 'px ; width:' + item.offsetWidth + 'px');
					})
				}
				
			})

		}
	}).init();

	window.okha.inputFocus = ({
		init: function () {
			var input = document.querySelectorAll('.js-input');
			if(input){
				input.forEach(function (item) {
					item.addEventListener('focus', function () {
						this.classList.add('not-empty');
						this.addEventListener('focusout', function (item) {
							if(this.value == '')
								this.classList.remove('not-empty');
						})
				});
			})
			}
	}
	}).init();

	window.okha.validation = ({

		init: function () {
			var t = this;
			if (document.querySelectorAll('.js-validate').length !== null) {
				document.querySelectorAll('.js-validate').forEach(function (form) {
					form.addEventListener('submit', function (e) {
						if (!t.checkForm(form)) {
							e.preventDefault();
							e.stopPropagation();
						}
					});
				});
			}

			if (document.querySelectorAll('.js-input').length !== null) {
				document.querySelectorAll('.js-input').forEach(function (input) {
					input.addEventListener('keyup', function () {
						var re;
						if (input.getAttribute('data-req')) {
							switch (input.getAttribute('data-type')) {
								case 'phone':
									// re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
									if (input.value.length > 15) {
										input.classList.add('good');
										input.classList.remove('warning');
									} 
									else{
										if(input.classList.contains('good')){
											input.classList.add('warning');
											input.classList.remove('good');
										}
									}
									break;
								case 'email':
									re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
									if (re.test(input.value)) {
										input.classList.add('good');
										input.classList.remove('warning');
									} 
									else{
										if(input.classList.contains('good')){
											input.classList.add('warning');
											input.classList.remove('good');
										}
									}
									break;
							}
						}

					});
				});
			}

			return this;
		},

		checkForm: function (form) {
			var checkResult = true;
			var warningElems = form.querySelectorAll('.warning');
			var formElems = form.querySelectorAll('input, textarea, select');
			var agreementElems = form.querySelectorAll('input[name^=agreement]');

			if (warningElems.length) {
				warningElems.forEach(function (warningElem) {
					warningElem.classList.remove('warning');
				});
			}

			if (formElems.length) {
				formElems.forEach(function (elem) {
					var re;
					if (elem.getAttribute('data-req')) {
						switch (elem.getAttribute('data-type')) {
							case 'phone':
								// re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
								if (elem.value.length < 16) {
									elem.classList.add('warning');
									elem.classList.remove('good');
									checkResult = false;
								} else {
									elem.classList.add('good');
								}
								break;
							case 'email':
								re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
								if (!re.test(elem.value)) {
									elem.classList.add('warning');
									elem.classList.remove('good');
									checkResult = false;
								} else {
									elem.classList.add('good');
								}
								break;
						}
					}
					else{
						if(elem.getAttribute('data-type') == 'name'){
							if (elem.value.trim() !== '') {
								elem.classList.add('good');
							}
						}
					}
				});
			}

			if (agreementElems.length) {
				agreementElems.forEach(function (item) {
					if (!item.checked) {
						item.classList.add('warning');
						checkResult = false;
					}
				});
			}

			return checkResult;
		}
	}).init();

	window.okha.checkPhone = ({
		init: function () {
			var phoneMask = document.querySelectorAll('.js-phone-mask');
			if (phoneMask) {
				phoneMask.forEach(function (item) {
					new IMask(item, {
						mask: '+{7}(000)000-00-00'
					});
				});
			}
		}
	}).init();


	window.okha.checkCheckbox = ({
		init: function () {

			document.querySelectorAll('.js-checkbox-check').forEach(function (elem) {
				elem.addEventListener('change', function () {
					if (elem.checked)
						elem.classList.remove('warning')
				})
			})
		}
	}).init();

	
	window.okha.orderPopup= ({
		init: function(){
			var btn = document.querySelectorAll('.js-make-order');
			var popup = document.querySelector('.js-order-popup');
			var overlay = document.querySelector('.order-popup');
			var body = document.querySelector('body');

			if(btn){
				btn.forEach(function(item) {
					item.addEventListener('click', function(){
						if(popup)
							popup.classList.add('active');
						if(overlay)
							overlay.classList.add('active');
						body.classList.add('ovh');
					})
				});
			}
		}
	}).init();

	window.okha.projectPopup= ({
		init: function(){
			var btn = document.querySelectorAll('.js-show-project');
			var popup = document.querySelector('.js-project-popup');
			var overlay = document.querySelector('.project-popup');
			var body = document.querySelector('body');

			if(btn){
				btn.forEach(function(item) {
					item.addEventListener('click', function(){
						if(popup)
							popup.classList.add('active');
						if(overlay)
							overlay.classList.add('active');
						body.classList.add('ovh');
					})
				});
			}
		}
	}).init();


	window.okha.reviewPopup= ({
		init: function(){
			var btn = document.querySelectorAll('.js-show-review');
			var popup = document.querySelector('.js-project-popup');
			var overlay = document.querySelector('.project-popup');
			var body = document.querySelector('body');

			if(btn){
				btn.forEach(function(item) {
					item.addEventListener('click', function(){
						if(popup)
							popup.classList.add('active');
						if(overlay)
							overlay.classList.add('active');
						body.classList.add('ovh');
					})
				});
			}
		}
	}).init();

	window.okha.openMenu = ({
		init: function(){
			var burger = document.querySelector('.js-burger');
			var menu = document.querySelector('.menu');
			var overlay = document.querySelector('.overlay');
			var body = document.querySelector('body');

			burger.addEventListener('click', function(){

				if(window.innerWidth > 749){
					toggleClass(burger, 'active');
					if(burger.classList.contains('active')){
						if(menu)
							menu.classList.add('active');
						if(overlay)
							overlay.classList.add('active');
						body.classList.add('ovh');
					}
					else{
						if(menu)
							menu.classList.remove('active');
						if(overlay)
							overlay.classList.remove('active');
						body.classList.remove('ovh');
					}
				}
				else{
					toggleClass(burger, 'active');
					toggleClass(body, 'menu-opened');
					toggleClass(body, 'fixed');
				}


			})
		}
	}).init();

	window.okha.menuResponsive = ({
		init: function(){
			if(window.innerWidth < 750){
				var link = document.querySelectorAll('.menu__nav-link');
				var nav = document.querySelector('.menu__nav-wrapper');
				var overlay = document.querySelector('.overlay');
				var innerLink= document.querySelectorAll('.menu__link-resp');
	
				if(link){
					link.forEach(function(item){
						item.addEventListener('click', function(){
							this.parentElement.classList.add('active');
							var subnav = this.parentElement.querySelector('.menu__subnav-list');
							setTimeout(() => {
								fadeIn(subnav);
							}, 100);
							if(nav){
								nav.classList.add('hide');
								overlay.classList.add('menu-step2')
							}
						})
					})
				}

				if(innerLink){
					innerLink.forEach(function(item){
						item.addEventListener('click', function(){
							var subnav = this.parentElement.querySelector('.menu__subnav-list');
							setTimeout(() => {
								fadeOut(subnav, 400);
							}, 400);
							
							if(nav){
								nav.classList.remove('hide');
								overlay.classList.remove('menu-step2');
							}
							if(link){
								link.forEach(function(item){
									item.parentElement.classList.remove('active');
								})
							}
						})
					})
				}
			}
		}
	}).init()
	
	window.okha.closeMenuPopup = ({
		init: function(){
			var overlay = document.querySelector('.overlay');
			var burger = document.querySelector('.js-burger');
			if(overlay){
				overlay.addEventListener('click', function (e) {
					if(e.target !== e.currentTarget) return;
					else{
						document.querySelectorAll('.popup').forEach((elem) => {
							elem.classList.remove('active')
					  })
					  overlay.classList.remove('active');
					  document.querySelector('body').classList.remove('ovh');
					  burger.classList.remove('active')
					}
				});
			}
	}
	}).init();


	window.okha.closePopups = ({
		init: function(){
			var overlay = document.querySelectorAll('.popup-overlay');
			var btn = document.querySelectorAll('.js-popup-close');
			if(overlay){
				overlay.forEach(function(item){
					item.addEventListener('click', function (e) {
						if(e.target !== e.currentTarget) return;
						else{
							document.querySelectorAll('.popup').forEach((elem) => {
								elem.classList.remove('active')
						  })
						  item.classList.remove('active');
						  document.querySelector('body').classList.remove('ovh');
						}
					});
				})
			}
			if(btn){
				btn.forEach(function(item){
					item.addEventListener('click', function (e) {
						document.querySelectorAll('.popup-overlay').forEach((elem) => {
							elem.classList.remove('active')
					  })
						document.querySelectorAll('.popup').forEach((elem) => {
							elem.classList.remove('active')
					  })
						document.querySelector('body').classList.remove('ovh');
					});
				})
			}
	}
	}).init();

	window.okha.projectGallerySwipre = ({
		init: function(){

			var galleryThumbs = new Swiper('.gallery-thumbs', {
				spaceBetween: 10,
				slidesPerView: 8,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
				breakpoints: {
					650:{
						slidesPerView: 4,
					},
					1023:{
						slidesPerView: 6,
					},
				}
			 });


			 var galleryTop = new Swiper('.gallery-top', {
				spaceBetween: 10,
				loop:true,
				navigation: {
				  nextEl: '.swiper-button-next',
				  prevEl: '.swiper-button-prev',
				},
				thumbs: {
				  swiper: galleryThumbs,
				},
			 });

			var slides = document.querySelectorAll('.gallery-thumbs .swiper-slide');
			if(slides){
				if ((slides.length < 8) && (slides.length > 0))
					document.querySelector('.gallery-thumbs').classList.add('centered');
			}
			
		}
	}).init();

	window.okha.contacts = ({

		init: function() {
			if(document.querySelector('#map')){
				ymaps.ready(init);
				function init(){
					 var myMap = new ymaps.Map("map", {
						  center: [55.168388, 61.533708],
						  zoom: 14,
						  controls: []
							},
						  {
							suppressMapOpenBlock: true,
						  });

						  myMap.behaviors.disable('scrollZoom'); 
					 }
				}
			}
  
	 }).init();

	window.okha.readAnswer = ({
		init: function(){
			var links = document.querySelectorAll('.js-read-answer');
			if(links){
				links.forEach(function(item){
					item.addEventListener('click', function(){
						this.classList.remove('active');
						// this.parentElement.parentElement.classList.add('active');
						this.nextElementSibling.classList.add('active');
						fadeIn(this.parentElement.nextElementSibling, 500);
					})
				})
			}
		}
	}).init();

	window.okha.hideAnswer = ({
		init: function(){
			var links = document.querySelectorAll('.js-hide-answer');
			if(links){
				links.forEach(function(item){
					item.addEventListener('click', function(){
						this.classList.remove('active')
						this.previousElementSibling.classList.add('active');
						fadeOut(this.parentElement.nextElementSibling);
					})
				})
			}
		}
	}).init();

	window.okha.chooseRequestTime = ({
		init: function(){
			var btnUp = document.querySelectorAll('.js-time-up');
			var btnDown = document.querySelectorAll('.js-time-down');
			if (btnUp){
				btnUp.forEach(function(item){
					item.addEventListener('click', function(){
						var close = this.parentElement.parentElement.querySelector('.js-time-refresh');
						fadeIn(close);
						if(this.nextElementSibling.classList.contains('disabled'))
							this.nextElementSibling.classList.remove('disabled');
						this.parentElement.parentElement.querySelector('.request__time-input').stepUp(60);
						var defaultValMin = document.querySelector('.request__time-control--from .request__time-input').defaultValue;
						var defaultValMax = document.querySelector('.request__time-control--to .request__time-input').defaultValue;
						var currentVal = this.parentElement.parentElement.querySelector('.request__time-input').value;
						if((currentVal == defaultValMin) || (currentVal == defaultValMax)){
							this.classList.add('disabled');
							fadeOut(close);
						}
					})
				})

			}
			if (btnDown){
				btnDown.forEach(function(item){
					item.addEventListener('click', function(){
						var close = this.parentElement.parentElement.querySelector('.js-time-refresh');
						fadeIn(close);
						if(this.previousElementSibling.classList.contains('disabled'))
							this.previousElementSibling.classList.remove('disabled');
						this.parentElement.parentElement.querySelector('.request__time-input').stepDown(60);
						var defaultValMin = document.querySelector('.request__time-control--from .request__time-input').defaultValue;
						var defaultValMax = document.querySelector('.request__time-control--to .request__time-input').defaultValue;
						var currentVal = this.parentElement.parentElement.querySelector('.request__time-input').value;
						if((currentVal == defaultValMin) || (currentVal == defaultValMax)){
							this.classList.add('disabled');
							fadeOut(close);
						}
	
					})
				})
			}
		}
	}).init();

	window.okha.refreshRequestTime = ({
		init: function(){
			var btns = document.querySelectorAll('.js-time-refresh')
			if(btns){
				btns.forEach(function(item){
					item.addEventListener('click', function(){
						fadeOut(this);
						if(this.parentElement.classList.contains('request__time-control--from'))
							this.nextElementSibling.querySelector('.js-time-down').classList.add('disabled');
						if(this.parentElement.classList.contains('request__time-control--to'))
							this.nextElementSibling.querySelector('.js-time-up').classList.add('disabled');
						var defaultVal = this.previousElementSibling.defaultValue;
						this.previousElementSibling.value = defaultVal;
					})
				})
			}
		}
	}).init()

	window.okha.changeType = ({
		init: function(){
			var types = document.querySelectorAll('.js-change-type');
			if(types){
				types.forEach(function(item){
					item.addEventListener('click', function(){
						types.forEach(function(type){
							type.classList.remove('active')
						})
						this.classList.add('active');
						var image = document.querySelector('.calculation__img');
						image.src = this.getAttribute('data-src');
					})
				})
			}
		}
	}).init();

	window.okha.rangeslider = ({
		init: function(){
			var slider1 = document.getElementById('range-vertical');
			var slider2 = document.getElementById('range-horizontal');
			if(slider1){
				noUiSlider.create(slider1, {
					start: 250,
					connect: [true, false],
					direction: 'rtl',
					orientation: "vertical",
					range: {
						 'min': 0,
						 'max': 500
					},
			  });
			}

			if(slider2){
				noUiSlider.create(slider2, {
					start: 250,
					connect: [true, false],
					range: {
							'min': 0,
							'max': 500
					},
					});
			}

			var value1 = document.getElementById('range-vertical-value');
			var value2 = document.getElementById('range-horizontal-value');

			if(value1){
				slider1.noUiSlider.on('update', function (values, handle) {
					value1.innerHTML = Math.round(values[handle]) + ' мм';
				});
			}

			if(value2){
				slider2.noUiSlider.on('update', function (values, handle) {
					value2.innerHTML = Math.round(values[handle]) + ' мм';
				});
			}
		}
	}).init();

	window.okha.marker = ({
		init: function(){
			var markers = document.querySelectorAll('.js-marker');
			markers.forEach(function(item){
				item.addEventListener('click', function(){
					if(this.classList.contains('active'))
						this.classList.remove('active')
					else{
						markers.forEach(function(marker){
							marker.classList.remove('active');
						})
						this.classList.add('active')
					}
				})
			})
		}
	}).init();

	window.okha.footerAnimation = ({
		init: function(){

			setTimeout(function() {
				window.addEventListener('scroll', scrollHandler)
			}, 100);
    
			function visChecker(el) {
			  const rect = el.getBoundingClientRect();
			  const wHeight = window.innerHeight || document.documentElement.clientHeight;
			  return rect.top <= wHeight 
			}

			function scrollHandler() {
				if (visChecker(document.querySelector('.footer'))) {
					document.querySelector('.footer').classList.add('animated')
				} 
				else {
					document.querySelector('.footer').classList.remove('animated')
				}
			}
		}
	}).init();

	window.okha.reviewGallery = ({
		init: function(){
			var lightgallery = document.querySelectorAll('.js-lightgallery');
			if (lightgallery) {
				lightgallery.forEach(function (item) {
					lightGallery(item, {
						youtubePlayerParams: {
							modestbranding: 1,
							showinfo: 0,
							rel: 0,
							controls: 0
						}
					});
				});
			}
		}
	}).init();
	
	window.okha.pricesSwitcher = ({
		init: function(){
			var switcher = document.querySelectorAll('.js-prices-switcher');
			if(switcher){
				switcher.forEach(function(item){
					item.addEventListener('click', function(){
						var id = this.getAttribute('data-prices');
						var prices = document.querySelectorAll('.prices__wrapper');
						if(prices)
							{
								if(window.innerWidth > 1023){
									if (id == 'windows') {
										fadeOut(document.getElementById('balconies'), 100);
									} else {
										fadeOut(document.getElementById('windows'), 100);
									}

									setTimeout(() => {
										fadeIn(document.getElementById(id), 100);
									}, 100);
								}
								else{
									if (id == 'windows') {
										fadeOut(document.getElementById('balconies'), 0);
									} else {
										fadeOut(document.getElementById('windows'), 0);
									}

									fadeIn(document.getElementById(id), 500);
								}
							}
						
					})
				})
			}
		}
	}).init();

	window.okha.componentsSwitcher = ({
		init: function(){
			var switcher = document.querySelectorAll('.js-components-switcher');
			if (switcher){
				switcher.forEach(function(item){
					item.addEventListener('click', function(){
						var id = this.getAttribute('data-comp');
						var components = document.querySelectorAll('.components__swiper');
						if(components)
							{
								if(window.innerWidth > 1023){
									components.forEach(function(item){
										fadeOut(item, 100);
									})
									setTimeout(() => {
										fadeIn(document.getElementById(id), 100);
									}, 100);
								}
								else{
									components.forEach(function(item){
										fadeOut(item, 0);
									});
									fadeIn(document.getElementById(id), 500);
									// components.forEach(function(item){
									// 	setTimeout(() => {
									// 		fadeOut(item, 0);
									// 	}, 300);
										
									// })
									// setTimeout(() => {
									// 	fadeIn(document.getElementById(id), 200);
									// }, 500);
								}
							}
						
					})
				})
			}
		}
	}).init();


/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnMobileMenu
 * @description
 * # vnMobileMenu
 */

angular.module('Volusion.controllers')
	.directive('vnMobileMenu', ['$rootScope', function ($rootScope) {

		'use strict';

		return {
			restrict   : 'A',
			templateUrl: '../views/partials/mobile-menu.html',
			link : function postLink() {

				var menu = $('.th-mobile-menu');

				$rootScope.openMobileMenu = function(){
					menu.removeClass('th-mobile-menu--closed');
					menu.addClass('th-mobile-menu--open');
					$('body').addClass('mobile-menu-active');
					$rootScope.isMobileMenuOpen = true;
					$rootScope.$emit('mobile-menu-open');
					$rootScope.closeCart();
				};
				$rootScope.closeMobileMenu = function(){
					menu.removeClass('th-mobile-menu--open');
					menu.addClass('th-mobile-menu--closed');
					$('body').removeClass('mobile-menu-active');
					$rootScope.isMobileMenuOpen = false;
					$rootScope.$emit('mobile-menu-closed');
				};
				$rootScope.toggleMobileMenu = function(){
					if($rootScope.isMobileMenuOpen){
						$rootScope.closeMobileMenu();
					}
					else{
						$rootScope.openMobileMenu();
					}
				};
				$rootScope.$on('device.desktop', function() {
					$rootScope.closeMobileMenu();
				});
			}
		};
	}]
);

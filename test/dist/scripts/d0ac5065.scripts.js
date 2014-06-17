"use strict";angular.module("Volusion.directives",[]),angular.module("Volusion.filters",[]),angular.module("Volusion.services",[]),angular.module("Volusion.decorators",[]),angular.module("Volusion.controllers",[]),angular.module("methodApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngTouch","snap","seo","services.config","angulartics","Volusion.toolboxCommon","Volusion.controllers","Volusion.decorators","Volusion.directives","Volusion.filters","Volusion.services","Volusion.google.tagmanager"]).config(["$routeProvider","$locationProvider",function(a,b){b.html5Mode(!0),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/:productTitle/p/:productCode",{temnplateUrl:"views/product.html",controller:"ProductCtrl"}).when("/:categoryName/c/:categoryId",{templateUrl:"views/category.html",controller:"CategoryCtrl"}).when("/style-guide",{templateUrl:"views/style-guide.html",controller:"PageCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"PageCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"PageCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("methodApp").controller("MainCtrl",["$scope",function(a){$rootScope.seo={},a.$on("$stateChangeSuccess",function(b,c){"i18n"===c.name?$state.go(".home",null,{location:"replace"}):"i18n.home"===c.name&&a.config&&($rootScope.seo=angular.extend($rootScope.seo,a.config.seo))}),this.getMenuItems=function(){api.navs.get({navId:1}).then(function(b){a.categories=b.data,console.log("Categories: ",b.data)},function(a){console.log("Error: "+a)})},this.getConfig=function(b){api.config.get(tokenGenerator.getCacheBustingToken()).then(function(c){a.config=c.data,angular.extend($rootScope.seo,a.config.seo),console.log("Config: ",c.data),b&&b(a.config.checkout.cartId)},function(a){console.log("Error: ",a)})},this.getCart=function(b){api.carts.get({cartId:b}).then(function(b){a.cart=b.data,console.log("Cart: ",b.data)},function(a){console.log("Error: ",a)})},this.getMenuItems(),this.getConfig(this.getCart),$rootScope.viewCart=function(){return $rootScope.isInDesktopMode?"/shoppingcart.asp":"/checkout.asp"},$rootScope.$on("ADD_TO_CART",function(b,c){var d=c.pricing,e={id:c.id,code:c.code,name:c.name,options:c.options,quantity:c.qty,pricing:{unitPrice:d.salePrice>0?d.salePrice:d.regularPrice,recurringPrice:d.recurringPrice}};api.carts.save({cartId:a.cart.id||a.config.checkout.cartId},e).then(function(b){a.cart=b.data,$rootScope.$emit("ITEM_ADDED_TO_CART")})})}]),angular.module("methodApp").controller("CategoryCtrl",["$scope",function(a){$rootScope.seo={},a.$on("$stateChangeSuccess",function(b,c){"i18n"===c.name?$state.go(".home",null,{location:"replace"}):"i18n.home"===c.name&&a.config&&($rootScope.seo=angular.extend($rootScope.seo,a.config.seo))}),this.getMenuItems=function(){api.navs.get({navId:1}).then(function(b){a.categories=b.data,console.log("Categories: ",b.data)},function(a){console.log("Error: "+a)})},this.getConfig=function(b){api.config.get(tokenGenerator.getCacheBustingToken()).then(function(c){a.config=c.data,angular.extend($rootScope.seo,a.config.seo),console.log("Config: ",c.data),b&&b(a.config.checkout.cartId)},function(a){console.log("Error: ",a)})},this.getCart=function(b){api.carts.get({cartId:b}).then(function(b){a.cart=b.data,console.log("Cart: ",b.data)},function(a){console.log("Error: ",a)})},this.getMenuItems(),this.getConfig(this.getCart),$rootScope.viewCart=function(){return $rootScope.isInDesktopMode?"/shoppingcart.asp":"/checkout.asp"},$rootScope.$on("ADD_TO_CART",function(b,c){var d=c.pricing,e={id:c.id,code:c.code,name:c.name,options:c.options,quantity:c.qty,pricing:{unitPrice:d.salePrice>0?d.salePrice:d.regularPrice,recurringPrice:d.recurringPrice}};api.carts.save({cartId:a.cart.id||a.config.checkout.cartId},e).then(function(b){a.cart=b.data,$rootScope.$emit("ITEM_ADDED_TO_CART")})})}]),angular.module("methodApp").controller("ProductCtrl",["$scope",function(a){a.$on("$stateChangeSuccess",function(){$location.hash("top"),$anchorScroll(),$location.hash("")});var b=a.product=product.data;a.product.quantity=1,angular.extend(a.seo,product.data.seo),a.sceDescriptions=angular.copy(b.descriptions),angular.forEach(["detail","features","techSpecs","extendedInfo"],function(b){a.sceDescriptions[b]=$sce.trustAsHtml(a.sceDescriptions[b])}),a.interval=4e3,a.isopen1=!0,api.relatedProducts.get({code:$stateParams.productCode,pageNumber:1,pageSize:4}).then(function(b){a.relatedProducts=b.data}),api.accessories.get({code:$stateParams.productCode,pageNumber:1,pageSize:4}).then(function(b){a.accessories=b.data}),api.reviews.get({code:$stateParams.productCode}).then(function(b){a.ratingsAndReviews=b}),a.showAltImage=function(a){var c=a.image;b.mainImage=c},a.decrementQty=function(){a.product.quantity--},a.incrementQty=function(){a.product.quantity++},a.isCartButtonDisabled=!1,a.addToCart=function(){var b=a.product;a.isCartButtonDisabled=!0;var c=b.price,d={id:b.id,code:b.code,name:b.name,qty:b.quantity,options:b.options,pricing:c};$rootScope.$emit("ADD_TO_CART",d)},$rootScope.$on("ITEM_ADDED_TO_CART",function(){a.isCartButtonDisabled=!1,console.log("Item added to cart")});var c=$location.absUrl(),d=a.seo.metaTagTitle;a.product.sharing={facebook:"http://www.facebook.com/sharer.php?u="+c+"/",twitter:"http://twitter.com/share?url="+c+"&amp;text="+d,tumblr:"http://www.tumblr.com/share/link?url="+c+"&amp;name="+d,googlePlus:"https://plus.google.com/share?url="+c}}]);
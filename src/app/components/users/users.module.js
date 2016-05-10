/* global toastr */
(function () {
	"use strict";

	angular
		.module('pg.users', ['pg.urls'])
		.constant('toastr', toastr);
})();

/* global toastr */
(function () {
	"use strict";

	angular
		.module('pg.superadmin', ['pg.urls'])
		.constant('toastr', toastr);
})();

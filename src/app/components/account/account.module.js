/* global toastr */
(function () {
	"use strict";

	angular
		.module('pg.account', ['LocalStorageModule', 'pg.urls'])
		.constant('toastr', toastr);
})();

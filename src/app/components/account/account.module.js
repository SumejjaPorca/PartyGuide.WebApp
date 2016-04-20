/* global toastr */
(function () {
	"use strict";

	angular
		.module('pg.account', ['LocalStorageModule', 'pg.urls', 'vcRecaptcha'])
		.constant('toastr', toastr);
})();

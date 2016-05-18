/* global toastr */
(function () {
	"use strict";

	angular
		.module('pg.reviews', ['pg.urls', 'pg.account', 'ui.bootstrap'])
		.constant('toastr', toastr);
})();

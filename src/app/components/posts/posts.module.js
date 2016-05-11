/* global toastr */
(function () {
	"use strict";

	angular
		.module('pg.posts', ['pg.urls', 'pg.account', 'ui.bootstrap'])
		.constant('toastr', toastr);
})();

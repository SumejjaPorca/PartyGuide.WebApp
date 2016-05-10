/* global toastr */
(function () {
	"use strict";

	angular
		.module('pg.bars', ['pg.urls', 'pg.account', 'ui.bootstrap'])
		.constant('toastr', toastr);
})();

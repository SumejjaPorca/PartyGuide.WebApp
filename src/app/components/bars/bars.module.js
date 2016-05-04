/* global toastr */
(function () {
	"use strict";

	angular
		.module('pg.bars', ['pg.urls', 'pg.account'])
		.constant('toastr', toastr);
})();

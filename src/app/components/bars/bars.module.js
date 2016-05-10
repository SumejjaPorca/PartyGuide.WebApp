/* global toastr */
(function () {
	"use strict";

	angular
		.module('pg.bars', ['pg.urls', 'pg.account', 'uiGmapgoogle-maps'])
		.constant('toastr', toastr);
})();

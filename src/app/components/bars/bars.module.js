/* global toastr */
(function () {
	"use strict";

	angular
		.module('pg.bars', ['pg.urls', 'pg.account', 'ui.bootstrap', 'uiGmapgoogle-maps', 'pg.posts'])
		.constant('toastr', toastr);
})();

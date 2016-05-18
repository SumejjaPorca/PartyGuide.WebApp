/* global toastr */
(function () {
	"use strict";

	angular
		.module('pg.superadmin', ['pg.urls', 'pg.bars'])
		.constant('toastr', toastr);
})();

(function () {

  "use strict";

  angular.module('pg.bars')
         .service('geolocation', GeolocationService);

    function GeolocationService($q) {

        var Geocoder = new google.maps.Geocoder();


        this.getLatLng = function (address) {

            var deferred = $q.defer();

            Geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  console.log(results[0]);
                    deferred.resolve(results[0].geometry.location);
                }
                else {
                    deferred.reject(status);
                }
            });
            return deferred.promise;
        }

      this.getAddress = function (lat, lng){
        var deferred = $q.defer();
        var latlng = new google.maps.LatLng(lat, lng);
        Geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                          deferred.resolve(results[1].formatted_address);// details address
                        } else {
                            console.log('Location not found');
                        }
                    } else {
                        console.log('Geocoder failed due to: ' + status);
                    }
                    deferred.reject("");
                });
                return deferred.promise;
      }

    };

})();

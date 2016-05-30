(function(){
"use strict";

angular
  .module('pg')
  .service('imageService', service);

/** @ngInject */
function service($http, FileUploader, serverName){

      this.get = function(){
        return $http.get(serverName + '/api/bars').then(function (response){return response.data;});

      };

      this.changeBarUploader = function(){
        var uploader = new FileUploader({
    			url: serverName + '/api/images/upload',
    			alias:'image',
    			autoUpload:true,
    			method:'POST',
    			removeAfterUplaod:false
    		});

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        return uploader;
      }

      this.getImageSrc = function(image){
        if(!image)
  				return null;
        // TODO Ako bi dodavali razlicite strategije za slike, npr. s drugih izvora
        // Ovo je mjesto gdje cemo to mijenjati
  			return serverName + '/api/images/' + image;
      }
  }
})();

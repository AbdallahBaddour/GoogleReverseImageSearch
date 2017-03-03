var app = angular.module('app.controllers', []);

app.controller('revimageCtrl', function ($scope, $rootScope, $http, $ionicActionSheet, $cordovaInAppBrowser, $cordovaDevice, $cordovaCamera, $ionicLoading, $cordovaFileTransfer, $cordovaFile, $filter) {
  $scope.show = false;
  $scope.showlink = false;
  // Returns the local path inside the app for an image
  $scope.pathForImage = function (image) {
    if (image === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + image;
    }
  };
  $scope.image = null;
  var index = 0;
  // Take image with the camera or from library and store it inside the app folder
// Image will not be saved to users Library.
  $scope.takeImage = function () {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        {text: 'Camera'},
        {text: 'Photo Library'}
      ],
      titleText: 'Where do you want to get image from?',
      cancelText: 'Cancel',
      cancel: function () {
        // add cancel code..
      },
      buttonClicked: function (btnIndex) {
        index = btnIndex;
        //alert(index);
        $scope.image = null;
        $scope.show = false;
        var sourceType;
        if (index == 0) {
          sourceType = Camera.PictureSourceType.CAMERA;
          hideSheet();
        } else if (index == 1) {
          sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
          hideSheet();
        }

        var options = {
          quality: 30,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: sourceType,
          //allowEdit: true,
          correctOrientation: true,
          saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imagePath) {
            // Grab the file name of the photo in the temporary directory
            var currentName = imagePath.replace(/^.*[\\\/]/, '');
            //Create a new name for the photo
            var d = new Date(),
              n = d.getTime(),
              newFileName = "img" + n + ".jpg";
            // If you are trying to load image from the gallery on Android we need special treatment!
            if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {

              window.FilePath.resolveNativePath(imagePath, function (entry) {

                  window.resolveLocalFileSystemURL(entry, success, fail);
                  function fail(e) {
                  }

                  function success(fileEntry) {
                    var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
                    // Only copy because of access rights
                    $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function (success) {
                      $scope.image = newFileName;
                    }, function (error) {
                    });
                  };
                }
              );
            } else {
              //alert("camera");
              var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
              // Move the file to permanent storage
              $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
                $scope.image = newFileName;
              }, function (error) {
              });
            }
          },
          function (err) {
            // Not always an error, maybe cancel was pressed...
          })
        //return true;
      }
    });

  };


  $scope.uploadImage = function () {
    $ionicLoading.show();
    // Destination URL
    var url = "http://10.0.0.19:8080/reverse_image_search/app_upload.php";

    // File for Upload
    var targetPath = $scope.pathForImage($scope.image);
    // File name only
    var filename = $scope.image;
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {'fileName': filename}
    };

    $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
      $ionicLoading.hide();

      var upres = JSON.stringify(result);
      var resparse = JSON.parse(upres);
      var resval = resparse.response;
      var newStr = resval.substring(1, resval.length - 1);
      alert("Clean Json Respone: " + newStr);
      var obj = JSON.parse(newStr);
      if (obj.title != "") {
        $scope.show = true;
        $scope.title = obj.title;

        if (obj.link != "") {
          $scope.link = obj.link;
          $scope.showlink = true;
        }
      }
    });
  }
  $scope.openInAppBrowser = function (link) {
    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

    document.addEventListener("deviceready", function () {
      $cordovaInAppBrowser.open(link, '_blank', options)
        .then(function (event) {
          // success
        })
        .catch(function (event) {
          // error
        });
    }, false);
  }
});

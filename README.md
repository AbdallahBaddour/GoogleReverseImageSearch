# Google Reverse Image Search Application
Google Reverse Image Search Application Created By [@BaddourAbdallah](http://twitter.com/baddourabdallah) Using [Ionic Framework](http://ionicframework.com/).

The [GoogleImageSearch](https://github.com/256cats/GoogleImageSearch) script support <b>Best Guess</b> & <b>All First page</b> data scraping. (<b>PS:</b> I edit the script to handle the upload process from the mobile app and return json data).

<b>I. Screenshots:</b>

1.Take picture or select image from photo gallery:

<img src="http://gulf-up.com/do.php?img=275667" width="288" height="512">

2.Image from camera example:

<img src="http://gulf-up.com/do.php?img=275662" width="288" height="512">

3.Image from photo gallery example:

<img src="http://gulf-up.com/do.php?img=275663" width="288" height="512">

4.Json response example:

<img src="http://gulf-up.com/do.php?img=275664" width="288" height="512">

<b>II. Server side script:</b>

Place all the files in the <b>Server</b> folder on your server, this folder contain the script that handle image uploading from the app and google reverse image search algorithm.

<b>III. Setup the app:</b>

1.First create a new blank ionic project:
```bash
$ ionic start [appname] blank
```
2.Replace <b>js</b> folder and <b>index.html</b> located in the <b>app</b> folder my project in the blank project you just create in the www folder.

3.Install [ngCordova](http://ngcordova.com/docs/install/).

4.Install [cordovaCamera](http://ngcordova.com/docs/plugins/camera/).

5.Install [cordovaFileTransfer](http://ngcordova.com/docs/plugins/fileTransfer/).

6.Install [cordovaFile](http://ngcordova.com/docs/plugins/file/).

7.Install [cordova-plugin-filepath](https://github.com/hiddentao/cordova-plugin-filepath).

8.Install [cordovaInAppBrowser](http://ngcordova.com/docs/plugins/inAppBrowser/).

9.To build and run the app on android:
```bash
$ ionic platform add android
$ ionic run android
```

# LICENSE
See the [LICENSE](https://github.com/AbdallahBaddour/GoogleReverseImageSearch/blob/master/LICENSE.md) file for license rights and limitations (MIT).

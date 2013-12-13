# Angular Notifications Service

Notification service for [Angular.js](http://angularjs.org/) offering alerts and confirms, with special support for [Cordova's Notifications plugin](https://github.com/apache/cordova-plugin-dialogs) (allows setting the notification title and button lables).

## Install

For now, just make sure the `src/notifications.js` is somewhere in your build process so you can require `notifications` in your modules.

## Usage

```coffeescript
angular.module("Demo", ['notifications'])
.controller 'DemoCrt', (Notifications) ->
    userAlert = Notifications.alert
      title: "Hi there!"
      msg: "You seem to be expecting the demo controller!"
    
    userAlert.then ->
      console.log("User closed the controller expectation alert")
```


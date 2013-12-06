# Angular Notifications Service

Notification service for angular offering alerts and confirms supporting cordova

## Install

For now, just make sure the `src/notifications.js` is somewhere in your build process so you can require `notifications` in your modules.

## Usage

```coffeescript
angular.module("Demo", ['notifications'])
.controller 'DemoCrt', (Notifications) ->
    Notifications.alert
      title: "Hi there!"
      msg: "You seem to be expecting the demo controller!"
```


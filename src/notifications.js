/**
 * # Notification Display Service
 *
 * Uses PhoneGap/Cordova or native browser alerts.
 *
 * For Cordova, this expects `navigator.notification` to be defined, e.g. by the
 * `org.apache.cordova.dialogs` plugin.
 */

angular.module("notifications", [])

.factory("Notifications", function ($q) {
  "use strict";
  var res = {};

  /**
   * ## Show Alert Message
   *
   * If the app is running with Cordova, this method tries to display a native
   * alert message, with a title (`options.title`), a message body
   * (`options.msg`) and a button labeled `options.button`. It will also call
   * `options.callback` after the notification is closed.
   *
   * The default browser `window.alert` will only display `options.msg`.
   *
   * @param {Object} options
   * @param {String} options.msg Message
   * @param {String} [options.title] Title (only on native)
   * @param {String} [options.button] Button label (only on native)
   * @param {Function} [options.callback] Callback
   * @return {Promise} Resolves with the return value of the `alert` call.
   */
  res.alert = function (options) {
    if (!options) {
      return;
    }

    var deferred = $q.defer();

    var _alert;
    if (navigator && navigator.notification && navigator.notification.alert) {
      return navigator.notification.alert(
        options.msg || "",
        function (buttonIndex) {
          if (typeof options.callback === 'function') {
            options.callback(buttonIndex);
          }
          deferred.resolve(buttonIndex);
        },
        options.title,
        options.button
      );
    } else {
      var _c = window.alert(options.msg);
      if (typeof options.callback === 'function') {
        options.callback(_c);
      }
      deferred.resolve(_c);
    }

    return deferred.promise;
  };

  /**
   * ## Ask for Confirmation
   *
   * If the app is running with Cordova, this method tries to display a native
   * confirm message, with a title (`options.title`), a message body
   * (`options.msg`) and serveral buttons, given as an array of strings in
   * `options.button`. It will also execute `options.callback(buttonIndex)`
   * when a button is tapped.
   *
   * The default browser `window.confirm` will only display `options.msg` and
   * the callback will only be given a boolean argument (don't forget to handle
   * that specifically).
   *
   * @param {Object} options
   * @param {String} options.msg Message
   * @param {String} [options.title] Title (only on native)
   * @param {String[]} [options.buttons] Button labels (only on native)
   * @param {Function} [options.callback] Callback, called with index of clicked
   *   button (on native) or Bool (browser)
   * @return {Promise} Resolves with the return value of the `confirm` call.
   */
  res.confirm = function (options) {
    if (!options) {
      return;
    }

    var deferred = $q.defer();

    var _alert;
    if (navigator && navigator.notification && navigator.notification.confirm) {
      return navigator.notification.confirm(
        options.msg || "",
        function (buttonIndex) {
          if (typeof options.callback === 'function') {
            options.callback(buttonIndex);
          }
          deferred.resolve(buttonIndex);
        },
        options.title,
        options.buttons.join(',')
      );
    } else {
      var _c = window.confirm(options.msg);
      if (typeof options.callback === 'function') {
        options.callback(_c);
      }
      deferred.resolve(_c);
    }

    return deferred.promise;
  };

  return res;
})

;
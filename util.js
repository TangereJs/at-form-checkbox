"use strict";

(function (util, undefined) {

  var class2type = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regexp",
    "[object Object]": "object",
    "[object Error]": "error",
  };

  var hasOwn = class2type.hasOwnProperty;

  util.type = function (obj) {
    if (obj == null) {
      return obj + "";
    }
    // Support: Android<4.0, iOS<6 (functionish RegExp)
    return typeof obj === "object" || typeof obj === "function" ?
      class2type[toString.call(obj)] || "object" :
      typeof obj;
  };

  util.isArray = function (obj) {
    return util.type(obj) == Array.isArray;
  };

  util.isWindow = function (obj) {
    return obj != null && obj === obj.window;
  };

  util.isPlainObject = function (obj) {
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if (util.type(obj) !== "object" || obj.nodeType || util.isWindow(obj)) {
      return false;
    }

    if (obj.constructor &&
      !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
      return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
  };

  util.isFunction = function (obj) {
    return util.type(obj) === "function";
  };

  // copy paste and rework of jQuery.extend function; I put it in atFormCheckbox namespace
  // use the same way as jQuery.extend
  util.extend = function () {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;

      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !util.isFunction(target)) {
      target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name];

          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (util.isPlainObject(copy) || (copyIsArray = util.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && util.isArray(src) ? src : [];

            } else {
              clone = src && util.isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[name] = util.extend(deep, clone, copy);

            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  };


})(window.atFormCheckboxUtil = window.atFormCheckboxUtil || {});
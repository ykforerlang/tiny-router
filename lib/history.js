"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var his = window.history;

var History = function History() {
    var _this = this;

    _classCallCheck(this, History);

    this.push = function (path) {
        his.pushState({}, "", path);
        _this.notifyAll();
    };

    this.listen = function (listener) {
        _this.listeners.push(listener);
        return function () {
            _this.listeners = _this.listeners.filter(function (ele) {
                return ele !== listener;
            });
        };
    };

    this.notifyAll = function () {
        _this.listeners.forEach(function (lis) {
            lis();
        });
    };

    this.listeners = [];
};

exports.default = new History();
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.matchPath = exports.compilePath = undefined;

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var compilePath = exports.compilePath = function compilePath() {
    var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
    var options = arguments[1];
    var _options$exact = options.exact,
        exact = _options$exact === undefined ? false : _options$exact,
        _options$strict = options.strict,
        strict = _options$strict === undefined ? false : _options$strict,
        _options$sensitive = options.sensitive,
        sensitive = _options$sensitive === undefined ? false : _options$sensitive;

    var keys = [];
    var re = (0, _pathToRegexp2.default)(pattern, keys, { end: exact, strict: strict, sensitive: sensitive });
    return { re: re, keys: keys };
};

var matchPath = exports.matchPath = function matchPath(pathname, props, pathReAndKeys) {
    var _props$path = props.path,
        path = _props$path === undefined ? '/' : _props$path,
        _props$exact = props.exact,
        exact = _props$exact === undefined ? false : _props$exact;
    var re = pathReAndKeys.re,
        keys = pathReAndKeys.keys;

    var match = re.exec(pathname);

    if (!match) return null;

    var _match = _toArray(match),
        url = _match[0],
        values = _match.slice(1);

    var isExact = pathname === url;

    if (exact && !isExact) return null;

    return {
        path: path, // the path pattern used to match
        url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
        isExact: isExact, // whether or not we matched exactly
        params: keys.reduce(function (memo, key, index) {
            memo[key.name] = values[index];
            return memo;
        }, {})
    };
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('./util');

var _history = require('./history');

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Route = function (_Component) {
    _inherits(Route, _Component);

    function Route(props) {
        _classCallCheck(this, Route);

        var _this = _possibleConstructorReturn(this, (Route.__proto__ || Object.getPrototypeOf(Route)).call(this, props));

        _this.urlChange = function () {
            var pathname = location.pathname;
            _this.setState({
                match: (0, _util.matchPath)(pathname, _this.props, _this.pathReAndKeys)
            });
        };

        _this.pathReAndKeys = (0, _util.compilePath)(props.path, {
            exact: props.exact,
            strict: props.strict,
            sensitive: props.sensitive
        });
        _this.state = {
            match: (0, _util.matchPath)(location.pathname, props, _this.pathReAndKeys)
        };
        _this.unlisten = _history2.default.listen(_this.urlChange);
        return _this;
    }

    _createClass(Route, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _props = this.props,
                path = _props.path,
                exact = _props.exact,
                strict = _props.strict;

            if (nextProps.path !== path || nextProps.exact !== exact || nextProps.strict !== strict) {
                console.warn("you should not change path, exact, strict props");
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unlisten();
        }
    }, {
        key: 'render',
        value: function render() {
            var match = this.state.match;

            if (!match) return;

            var _props2 = this.props,
                children = _props2.children,
                component = _props2.component,
                render = _props2.render;


            if (component) {
                var Comp = component;
                return _react2.default.createElement(Comp, { match: match });
            }
            if (render) {
                return render({ match: match });
            }

            return _react2.default.cloneElement(_react2.default.Children.only(children), { match: match });
        }
    }]);

    return Route;
}(_react.Component);

Route.propTypes = {
    path: _propTypes2.default.string,
    component: _propTypes2.default.func,
    render: _propTypes2.default.func,
    exact: _propTypes2.default.bool,
    strict: _propTypes2.default.bool
};
exports.default = Route;
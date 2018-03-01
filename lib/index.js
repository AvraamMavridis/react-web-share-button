'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shareButtonStyles = {
  display: 'inline-block',
  padding: '8px 20px',
  background: '#00ad45',
  color: '#fff',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: 'bold',
  flexGrow: 1,
  textAlign: 'center',
  margin: '0px 8px'
};

var Share = function (_Component) {
  _inherits(Share, _Component);

  function Share(props) {
    _classCallCheck(this, Share);

    var _this = _possibleConstructorReturn(this, (Share.__proto__ || Object.getPrototypeOf(Share)).call(this, props));

    _this.state = {
      showDialog: false
    };
    _this.onShare = _this.onShare.bind(_this);
    return _this;
  }

  _createClass(Share, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.url = this.props.url || window.location.href;
      this.shareButton.addEventListener('click', this.onShare);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.shareButton.removeEventListener('click', this.onShare);
    }
  }, {
    key: 'onShare',
    value: function onShare() {
      var _props = this.props,
          url = _props.url,
          text = _props.text,
          title = _props.title,
          onSuccess = _props.onSuccess,
          onError = _props.onError;


      if (window.navigator.share) {
        window.navigator.share({ title: title, text: text, url: url }).then(onSuccess).catch(onError);
      } else {
        this.setState({ showDialog: true });
      }
    }
  }, {
    key: 'renderFallback',
    value: function renderFallback() {
      var _props2 = this.props,
          fallbackContainerStyles = _props2.fallbackContainerStyles,
          target = _props2.target,
          fallbackContainerOnShowStyles = _props2.fallbackContainerOnShowStyles,
          url = _props2.url,
          fallbackButtonStyle = _props2.fallbackButtonStyle;
      var showDialog = this.state.showDialog;

      var buttons = [{
        name: 'fb',
        baseUrl: 'https://facebook.com/sharer/sharer.php?u=',
        text: 'Share',
        style: {
          background: '#3b5998'
        }
      }, {
        name: 'tw',
        baseUrl: 'https://twitter.com/intent/tweet/?text=Web+Share+API+with+fallback&url=',
        text: 'Tweet',
        style: {
          background: '#1da1f2'
        }
      }, {
        name: 'gp',
        baseUrl: 'https://plus.google.com/share?url=',
        text: '+1',
        style: {
          background: '#dd4b39'
        }
      }];

      var shareButtonsStyles = _extends({
        position: 'fixed',
        border: '1px solid black',
        bottom: -100,
        opacity: 0,
        width: '100%',
        transition: 'bottom 1s, opacity 500ms',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }, fallbackContainerStyles);

      if (showDialog) {
        shareButtonsStyles.bottom = 0;
        shareButtonsStyles.opacity = 1;
        shareButtonsStyles = _extends({}, shareButtonsStyles, fallbackContainerOnShowStyles);
      }

      return _react2.default.createElement(
        'div',
        {
          id: 'sharefallback',
          className: 'share-buttons',
          style: shareButtonsStyles
        },
        buttons.map(function (button) {
          return _react2.default.createElement(
            'a',
            {
              key: button.name,
              className: 'share-btn ' + button.name,
              href: button.baseUrl + '/' + url,
              target: target,
              style: _extends({}, shareButtonStyles, button.style, fallbackButtonStyle)
            },
            button.text
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          buttonText = _props3.buttonText,
          buttonStyle = _props3.buttonStyle;


      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
          'button',
          {
            ref: function ref(shareButton) {
              return _this2.shareButton = shareButton;
            },
            className: 'share-btn web-share',
            onClick: this.onShare,
            style: buttonStyle
          },
          buttonText
        ),
        this.renderFallback()
      );
    }
  }]);

  return Share;
}(_react.Component);

Share.propTypes = {
  /** Text or Node that is used on the Share button */
  buttonText: _propTypes2.default.node,
  /** Inline styles for the Button */
  buttonStyle: _propTypes2.default.object,
  /** Inline styles for the fallback container */
  fallbackContainerStyles: _propTypes2.default.object,
  /** Inline styles for the fallback container when it becames visible */
  fallbackContainerOnShowStyles: _propTypes2.default.object,
  /** Where to open the fallback share */
  target: _propTypes2.default.string,
  /** Inline styles for the fallback buttons */
  fallbackButtonStyle: _propTypes2.default.object,
  /** Url to share */
  url: _propTypes2.default.string,
  /** Called when the share is successful, only in case where Web Share API is supported */
  onSuccess: _propTypes2.default.func,
  /** Called when the share is not successful, only in case where Web Share API is supported */
  onError: _propTypes2.default.func,
  /** Title that is used by the Web Share API */
  title: _propTypes2.default.string,
  /** Text that is used by the Web Share API */
  text: _propTypes2.default.string
};
Share.defaultProps = {
  buttonText: 'Share',
  buttonStyle: {},
  fallbackContainerStyles: {},
  fallbackContainerOnShowStyles: {},
  fallbackButtonStyle: {},
  target: '_blank',
  url: '',
  title: '',
  text: '',
  onSuccess: function onSuccess() {
    return null;
  },
  onError: function onError() {
    return null;
  }
};
exports.default = Share;

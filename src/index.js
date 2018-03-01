import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const shareButtonStyles = {
  display: 'inline-block',
  padding: '8px 20px',
  background: '#00ad45',
  color: '#fff',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: 'bold',
  flexGrow: 1,
  textAlign: 'center',
  margin: '0px 8px',
};

export default class Share extends Component {
  static propTypes = {
    /** Text or Node that is used on the Share button */
    buttonText: PropTypes.node,
    /** Inline styles for the Button */
    buttonStyle: PropTypes.object,
    /** Inline styles for the fallback container */
    fallbackContainerStyles: PropTypes.object,
    /** Inline styles for the fallback container when it becames visible */
    fallbackContainerOnShowStyles: PropTypes.object,
    /** Where to open the fallback share */
    target: PropTypes.string,
    /** Inline styles for the fallback buttons */
    fallbackButtonStyle: PropTypes.object,
    /** Url to share */
    url: PropTypes.string,
    /** Called when the share is successful, only in case where Web Share API is supported */
    onSuccess: PropTypes.func,
    /** Called when the share is not successful, only in case where Web Share API is supported */
    onError: PropTypes.func,
    /** Title that is used by the Web Share API */
    title: PropTypes.string,
    /** Text that is used by the Web Share API */
    text: PropTypes.string,
  }

  static defaultProps = {
    buttonText: 'Share',
    buttonStyle: {},
    fallbackContainerStyles: {},
    fallbackContainerOnShowStyles: {},
    fallbackButtonStyle: {},
    target: '_blank',
    url: '',
    title: '',
    text: '',
    onSuccess: () => null,
    onError: () => null,
  }

  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
    this.onShare = this.onShare.bind(this);
  }

  componentDidMount() {
    this.url = this.props.url || window.location.href;
    this.shareButton.addEventListener('click', this.onShare);
  }

  componentWillUnmount() {
    this.shareButton.removeEventListener('click', this.onShare);
  }

  onShare() {
    const {
      url, text, title, onSuccess, onError,
    } = this.props;

    if (window.navigator.share) {
      window.navigator.share({ title, text, url })
        .then(onSuccess)
        .catch(onError);
    } else {
      this.setState({ showDialog: true });
    }
  }

  renderFallback() {
    const {
      fallbackContainerStyles, target, fallbackContainerOnShowStyles, url, fallbackButtonStyle,
    } = this.props;
    const { showDialog } = this.state;
    const buttons = [
      {
        name: 'fb',
        baseUrl: 'https://facebook.com/sharer/sharer.php?u=',
        text: 'Share',
        style: {
          background: '#3b5998',
        },
      },
      {
        name: 'tw',
        baseUrl:
        'https://twitter.com/intent/tweet/?text=Web+Share+API+with+fallback&url=',
        text: 'Tweet',
        style: {
          background: '#1da1f2',
        },
      },
      {
        name: 'gp',
        baseUrl: 'https://plus.google.com/share?url=',
        text: '+1',
        style: {
          background: '#dd4b39',
        },
      },
    ];

    let shareButtonsStyles = {
      position: 'fixed',
      border: '1px solid black',
      bottom: -100,
      opacity: 0,
      width: 'calc(100% - 40px)',
      transition: 'bottom 1s, opacity 500ms',
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      ...fallbackContainerStyles,
    };

    if (showDialog) {
      shareButtonsStyles.bottom = 0;
      shareButtonsStyles.opacity = 1;
      shareButtonsStyles = {
        ...shareButtonsStyles,
        ...fallbackContainerOnShowStyles,
      };
    }

    return (
      <div
        id="sharefallback"
        className="share-buttons"
        style={shareButtonsStyles}
      >
        {buttons.map(button => (
          <a
            key={button.name}
            className={`share-btn ${button.name}`}
            href={`${button.baseUrl}/${url}`}
            target={target}
            style={{ ...shareButtonStyles, ...button.style, ...fallbackButtonStyle }}
          >
            {button.text}
          </a>
        ))}
      </div>
    );
  }

  render() {
    const { buttonText, buttonStyle } = this.props;

    return (
      <Fragment>
        <button
          ref={shareButton => (this.shareButton = shareButton)}
          className="share-btn web-share"
          onClick={this.onShare}
          style={buttonStyle}
        >
          {buttonText}
        </button>
        {this.renderFallback()}
      </Fragment>
    );
  }
}

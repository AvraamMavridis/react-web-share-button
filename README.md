# react-web-share-button
React Share Button Component that uses the Web Share API with fallback

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

[![NPM](https://nodei.co/npm/react-web-share-button.png?mini=true)](https://nodei.co/npm/react-web-share-button/)

# Demo
[![Edit r439xy43zm](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/r439xy43zm)

# How to use it:

```javascript
import ShareButton from 'react-web-share-button';

<ShareButton title="My Great Page" text="A really great page" url="http://www.greatpage.com" />
```

### Browsers with Web Share API support

<img src="https://raw.githubusercontent.com/AvraamMavridis/react-web-share-button/master/screenshot_support.png" height="400px">

### Browsers without Web Share API support

<img src="https://raw.githubusercontent.com/AvraamMavridis/react-web-share-button/master/screenshot_not_supported.png" height="400px">


# Options:

| Name        | Description           
| ------------- |-------------:|
| buttonText     | Text or Node that is used on the Share button |
| buttonStyle    | Inline styles for the Button     |  
| fallbackContainerStyles | Inline styles for the fallback container  |
| fallbackContainerOnShowStyles | Inline styles for the fallback container when it becames visible  |
| target | Where to open url in case of the fallback dialog  |
| fallbackButtonStyle | Inline styles for the fallback buttons |
| url | Url to share |
| onSuccess | Called when the share is successful, only in case where Web Share API is supported  |  
| onError | Called when the share is not successful, only in case where Web Share API is supported  |  
| text  | Text that is used by the Web Share API  |  
| title  | Title that is used by the Web Share API  | 
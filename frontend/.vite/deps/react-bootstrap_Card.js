"use client";
import {
  CardHeaderContext_default
} from "./chunk-5VUHVV23.js";
import {
  divWithClassName_default
} from "./chunk-FJ7HQIJI.js";
import {
  require_classnames,
  require_jsx_runtime,
  useBootstrapPrefix
} from "./chunk-TP7L7AND.js";
import {
  require_react
} from "./chunk-67XTWVEJ.js";
import {
  __toESM
} from "./chunk-5WWUZCGV.js";

// node_modules/react-bootstrap/esm/Card.js
var import_classnames10 = __toESM(require_classnames());
var React10 = __toESM(require_react());

// node_modules/react-bootstrap/esm/CardBody.js
var React = __toESM(require_react());
var import_classnames = __toESM(require_classnames());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var CardBody = React.forwardRef(({
  className,
  bsPrefix,
  as: Component = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-body");
  return (0, import_jsx_runtime.jsx)(Component, {
    ref,
    className: (0, import_classnames.default)(className, bsPrefix),
    ...props
  });
});
CardBody.displayName = "CardBody";
var CardBody_default = CardBody;

// node_modules/react-bootstrap/esm/CardFooter.js
var React2 = __toESM(require_react());
var import_classnames2 = __toESM(require_classnames());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var CardFooter = React2.forwardRef(({
  className,
  bsPrefix,
  as: Component = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-footer");
  return (0, import_jsx_runtime2.jsx)(Component, {
    ref,
    className: (0, import_classnames2.default)(className, bsPrefix),
    ...props
  });
});
CardFooter.displayName = "CardFooter";
var CardFooter_default = CardFooter;

// node_modules/react-bootstrap/esm/CardHeader.js
var import_classnames3 = __toESM(require_classnames());
var React3 = __toESM(require_react());
var import_react = __toESM(require_react());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var CardHeader = React3.forwardRef(({
  bsPrefix,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = "div",
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "card-header");
  const contextValue = (0, import_react.useMemo)(() => ({
    cardHeaderBsPrefix: prefix
  }), [prefix]);
  return (0, import_jsx_runtime3.jsx)(CardHeaderContext_default.Provider, {
    value: contextValue,
    children: (0, import_jsx_runtime3.jsx)(Component, {
      ref,
      ...props,
      className: (0, import_classnames3.default)(className, prefix)
    })
  });
});
CardHeader.displayName = "CardHeader";
var CardHeader_default = CardHeader;

// node_modules/react-bootstrap/esm/CardImg.js
var import_classnames4 = __toESM(require_classnames());
var React4 = __toESM(require_react());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var CardImg = React4.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({
    bsPrefix,
    className,
    variant,
    as: Component = "img",
    ...props
  }, ref) => {
    const prefix = useBootstrapPrefix(bsPrefix, "card-img");
    return (0, import_jsx_runtime4.jsx)(Component, {
      ref,
      className: (0, import_classnames4.default)(variant ? `${prefix}-${variant}` : prefix, className),
      ...props
    });
  }
);
CardImg.displayName = "CardImg";
var CardImg_default = CardImg;

// node_modules/react-bootstrap/esm/CardImgOverlay.js
var React5 = __toESM(require_react());
var import_classnames5 = __toESM(require_classnames());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var CardImgOverlay = React5.forwardRef(({
  className,
  bsPrefix,
  as: Component = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-img-overlay");
  return (0, import_jsx_runtime5.jsx)(Component, {
    ref,
    className: (0, import_classnames5.default)(className, bsPrefix),
    ...props
  });
});
CardImgOverlay.displayName = "CardImgOverlay";
var CardImgOverlay_default = CardImgOverlay;

// node_modules/react-bootstrap/esm/CardLink.js
var React6 = __toESM(require_react());
var import_classnames6 = __toESM(require_classnames());
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var CardLink = React6.forwardRef(({
  className,
  bsPrefix,
  as: Component = "a",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-link");
  return (0, import_jsx_runtime6.jsx)(Component, {
    ref,
    className: (0, import_classnames6.default)(className, bsPrefix),
    ...props
  });
});
CardLink.displayName = "CardLink";
var CardLink_default = CardLink;

// node_modules/react-bootstrap/esm/CardSubtitle.js
var React7 = __toESM(require_react());
var import_classnames7 = __toESM(require_classnames());
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var DivStyledAsH6 = divWithClassName_default("h6");
var CardSubtitle = React7.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH6,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-subtitle");
  return (0, import_jsx_runtime7.jsx)(Component, {
    ref,
    className: (0, import_classnames7.default)(className, bsPrefix),
    ...props
  });
});
CardSubtitle.displayName = "CardSubtitle";
var CardSubtitle_default = CardSubtitle;

// node_modules/react-bootstrap/esm/CardText.js
var React8 = __toESM(require_react());
var import_classnames8 = __toESM(require_classnames());
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var CardText = React8.forwardRef(({
  className,
  bsPrefix,
  as: Component = "p",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-text");
  return (0, import_jsx_runtime8.jsx)(Component, {
    ref,
    className: (0, import_classnames8.default)(className, bsPrefix),
    ...props
  });
});
CardText.displayName = "CardText";
var CardText_default = CardText;

// node_modules/react-bootstrap/esm/CardTitle.js
var React9 = __toESM(require_react());
var import_classnames9 = __toESM(require_classnames());
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var DivStyledAsH5 = divWithClassName_default("h5");
var CardTitle = React9.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH5,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-title");
  return (0, import_jsx_runtime9.jsx)(Component, {
    ref,
    className: (0, import_classnames9.default)(className, bsPrefix),
    ...props
  });
});
CardTitle.displayName = "CardTitle";
var CardTitle_default = CardTitle;

// node_modules/react-bootstrap/esm/Card.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var Card = React10.forwardRef(({
  bsPrefix,
  className,
  bg,
  text,
  border,
  body = false,
  children,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = "div",
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "card");
  return (0, import_jsx_runtime10.jsx)(Component, {
    ref,
    ...props,
    className: (0, import_classnames10.default)(className, prefix, bg && `bg-${bg}`, text && `text-${text}`, border && `border-${border}`),
    children: body ? (0, import_jsx_runtime10.jsx)(CardBody_default, {
      children
    }) : children
  });
});
Card.displayName = "Card";
var Card_default = Object.assign(Card, {
  Img: CardImg_default,
  Title: CardTitle_default,
  Subtitle: CardSubtitle_default,
  Body: CardBody_default,
  Link: CardLink_default,
  Text: CardText_default,
  Header: CardHeader_default,
  Footer: CardFooter_default,
  ImgOverlay: CardImgOverlay_default
});
export {
  Card_default as default
};
//# sourceMappingURL=react-bootstrap_Card.js.map

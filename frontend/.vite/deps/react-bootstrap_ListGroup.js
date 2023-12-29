"use client";
import {
  Nav_default
} from "./chunk-HTQAT3HQ.js";
import {
  useUncontrolled
} from "./chunk-VCTKDRPF.js";
import {
  useNavItem
} from "./chunk-26ZZPAO3.js";
import {
  makeEventKey
} from "./chunk-3R3VICS7.js";
import "./chunk-D4P7VYWK.js";
import {
  useEventCallback
} from "./chunk-NWD57ZMN.js";
import {
  require_warning
} from "./chunk-K4O3PCAO.js";
import "./chunk-62VHX56A.js";
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

// node_modules/react-bootstrap/esm/ListGroup.js
var import_classnames2 = __toESM(require_classnames());
var React2 = __toESM(require_react());
var import_warning2 = __toESM(require_warning());

// node_modules/react-bootstrap/esm/ListGroupItem.js
var import_classnames = __toESM(require_classnames());
var React = __toESM(require_react());
var import_warning = __toESM(require_warning());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ListGroupItem = React.forwardRef(({
  bsPrefix,
  active,
  disabled,
  eventKey,
  className,
  variant,
  action,
  as,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "list-group-item");
  const [navItemProps, meta] = useNavItem({
    key: makeEventKey(eventKey, props.href),
    active,
    ...props
  });
  const handleClick = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    navItemProps.onClick(event);
  });
  if (disabled && props.tabIndex === void 0) {
    props.tabIndex = -1;
    props["aria-disabled"] = true;
  }
  const Component = as || (action ? props.href ? "a" : "button" : "div");
  true ? (0, import_warning.default)(as || !(!action && props.href), "`action=false` and `href` should not be used together.") : void 0;
  return (0, import_jsx_runtime.jsx)(Component, {
    ref,
    ...props,
    ...navItemProps,
    onClick: handleClick,
    className: (0, import_classnames.default)(className, bsPrefix, meta.isActive && "active", disabled && "disabled", variant && `${bsPrefix}-${variant}`, action && `${bsPrefix}-action`)
  });
});
ListGroupItem.displayName = "ListGroupItem";
var ListGroupItem_default = ListGroupItem;

// node_modules/react-bootstrap/esm/ListGroup.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ListGroup = React2.forwardRef((props, ref) => {
  const {
    className,
    bsPrefix: initialBsPrefix,
    variant,
    horizontal,
    numbered,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as = "div",
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: "onSelect"
  });
  const bsPrefix = useBootstrapPrefix(initialBsPrefix, "list-group");
  let horizontalVariant;
  if (horizontal) {
    horizontalVariant = horizontal === true ? "horizontal" : `horizontal-${horizontal}`;
  }
  true ? (0, import_warning2.default)(!(horizontal && variant === "flush"), '`variant="flush"` and `horizontal` should not be used together.') : void 0;
  return (0, import_jsx_runtime2.jsx)(Nav_default, {
    ref,
    ...controlledProps,
    as,
    className: (0, import_classnames2.default)(className, bsPrefix, variant && `${bsPrefix}-${variant}`, horizontalVariant && `${bsPrefix}-${horizontalVariant}`, numbered && `${bsPrefix}-numbered`)
  });
});
ListGroup.displayName = "ListGroup";
var ListGroup_default = Object.assign(ListGroup, {
  Item: ListGroupItem_default
});
export {
  ListGroup_default as default
};
//# sourceMappingURL=react-bootstrap_ListGroup.js.map

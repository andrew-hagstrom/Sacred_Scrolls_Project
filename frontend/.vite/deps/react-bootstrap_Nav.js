"use client";
import {
  NavbarContext_default
} from "./chunk-PEWZY26S.js";
import {
  NavLink_default
} from "./chunk-EYCYSLZW.js";
import {
  CardHeaderContext_default
} from "./chunk-5VUHVV23.js";
import "./chunk-U5Q4OJLK.js";
import "./chunk-7YOX6ICD.js";
import {
  Nav_default
} from "./chunk-HTQAT3HQ.js";
import {
  useUncontrolled
} from "./chunk-VCTKDRPF.js";
import "./chunk-26ZZPAO3.js";
import "./chunk-3R3VICS7.js";
import "./chunk-D4P7VYWK.js";
import "./chunk-NWD57ZMN.js";
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
  __commonJS,
  __toESM
} from "./chunk-5WWUZCGV.js";

// node_modules/prop-types-extra/lib/utils/createChainableTypeChecker.js
var require_createChainableTypeChecker = __commonJS({
  "node_modules/prop-types-extra/lib/utils/createChainableTypeChecker.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = createChainableTypeChecker;
    function createChainableTypeChecker(validate) {
      function checkType(isRequired, props, propName, componentName, location, propFullName) {
        var componentNameSafe = componentName || "<<anonymous>>";
        var propFullNameSafe = propFullName || propName;
        if (props[propName] == null) {
          if (isRequired) {
            return new Error("Required " + location + " `" + propFullNameSafe + "` was not specified " + ("in `" + componentNameSafe + "`."));
          }
          return null;
        }
        for (var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
          args[_key - 6] = arguments[_key];
        }
        return validate.apply(void 0, [props, propName, componentNameSafe, location, propFullNameSafe].concat(args));
      }
      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);
      return chainedCheckType;
    }
    module.exports = exports["default"];
  }
});

// node_modules/prop-types-extra/lib/all.js
var require_all = __commonJS({
  "node_modules/prop-types-extra/lib/all.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = all2;
    var _createChainableTypeChecker = require_createChainableTypeChecker();
    var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function all2() {
      for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
        validators[_key] = arguments[_key];
      }
      function allPropTypes() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        var error = null;
        validators.forEach(function(validator) {
          if (error != null) {
            return;
          }
          var result = validator.apply(void 0, args);
          if (result != null) {
            error = result;
          }
        });
        return error;
      }
      return (0, _createChainableTypeChecker2.default)(allPropTypes);
    }
    module.exports = exports["default"];
  }
});

// node_modules/react-bootstrap/esm/Nav.js
var import_classnames2 = __toESM(require_classnames());
var import_all = __toESM(require_all());
var React2 = __toESM(require_react());
var import_react = __toESM(require_react());

// node_modules/react-bootstrap/esm/NavItem.js
var React = __toESM(require_react());
var import_classnames = __toESM(require_classnames());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var NavItem = React.forwardRef(({
  className,
  bsPrefix,
  as: Component = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "nav-item");
  return (0, import_jsx_runtime.jsx)(Component, {
    ref,
    className: (0, import_classnames.default)(className, bsPrefix),
    ...props
  });
});
NavItem.displayName = "NavItem";
var NavItem_default = NavItem;

// node_modules/react-bootstrap/esm/Nav.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var Nav = React2.forwardRef((uncontrolledProps, ref) => {
  const {
    as = "div",
    bsPrefix: initialBsPrefix,
    variant,
    fill = false,
    justify = false,
    navbar,
    navbarScroll,
    className,
    activeKey,
    ...props
  } = useUncontrolled(uncontrolledProps, {
    activeKey: "onSelect"
  });
  const bsPrefix = useBootstrapPrefix(initialBsPrefix, "nav");
  let navbarBsPrefix;
  let cardHeaderBsPrefix;
  let isNavbar = false;
  const navbarContext = (0, import_react.useContext)(NavbarContext_default);
  const cardHeaderContext = (0, import_react.useContext)(CardHeaderContext_default);
  if (navbarContext) {
    navbarBsPrefix = navbarContext.bsPrefix;
    isNavbar = navbar == null ? true : navbar;
  } else if (cardHeaderContext) {
    ({
      cardHeaderBsPrefix
    } = cardHeaderContext);
  }
  return (0, import_jsx_runtime2.jsx)(Nav_default, {
    as,
    ref,
    activeKey,
    className: (0, import_classnames2.default)(className, {
      [bsPrefix]: !isNavbar,
      [`${navbarBsPrefix}-nav`]: isNavbar,
      [`${navbarBsPrefix}-nav-scroll`]: isNavbar && navbarScroll,
      [`${cardHeaderBsPrefix}-${variant}`]: !!cardHeaderBsPrefix,
      [`${bsPrefix}-${variant}`]: !!variant,
      [`${bsPrefix}-fill`]: fill,
      [`${bsPrefix}-justified`]: justify
    }),
    ...props
  });
});
Nav.displayName = "Nav";
var Nav_default2 = Object.assign(Nav, {
  Item: NavItem_default,
  Link: NavLink_default
});
export {
  Nav_default2 as default
};
//# sourceMappingURL=react-bootstrap_Nav.js.map

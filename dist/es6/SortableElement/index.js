import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import invariant from 'invariant';

// Export Higher Order Sortable Element Component
export default function SortableElement(WrappedComponent) {
    var _class, _temp;

    var config = arguments.length <= 1 || arguments[1] === undefined ? { withRef: false } : arguments[1];

    return _temp = _class = function (_Component) {
        babelHelpers.inherits(_class, _Component);

        function _class() {
            babelHelpers.classCallCheck(this, _class);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
        }

        babelHelpers.createClass(_class, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _props = this.props;
                var collection = _props.collection;
                var disabled = _props.disabled;
                var index = _props.index;


                if (!disabled) {
                    var node = this.node = findDOMNode(this);

                    node.sortableInfo = { index: index, collection: collection };

                    this.ref = { node: node };
                    this.context.manager.add(collection, this.ref);
                }
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                var index = this.props.index;

                if (index !== nextProps.index && this.node) {
                    this.node.sortableInfo.index = nextProps.index;
                }
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                var _props2 = this.props;
                var collection = _props2.collection;
                var disabled = _props2.disabled;


                if (!disabled) this.context.manager.remove(collection, this.ref);
            }
        }, {
            key: 'getWrappedInstance',
            value: function getWrappedInstance() {
                invariant(config.withRef, 'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableElement() call');
                return this.refs.wrappedInstance;
            }
        }, {
            key: 'render',
            value: function render() {
                var ref = config.withRef ? 'wrappedInstance' : null;
                return React.createElement(WrappedComponent, babelHelpers.extends({ ref: ref }, this.props));
            }
        }]);
        return _class;
    }(Component), _class.displayName = WrappedComponent.displayName ? 'SortableElement(' + WrappedComponent.displayName + ')' : 'SortableElement', _class.WrappedComponent = WrappedComponent, _class.contextTypes = {
        manager: PropTypes.object.isRequired
    }, _class.propTypes = {
        index: PropTypes.number.isRequired,
        collection: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        disabled: PropTypes.bool
    }, _class.defaultProps = {
        collection: 0
    }, _temp;
}
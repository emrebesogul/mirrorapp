import React from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

class AllWidget extends React.Component {
    constructor(props) {
        super(props);
        this._initiateDrag = this._initiateDrag.bind(this);
    }

    static contextTypes = {
        dragContext: PropTypes.any
    }

    static propTypes = {
        dragOn: PropTypes.oneOf(['onLongPress', 'onPressIn'])
    }

    _initiateDrag() {
        this.context.dragContext.onDrag(this.wrapper, this.props.children, this.props.data);
    }

    static defaultProps = {
        dragOn: 'onLongPress'
    }

    render() {
        return <TouchableOpacity activeOpacity={this.props.activeOpacity} style={this.props.style}
                                 onLongPress={this.props.dragOn === 'onLongPress' ? this._initiateDrag : null}
                                 onPress={this.props.onPress}
                                 onPressIn={this.props.dragOn === 'onPressIn' ? this._initiateDrag : null}
                                 ref={c => this.wrapper = c}>
            {
                React.Children.map(this.props.children, child => {
                    return React.cloneElement(child)
                })
            }
        </TouchableOpacity>;
    }
}

export default AllWidget;
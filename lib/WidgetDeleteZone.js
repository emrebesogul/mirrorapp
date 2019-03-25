import React from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';
import PropTypes from 'prop-types';

export default class WidgetDeleteZone extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.reportMeasurements = this.reportMeasurements.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.onLeave = this.onLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    reportMeasurements() {
        if (this.props.dragging) this.context.dragContext.removeZone(this.wrapper);
        this.wrapper.measure((_, __, width, height, x, y) => {
            if (!this.props.dragging) this.context.dragContext.updateZone({
                width,
                height,
                x,
                y,
                ref: this.wrapper,
                onEnter: this.onEnter,
                onLeave: this.onLeave,
                onDrop: this.onDrop
            });
        })
    }

    static propTypes = {
        onEnter: PropTypes.func,
        onLeave: PropTypes.func,
        onDrop: PropTypes.func
    }

    componentDidMount() {
        this.reportMeasurements();
        this._timer = setInterval(this.reportMeasurements, 1000);
    }

    componentWillUnmount() {
        this.context.dragContext.removeZone(this.wrapper);
        clearInterval(this._timer);
    }

    componentDidUpdate() {
        this.reportMeasurements();
    }

    onEnter({x, y}) {
        if (this.props.disabled) return;
        if (!this.state.active) {
            if (this.props.onEnter) this.props.onEnter();
            this.setState({
                active: true
            })
        }
    }

    onLeave() {
        if (this.state.active) {
            if (this.props.onLeave) this.props.onLeave();
            this.setState({
                active: false
            })
        }
    }

    onDrop(data) {
        if (this.props.onDrop) this.props.onDrop(data);
        this.setState({
            active: false
        })
    }

    static contextTypes = {
        dragContext: PropTypes.any
    }

    render() {
        return <View style={this.props.style} pointerEvents={this.props.pointerEvents}
                     onLayout={this.reportMeasurements} ref={c => this.wrapper = c}/>

    }
}
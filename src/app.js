'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Root from './config/router';
global._ = _;


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillReceiveProps(newProps) {
        const { autoRehydrated: oldAutoRehydrated } = this.props;
        const { autoRehydrated } = newProps;
    }

    componentWillUnmount() {

    }
    componentDidMount() {

    }

    render() {
        const {
          autoRehydrated,
        } = this.props;

        if (!autoRehydrated) {
            return (<View></View>)
        }
//        console.log('~~~~App props', this.props);
        return (
            <Root />
        )
    }
}

const stateToProps = (state) => {

    const { autoRehydrated, netinfo } = state;
    return { autoRehydrated, netinfo };
};

const dispatchToProps = (dispatch) => {

    return bindActionCreators(_.extend({}), dispatch)
};

export default connect(stateToProps, dispatchToProps)(App)

'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

import * as navigationActions  from '../actions/navigation'

import UserDetailContainer from '../containers/UserDetailContainer'
import FeedUsersContainer from '../containers/FeedUsersContainer'


import CustomNavigationCardStack from '../components/CustomNavigationCard/CustomNavigationCardStack'

global._ = _;

const NavigationCardStackStyleInterpolator = require('NavigationCardStackStyleInterpolator');


class Root extends React.Component {
    constructor(props) {
        super(props);

        const { navigationPush, navigationPop, navigationReplace } = props;
        this.state = {
        };

        // for time's sake, converting from navigator.push to navigationPush
        this.navigator = {
            push: (data, staticState = false) => {
                const { name, ...otherData } = data;
                const key = name + (staticState ? '' : ('-' + new Date().getTime()));
                navigationPush({ key, name, ...otherData })
            },
            pop: () => {
                navigationPop()
            },
            replace: (data, staticState = false) => {
                const { name, ...otherData } = data;
                const key = name + (staticState ? '' : ('-' + new Date().getTime()));
                navigationReplace({ key, ...otherData })
            }
        }
    }

    componentWillReceiveProps(newProps) {
        let { autoRehydrated:oldAutoRehydrated, clapitAccountData:oldClapitAccountData } = this.props;
        let { autoRehydrated, clapitAccountData } = newProps;
        if (!oldAutoRehydrated && autoRehydrated) { // data just became hydrated
            if (_.isEmpty(clapitAccountData)) {  // new stuff is empty, so show intro
                //this should be a special case, use setTimeout to avoid putting IntroNavContainer on top of the navigation stack
                //when Feed component is initializing
                setTimeout(()=>{
                    // this.navigator.push({ name: 'Login' }, true) intro
                    // this.navigator.push({ name: 'IntroNavContainer' }, true)
                    //this.navigator.push({ name: 'MainContainer' }, true)

                })
            } else {

            }
        }
    }

    _renderScene({ scene }) {
        let { navigationState:completeNavigationState } = this.props; // from redux
        let { route } = scene; // from scene
        let { clapitAccountData, navigationPush, navigationPop } = this.props;
        let { name, post, resourceId, callback, key, unauthenticatedAction, ...extraProps } = route;

        key = key.split('-')[0];  // for showing multiple PostDetails...?

        switch (key) {
            case 'FeedUsersContainer':
                return (
                    <FeedUsersContainer {... route.props} navigator={this.navigator} />);
            case 'UserDetailContainer':
                return (
                    <UserDetailContainer {... route.props} navigator={this.navigator} />);
        }
    }

    render() {
        const {
            autoRehydrated,
            navigationState,
            navigationPush,
            navigationPop,
            navigationReplace,
            onNavigate
        } = this.props;

        if (!autoRehydrated) {
            //return (<View></View>)
        }
        // console.log('~~~~App props', this.props);
        return (
            <CustomNavigationCardStack
                navigationState={navigationState}
                style={{flex:1}}
                animation_duration={0}
                onNavigate={onNavigate}
                renderScene={this._renderScene.bind(this)}
            />
        )
    }
}

const stateToProps = (state) => {

    const { autoRehydrated, navigationState, netinfo } = state;
    return { autoRehydrated, navigationState, netinfo };
};

const dispatchToProps = (dispatch) => {
    return bindActionCreators(_.extend({}, {...navigationActions}), dispatch)
};

export default connect(stateToProps, dispatchToProps)(Root)

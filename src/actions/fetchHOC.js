'use strict';
import {
    View,
    Text,
} from 'react-native';
import React, { Component  } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { printAST } from 'apollo-client';
import get from 'lodash/get';
import assign from 'lodash/assign';


import * as netinfoActions  from '../actions/netinfo'


function fetchHOC(query, queryOptions ) {

    const options = get(queryOptions, 'options', null);
    let getVariablesFunction = () => {get(options, 'variables', {})};
    if (options !== null) {
        if (typeof options === 'function') {
            getVariablesFunction = (props) => get(options(props), 'variables', {});
        }
    }
        class fetchFilter extends Component {
            constructor(props) {
                super(props);
                this.state = {
                };
            }
            determineConnect = (type) => {
                switch (type) {
                    case 'wifi':
                    case 'cell':
                    case 'BLUETOOTH':
                    case 'DUMMY':
                    case 'ETHERNET':
                    case 'MOBILE':
                    case 'MOBILE_DUN':
                    case 'MOBILE_HIPRI':
                    case 'MOBILE_MMS':
                    case 'MOBILE_SUPL':
                    case 'VPN':
                    case 'WIFI':
                    case 'WIMAX':
                        return true;
                    case 'UNKNOWN':
                    case 'NONE':
                    case 'unknown':
                    case 'none':
                        return false;
                        break;
                    default:
                        return false;
                }
            };

            render() {
                const { netinfo, ...otherProps } = this.props;
                // console.log('~~~~~~ HOC props', this.props);

                if (this.determineConnect(netinfo.type)) {
                    // console.log('~~~~~~ online');
                    const headers = {
                        'Content-Type': 'application/json'
                    };
                    const fetchParams = assign({},{
                       headers,
                       method: 'POST',
                       body: {
                           query: printAST(query),
                           variables: getVariablesFunction(otherProps),
                       }
                    });
                    return fetch(url, fetchParams)
                        .then(response => {
                            console.log('~~~~~ response', response)
                            let { status } = response;

                            if (status >= 400) {
                                return { error: { status } }
                            }
                            return response.json()
                        })
                        .catch(err => err)
                }else {
                    // console.log('~~~~~~ offline');
                    return new Promise.reject(new Error('no-connection'))
                }

            }
        }

        function mapStateToProps(state) {

            const { navigationState, netinfo } = state;
            return { navigationState, netinfo };
        }
        function mapDispatchToProps(dispatch) {

            const actions = Object.assign({}, { ...netinfoActions });
            return bindActionCreators(actions, dispatch)
        }

        return connect(mapStateToProps, mapDispatchToProps)(fetchFilter);

}

export default fetchHOC;
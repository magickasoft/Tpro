'use strict';

import { combineReducers } from 'redux'
import apolloClient from  '../config/apolloConfig'
import { autoRehydrated } from './persist'
import { netinfo } from './netinfo'
import { navigationState } from './navigation'


const rootReducer = combineReducers({
    apollo: apolloClient.reducer(),
    autoRehydrated,
    netinfo,
    navigationState,
});

export default rootReducer;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import UserDetail from '../components/UserDetail';

import * as navigationActions  from '../actions/navigation';

import { getUserById} from '../queries/index';

// const  TestPageOfflineHOC = offlineHOC( getUserById, {
//     options: ({ uid }) => {
//         return { variables: { uid: uid } }
//     }
// })(TestPage);
const UserDetailGraphQl = graphql(getUserById, {
    options: ({ uid }) => {
        return { variables: { uid } }
    }
})(UserDetail);
function stateToProps(state) {

    const { autoRehydrated } = state;
    return { autoRehydrated };
}

function dispatchToProps(dispatch) {

    const actions = Object.assign({}, { ...navigationActions });
    return bindActionCreators(actions, dispatch)
}

export default connect(stateToProps, dispatchToProps)(UserDetailGraphQl)
// export default UserDetailGraphQl;

import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  StyleSheet,
  ScrollView
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import GiftedSpinner from 'react-native-gifted-spinner';
import Spinner from 'react-native-loading-spinner-overlay';

class Feed extends React.Component {
    constructor(props, context) {
    super(props, context);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: this.rowHasChanged.bind(this),
      }),
    };
   // this.state.dataSource = this.getUpdatedDataStore(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
        dataSource: this.getUpdatedDataSource(nextProps),
    });
  }
  getUpdatedDataSource(props) {
    const { data } = props;
    let rows = data.users;
    let ids = rows.map((obj, index) => index);

    return this.state.dataSource.cloneWithRows(rows, ids);
  }
  rowHasChanged(r1, r2) {
    return JSON.stringify(r1) !== JSON.stringify(r2);
  }
  onLearnMore = (object) => {
      this.props.navigator.push(object);
  };
  onButtonPress () {
    const { data } = this.props;
    //apolloClient.resetStore();
    data.refetch();
  }
  renderStats() {
      const { data } = this.props;
      const { users } = data;
      return (
          <View>
              <Text>Количество {users.length}</Text>
              <ListItem
                  key={users[0].uid}
                  roundAvatar
                  avatar={{ uri: users[0].photo_url ? users[0].photo_url : null }}
                  title={`${users[0].firstname.toUpperCase()} ${users[0].lastname.toUpperCase()}`}
                  subtitle={users[0].mail}
                  onPress={() => this.onLearnMore({ name: 'UserDetailContainer', props: {uid: parseInt(users[0].uid)}})}
              />
              <ListItem
                  key={users[1].uid}
                  roundAvatar
                  avatar={{ uri: users[1].photo_url ? users[1].photo_url : null }}
                  title={`${users[1].firstname.toUpperCase()} ${users[1].lastname.toUpperCase()}`}
                  subtitle={users[1].mail}
                  onPress={() => this.onLearnMore({ name: 'UserDetailContainer', props: {uid: parseInt(users[1].uid)}})}
              />
              <ListItem
                  key={users[2].uid}
                  roundAvatar
                  avatar={{ uri: users[2].photo_url ? users[2].photo_url : null }}
                  title={`${users[2].firstname.toUpperCase()} ${users[2].lastname.toUpperCase()}`}
                  subtitle={users[2].mail}
                  onPress={() => this.onLearnMore({ name: 'UserDetailContainer', props: {uid: parseInt(users[2].uid)}})}
              />
          </View>
      )
  }
  render() {

    const { data } = this.props;

    console.log('~~~~ FeedUser', this.props);
    return (
    <View style={styles.view}>
        <NavigationBar
            statusBar={{tintColor: '#1f1b20', style: 'light-content'}}
            title={{ title: '', }}
            style={styles.navBar} />
        <ScrollView style={styles.scrollView} contentContainerStyle={{paddingBottom: 15}}>
            <Button
                onPress={this.onButtonPress.bind(this)}
                raised
                icon={{name: 'cached'}}
                title='Update data' />
            <List>

                { data ? data.loading ?
                    <GiftedSpinner />
                    /*<Spinner visible={data.loading}/>*/
                    :
                    data.users ?
                        this.renderStats()
                        /*data.users.map(user => (
                         <ListItem
                         key={user.uid}
                         roundAvatar
                         avatar={{ uri: user.photo_url ? user.photo_url : null }}
                         title={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                         subtitle={user.mail}
                         onPress={() => this.onLearnMore(user)}
                         />
                         ))*/
                        /*<ListView
                            dataSource={this.state.dataSource}
                            renderRow={(user) => (
                                <ListItem
                                    key={user.uid}
                                    // roundAvatar
                                    // avatar={{ uri: user.photo_url ? user.photo_url : null }}
                                    title={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                                    subtitle={user.mail}
                                    onPress={() => this.onLearnMore({ name: 'UserDetailContainer', props: {uid: parseInt(user.uid)}})}
                                />
                            )}
                        />*/
                        : <Text>{'None'}</Text>
                    : <Text>{'None data'}</Text>

                }
            </List>
        </ScrollView>
    </View>

    );
  }
}
Feed.propTypes = {
    data: React.PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    navBar: {
        backgroundColor: 'white'
    },
    view: {
        flex: 1,
        backgroundColor: '#E6F9F6'
    },
});
export default Feed;

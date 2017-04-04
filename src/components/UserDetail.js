import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import GiftedSpinner from 'react-native-gifted-spinner';
import Spinner from 'react-native-loading-spinner-overlay';

// import Row from './Row'
// import Header from './Header'
// import SectionHeader from './SectionHeader'
// import Footer from './Footer'



class UserDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  onLearnMore = (object) => {
    this.props.navigator.push(object);
  };
  renderUserInfo(user){
      return (
        <View>
            <Tile
                imageSrc={{ uri: user.photo_url}}
                featured
                title={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                caption={user.mail}
            />

            <List>
                <ListItem
                    title="Email"
                    rightTitle={user.mail}
                    hideChevron
                />
                {/*<ListItem*/}
                {/*title="Phone"*/}
                {/*rightTitle={phone}*/}
                {/*hideChevron*/}
                {/*/>*/}
            </List>

            <List>
                <ListItem
                    title="Username"
                    rightTitle={user.name}
                    hideChevron
                />
            </List>

            <List>
                <ListItem
                    title="Birthday"
                    rightTitle={user.birthday}
                    hideChevron
                />
                <ListItem
                    title="City"
                    rightTitle={user.city.name}
                    hideChevron
                />
            </List>
        </View>
      )
  }
  render() {
    const { data, navigationPop } = this.props;

    const leftButtonConfig = {
      title: 'Back',
      handler: () => navigationPop(),
    };
    return (
    <View style={styles.view}>
        <NavigationBar
            statusBar={{tintColor: '#1f1b20', style: 'light-content'}}
            leftButton={leftButtonConfig}
            title={{ title: '', }}
            style={styles.navBar}/>
        <ScrollView>
            { data ? data.loading ?
                <List><GiftedSpinner /></List>
                /*<Spinner visible={data.loading}/>*/
                :
                data.user ? this.renderUserInfo(data.user) : <Text>{'None User'}</Text>
                : <Text>{'None data'}</Text>
            }
            {
                data.users ?
                    data.users.map(user => (
                     <ListItem
                     key={user.uid}
                     roundAvatar
                     avatar={{ uri: user.photo_url ? user.photo_url : null }}
                     title={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                     subtitle={user.mail}
                     onPress={() => this.onLearnMore({ name: 'UserDetailContainer', props: {uid: parseInt(user.uid)}})}
                     />
                     ))
                    : <Text>{'None'}</Text>
            }
        </ScrollView>
    </View>

    );
  }
}
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
    container: {
        flex: 1,
        marginTop: 20,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#8E8E8E',
    },
});
export default UserDetail;

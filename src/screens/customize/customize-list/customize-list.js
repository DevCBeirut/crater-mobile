// @flow

import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './customize-styles';
import {ListView, DefaultLayout} from '@/components';
import t from 'locales/use-translation';
import {IProps} from './customize-list-type';
import {CUSTOMIZES_MENU} from 'stores/customize/helpers';
import {goBack, MOUNT, UNMOUNT, ROUTES} from '@/navigation';

export default class CustomizeList extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {navigation} = this.props;
    goBack(MOUNT, navigation, {route: ROUTES.MAIN_MORE});
  }

  componentWillUnmount() {
    goBack(UNMOUNT);
  }

  onSelectMenu = ({route}) => {
    const {navigation} = this.props;

    if (route) {
      navigation.navigate(route);
    }
  };

  render() {
    const {navigation, theme} = this.props;
    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.navigate(ROUTES.SETTING_LIST),
          title: t('header.customize'),
          leftArrow: 'primary'
        }}
        hasSearchField={false}
        bodyStyle="px-0 py-0"
      >
        <View style={styles.listViewContainer}>
          <ListView
            items={CUSTOMIZES_MENU()}
            onPress={this.onSelectMenu}
            leftTitleStyle={styles.listViewTitle(theme)}
            rightArrowIcon
            rightArrowIconStyle={styles.rightArrowIconStyle}
          />
        </View>
      </DefaultLayout>
    );
  }
}

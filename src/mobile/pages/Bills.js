import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import TabView from '../hoc/TabView'
import AsyncContent from '../hoc/AsyncContent'
import Bill from '../components/Bill'
import Balance from '../components/Balance'
import Fab from '../components/Fab'

import routes from '../../common/routes'
import router from '../../common/router'

class Bills extends Component {
  static propTypes = {
    // redux state:
    users: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  handleFab() {
    const route = routes.BILLS_NEW
    route.props = {} // clear 'edit' prop = null
    router.push(route)
  }

  renderBill(row) {
    return <Bill bill={row} />
  }

  render() {
    return (
      <View style={styles.container}>
        <TabView>
          <AsyncContent name="bills"
            renderRow={this.renderBill}
            tabLabel="tab.bills"
          />
          <ScrollView tabLabel="tab.balances">
            {
              this.props.users.map((user) =>
                <Balance user={user} key={user.uid} />
              )
            }
            <View style={styles.spacer} />
          </ScrollView>
        </TabView>
        <Fab name="add" onPress={this.handleFab} type="bills" />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.tribe.users,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacer: {
    height: 80,
  },
})

export default connect(mapStateToProps)(Bills)

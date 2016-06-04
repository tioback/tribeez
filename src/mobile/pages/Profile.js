import React, {Component} from 'react'
import {ScrollView} from 'react-native'

import ProfileForm from '../forms/Profile'

class Profile extends Component {
  render() {
    return (
      <ScrollView>
        <ProfileForm />
      </ScrollView>
    )
  }

}

export default Profile
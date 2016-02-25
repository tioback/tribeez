import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardTitle from 'material-ui/lib/card/card-title'
import RaisedButton from 'material-ui/lib/raised-button'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'

import currencies from '../resources/currencies'
import langs from '../resources/langs'
import lang from '../utils/lang'
import scriptLoader from '../utils/scriptLoader'

import updateLang from '../actions/updateLang'
import postRegister from '../actions/postRegister'

import styles from '../styles'

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleLangChange = this.handleLangChange.bind(this)
  }

  componentDidMount() {
    scriptLoader.load('https://maps.googleapis.com/maps/api/js?libraries=places&language=fr', () => {
      const autocomplete = new google.maps.places.Autocomplete(document.getElementById('city'), {types: ['(cities)']})
      autocomplete.addListener('place_changed', () => {
        let place = autocomplete.getPlace()
        if (!place || !place.address_components) {
          return
        }
        let country = place.address_components.find((component) => {
          return (component.types.includes('country') && component.short_name && component.short_name.length === 2)
        })
        if (country) {
          this.setState({
            city_name: place.name,
            country_code: country.short_name,
            place_id: place.place_id,
          })
        }
      })
    })
  }

  handleLangChange(event, index, value) {
    this.props.updateLang(value)
  }

  handleTypeChange(event, index, value) {
    this.setState({
      tribe_type: value,
    })
  }

  handleCurrencyChange(event, index, value) {
    this.setState({
      currency: value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postRegister({
      name: this.refs.name.getValue(),
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
      lang: this.props.lang,
      tribe_name: this.refs.tribe_name.getValue(),
      city_name: this.state.city_name,
      tribe_type: this.state.tribe_type,
      country_code: this.state.country_code,
      place_id: this.state.place_id,
      currency: this.state.currency,
    })
  }

  render() {
    const currencyItems = currencies.map(item =>
      <MenuItem value={item.code} key={item.code} primaryText={item.name + ' (' + item.code + ')'} />
    )
    const langItems = langs.map(item =>
      <MenuItem value={item.code} key={item.code} primaryText={item.name} />
    )
    const types = ['houseshare', 'family', 'friends', 'organization', 'other'] //TODO: constant
    const typeItems = types.map(type =>
      <MenuItem value={type} key={type} primaryText={type} />
    )

    return (
      <form onSubmit={this.handleSubmit} className="main">
        <Card>
          <CardTitle title={<FormattedMessage id="register" />} />
          <CardText>
            <TextField style={styles.field} ref="name" floatingLabelText="Your name" required errorText={this.props.error === 'name' && <FormattedMessage id="error.name" />} />
            <TextField style={styles.field} type="email" ref="email" floatingLabelText="Email" required errorText={this.props.error && this.props.error.indexOf('email') === 0 && <FormattedMessage id={'error.' + this.props.error} />} />
            <TextField style={styles.field} type="password" ref="password" floatingLabelText="Password" required errorText={this.props.error === 'password' && <FormattedMessage id="error.password" />} />
            <SelectField style={styles.field} ref="lang" floatingLabelText="Language" value={this.props.lang} onChange={this.handleLangChange} errorText={this.props.error === 'lang' && <FormattedMessage id="error.lang" />}>
              {langItems}
            </SelectField>
          </CardText>
          <CardTitle title="Your tribe" />
          <CardText>
            <TextField style={styles.field} ref="tribe_name" floatingLabelText="Tribe name" required errorText={this.props.error === 'tribe_name' && <FormattedMessage id="error.tribe_name" />} />
            <SelectField style={styles.field} ref="tribe_type" floatingLabelText="Type" value={this.state.tribe_type} onChange={this.handleTypeChange} errorText={this.props.error === 'tribe_type' && <FormattedMessage id="error.tribe_type" />}>
              {typeItems}
            </SelectField>
            <TextField style={styles.field} ref="city" autoComplete="off" id="city" placeholder="" floatingLabelText="City" required errorText={['city_name', 'country_code', 'place_id'].indexOf(this.props.error) >=0 && <FormattedMessage id="error.city" />} />
            <SelectField style={styles.field} ref="currency" floatingLabelText="Currency" value={this.state.currency} onChange={this.handleCurrencyChange} errorText={this.props.error === 'currency' && <FormattedMessage id="error.currency" />}>
              {currencyItems}
            </SelectField>
          </CardText>
          <CardActions style={styles.actions}>
            <RaisedButton label="Register & create this tribe" type="submit" />
            <p className="error">{this.props.error === 'other' && <FormattedMessage id="error.other" />}</p>
          </CardActions>
        </Card>
      </form>
    )
  }

}

Register.propTypes = {
  error: PropTypes.string,
  lang: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  error: state.register.error,
  lang: state.app.lang,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateLang,
  postRegister,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register)
import React from 'react'
import Routes from 'routes'
import { History } from 'history'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as constants from 'reducers/constants'

import { IonContent, IonPage, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react'
import { Header } from 'components'

import Requests, { endPoints } from 'requests'

export type Props = {
  history: History,
  showLoading: Function,
  hideLoading: Function,
  showToast: Function,
  hideToast: Function
}

class Component extends React.Component<Props> {

  state = { phone: null }

  onChange = (e: any) => {
    const { name, value } = e.target
    this.setState({ ...this.state, [name]: value })
  }

  onSubmit = (e: any) => {
    e.preventDefault()
    const { showLoading, hideLoading, showToast, hideToast, history } = this.props
    const { phone } = this.state
    if (phone) {
      hideToast()
      showLoading()
      Requests.post(endPoints.signup1, { phone }).then((response: any) => {
        console.info(response)
        history.push({
          pathname: Routes.signup2.path,
          state: { token: response.token }
        })
      }).catch(err => {
        console.error(err)
        showToast(err.error || err.toString())
      }).finally(() => hideLoading())
    }
  }

  render() {
    const { phone } = this.state
    return (
      <IonPage>
        <Header omitsBack />
        <IonContent className="ion-padding">
          <form onSubmit={this.onSubmit}>
            <IonList lines="full" className="ion-no-margin ion-no-padding">
              <IonItem>
                <IonLabel position="floating">Phone</IonLabel>
                <IonInput onIonChange={this.onChange} value={phone} type="tel" name="phone" autocomplete="off" />
              </IonItem>
            </IonList>
            <div className="ion-padding">
              <IonButton expand="block" type="submit" className="ion-no-margin">Submit</IonButton>
            </div>
          </form>
        </IonContent>
      </IonPage>
    )
  }

}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  showLoading: () => ({
    type: constants.SHOW_LOADING
  }),
  hideLoading: () => ({
    type: constants.HIDE_LOADING
  }),
  showToast: (payload: string) => ({
    type: constants.SHOW_TOAST,
    payload
  }),
  hideToast: () => ({
    type: constants.HIDE_TOAST
  })
}, dispatch)

export default connect(null, mapDispatchToProps)(Component)

import React, { ChangeEvent, FormEvent } from 'react'
import Routes from 'routes'
import { History } from 'history'

import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import * as constants from 'reducers/constants'

import {
  IonButton,
  IonContent,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
} from '@ionic/react'
import { Header, PhoneInput } from 'components'
import HeadComponent from './HeadComponent'

import Requests, { endPoints } from 'requests'

import { CCs } from 'utils/msisdn'

export type Props = {
  history: History
  showLoading: Function
  hideLoading: Function
  showToast: Function
  hideToast: Function
}

const header = "Let's start"
const subHeader = 'Enter your phone number to receive a verification code'

class Component extends React.Component<Props> {
  state = { phone: null, inputFocussed: null }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState({ ...this.state, [name]: value })
  }

  onSubmit = (event?: FormEvent) => {
    event && event.preventDefault()

    const { showLoading, hideLoading, showToast, hideToast, history } =
      this.props
    const { phone: partPhone } = this.state

    if (partPhone) {
      hideToast()
      showLoading()
      const phone = `${CCs.ug.value}${(partPhone || '').trim()}`
      Requests.post<{ token: string; phone: string }>(endPoints.signup1, {
        phone,
      })
        .then(response => {
          history.push({
            pathname: Routes.signup2.path,
            state: { token: response.token, phone },
          })
        })
        .catch(err => {
          showToast(err.error || err.toString())
          throw err
        })
        .finally(() => hideLoading())
    }
  }

  onInputFocus = (target: EventTarget | null) => {
    this.setState({ inputFocussed: (target as HTMLInputElement).name })
  }

  onInputBlur = () => this.setState({ inputFocussed: null })

  onKeyUp = (event: { keyCode: number }) =>
    event.keyCode === 13 && this.onSubmit()

  getIonLabelStyle = (name: string) => {
    return this.state.inputFocussed === name
      ? { color: 'var(--ion-color-action-primary)' }
      : {}
  }

  getIonItemDividerStyle = (name: string) => {
    const o = { minHeight: 0.1 }
    return this.state.inputFocussed === name
      ? { ...o, '--background': 'var(--ion-color-primary)' }
      : o
  }

  render() {
    const { phone } = this.state
    return (
      <IonPage>
        <Header omitsBack />
        <IonContent>
          <HeadComponent header={header} subHeader={subHeader} />
          <form onSubmit={this.onSubmit}>
            <IonList className="ion-no-margin ion-no-padding">
              <IonItem lines="none">
                <IonLabel
                  position="stacked"
                  style={this.getIonLabelStyle('phone')}
                >
                  Phone <span className="ion-label-secondary">*</span>
                </IonLabel>
                {/* <IonInput onIonChange={this.onChange} value={phone} type="tel" name="phone" autocomplete="off" /> */}
                <PhoneInput
                  name="phone"
                  value={phone || ''}
                  onChange={this.onChange}
                  onFocus={e => this.onInputFocus(e.target)}
                  onBlur={this.onInputBlur}
                  onKeyUp={this.onKeyUp}
                />
              </IonItem>
              <IonItemDivider style={this.getIonItemDividerStyle('phone')} />
            </IonList>
            <div className="ion-padding">
              <IonButton
                expand="block"
                type="submit"
                className="ion-no-margin ion-action-primary"
              >
                Next
              </IonButton>
            </div>
          </form>
        </IonContent>
      </IonPage>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      showLoading: () => ({
        type: constants.SHOW_LOADING,
      }),
      hideLoading: () => ({
        type: constants.HIDE_LOADING,
      }),
      showToast: (payload: string) => ({
        type: constants.SHOW_TOAST,
        payload,
      }),
      hideToast: () => ({
        type: constants.HIDE_TOAST,
      }),
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Component)

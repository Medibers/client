import React, { FormEvent } from 'react'
import Routes from 'routes'
import { History } from 'history'

import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import * as constants from 'reducers/constants'

import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
} from '@ionic/react'

import { Link } from 'react-router-dom'

import { Header } from 'components'
import HeadComponent from './HeadComponent'

import Requests, { endPoints } from 'requests'
import { setSessionPhone, setSessionToken } from 'session'

import { APP_NAME } from 'utils'

interface ILocationState {
  token: string
  phone: string
}

export type Props = {
  history: History<ILocationState>
  showLoading: Function
  hideLoading: Function
  showToast: Function
  hideToast: Function
}

const header = 'Almost there'
const subHeader =
  'Enter the verification code you received, a password you use to login and your name'

class Component extends React.Component<Props> {
  state = {
    code: null,
    password: null,
    name: null,
    email: null,
    inputFocussed: null,
  }

  onChange = (event: CustomEvent<unknown>) => {
    const { name, value } = event.target as HTMLInputElement
    this.setState({ [name]: value })
  }

  onSubmit = (event?: FormEvent) => {
    event && event.preventDefault()
    if (this.props.history.location.state === undefined) return

    const {
      showLoading,
      hideLoading,
      showToast,
      hideToast,
      history: {
        location: {
          state: { token, phone },
        },
      },
    } = this.props

    const { code, password, name, email } = this.state

    if (code && password && name) {
      hideToast()
      showLoading()
      Requests.post<{ token: string }>(endPoints.signup2, {
        token,
        code: (code || '').trim(),
        secret: (password || '').trim(),
        name: (name || '').trim(),
        email: (email || '').trim() || null,
      })
        .then(response => {
          setSessionToken(response.token)
          setSessionPhone(phone)
          window.location.replace(Routes.home.path)
        })
        .catch(err => {
          showToast(err.error || err.toString())
          throw err
        })
        .finally(() => hideLoading())
    }
  }

  onInputFocus = ({ target }: CustomEvent<unknown>) => {
    const { name, value } = target as HTMLInputElement
    this.setState({ inputFocussed: name, [name]: value })
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
    const { code, password, name, email } = this.state
    return (
      <IonPage>
        <Header />
        <IonContent>
          <HeadComponent header={header} subHeader={subHeader} />
          <form onSubmit={this.onSubmit} autoComplete="off">
            <IonList className="ion-no-margin ion-no-padding">
              <IonItem lines="none">
                <IonLabel
                  position="floating"
                  style={this.getIonLabelStyle('code')}
                >
                  Verification code{' '}
                  <span className="ion-label-secondary">*</span>
                </IonLabel>
                <IonInput
                  onIonChange={this.onChange}
                  onIonFocus={this.onInputFocus}
                  onIonBlur={this.onInputBlur}
                  onKeyUp={this.onKeyUp}
                  value={code}
                  type="text"
                  name="code"
                />
              </IonItem>
              <IonItemDivider style={this.getIonItemDividerStyle('code')} />
              <IonItem lines="none">
                <IonLabel
                  position="floating"
                  style={this.getIonLabelStyle('password')}
                >
                  Password you will use{' '}
                  <span className="ion-label-secondary">*</span>
                </IonLabel>
                <IonInput
                  onIonChange={this.onChange}
                  onIonFocus={this.onInputFocus}
                  onIonBlur={this.onInputBlur}
                  onKeyUp={this.onKeyUp}
                  value={password}
                  type="text"
                  name="password"
                />
              </IonItem>
              <IonItemDivider style={this.getIonItemDividerStyle('password')} />
              <IonItem lines="none">
                <IonLabel
                  position="floating"
                  style={this.getIonLabelStyle('name')}
                >
                  Your name <span className="ion-label-secondary">*</span>
                </IonLabel>
                <IonInput
                  onIonChange={this.onChange}
                  onIonFocus={this.onInputFocus}
                  onIonBlur={this.onInputBlur}
                  onKeyUp={this.onKeyUp}
                  value={name}
                  type="text"
                  name="name"
                />
              </IonItem>
              <IonItemDivider style={this.getIonItemDividerStyle('name')} />

              <IonItem lines="none">
                <IonLabel
                  position="floating"
                  style={this.getIonLabelStyle('email')}
                >
                  Email
                </IonLabel>
                <IonInput
                  onIonChange={this.onChange}
                  onIonFocus={this.onInputFocus}
                  onIonBlur={this.onInputBlur}
                  onKeyUp={this.onKeyUp}
                  value={email}
                  type="email"
                  name="email"
                />
              </IonItem>
              <IonItemDivider style={this.getIonItemDividerStyle('name')} />

              <IonItem lines="full" className="ion-margin-top">
                <IonLabel className="wrap">
                  <p className="ion-label-primary">
                    By completing signup and using {APP_NAME}, you are bound by
                    the terms, conditions and privacy policy stated&nbsp;
                    <Link to={Routes.tcs.path}>here</Link>
                  </p>
                </IonLabel>
              </IonItem>
            </IonList>
            <div className="ion-padding">
              <IonButton
                expand="block"
                type="submit"
                className="ion-no-margin ion-action-primary"
              >
                Complete Signup
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

import React, { FormEvent } from 'react'

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

import { home, ellipsisVertical as more } from 'ionicons/icons'

import { Header, Menu, PhoneInput } from 'components'

import Requests, { endPoints } from 'requests'
import { setSessionPhone, setSessionToken } from 'session'

import { CCs } from 'utils/msisdn'

import Routes, { getDefaultRoute } from 'routes'
import { getLocationQueryParameter, redirectTo } from 'app-history'

import getMenuActions from 'views/pages/menu-actions'

import HeadComponent from '../HeadComponent'
import CreateAccountButton from './CreateAccountButton'
import ResetPasswordButton from './ResetPasswordButton'

interface ILoginProps {
  showLoading: () => void
  hideLoading: () => void
  showToast: (message: string) => void
  hideToast: () => void
  showMenu: (event: Event) => void
}

const header = 'Welcome!'
const subHeader = 'Provide your phone and password to sign in'

class Component extends React.Component<ILoginProps> {
  state = { phone: null, inputFocussed: null, password: null }

  onChange = (target: EventTarget | null) => {
    const { name, value } = target as HTMLInputElement
    this.setState({ [name]: value })
  }

  onSubmit = async (event?: FormEvent) => {
    event && event.preventDefault()
    const { showLoading, hideLoading, showToast, hideToast } = this.props
    const { phone: partPhone, password } = this.state
    if (partPhone && password) {
      hideToast()
      showLoading()
      const phone = `${CCs.ug.value}${String(partPhone || '').trim()}`

      const { token } = await Requests.post<{ token: string }>(
        endPoints.login,
        {
          phone,
          secret: password,
        }
      ).catch(err => {
        showToast(err.error || err.toString())
        throw err
      })

      hideLoading()

      setSessionToken(token)
      setSessionPhone(phone)

      const toUrl = getLocationQueryParameter('to') || getDefaultRoute(token)

      window.location.replace(toUrl)
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

  toolbarActions = () => [
    {
      icon: home,
      handler: () => {
        redirectTo(Routes.home.path)
      },
    },
    {
      icon: more,
      handler: (event: React.MouseEvent) =>
        this.props.showMenu(event.nativeEvent),
    },
  ]

  render() {
    const { phone, password } = this.state
    return (
      <IonPage>
        <Header omitsBack actions={this.toolbarActions()} />
        <Menu actions={getMenuActions()} />
        <IonContent>
          <HeadComponent header={header} subHeader={subHeader} />
          <form onSubmit={this.onSubmit}>
            <IonList className="ion-no-margin ion-no-padding">
              <IonItem lines="none">
                <IonLabel
                  style={this.getIonLabelStyle('phone')}
                  position="stacked"
                >
                  Phone <span className="ion-label-secondary">*</span>
                </IonLabel>
                <PhoneInput
                  name="phone"
                  value={phone || ''}
                  onChange={e => this.onChange(e.target)}
                  onFocus={e => this.onInputFocus(e.target)}
                  onBlur={this.onInputBlur}
                  onKeyUp={this.onKeyUp}
                />
              </IonItem>
              <IonItemDivider style={this.getIonItemDividerStyle('phone')} />
              <IonItem lines="none">
                <IonLabel
                  style={this.getIonLabelStyle('password')}
                  position="stacked"
                >
                  Password <span className="ion-label-secondary">*</span>
                </IonLabel>
                <IonInput
                  onIonChange={e => this.onChange(e.target)}
                  onIonFocus={e => this.onInputFocus(e.target)}
                  onIonBlur={this.onInputBlur}
                  onKeyUp={this.onKeyUp}
                  value={password}
                  type="password"
                  name="password"
                />
              </IonItem>
              <IonItemDivider style={this.getIonItemDividerStyle('password')} />
            </IonList>
            <IonButton
              expand="block"
              type="submit"
              className="ion-margin ion-action-primary"
            >
              Submit
            </IonButton>
            <CreateAccountButton />
            <ResetPasswordButton />
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
      showMenu: (event: Event) => ({
        type: constants.SHOW_MENU,
        payload: { event },
      }),
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Component)

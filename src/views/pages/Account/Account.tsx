import React from 'react'

import {
  IonButton,
  IonContent,
  IonIcon,
  IonLabel,
  IonList,
  IonPage,
} from '@ionic/react'

import { ellipsisVertical as more } from 'ionicons/icons'

import { Header, ListItem, Menu, Popover } from 'components'
import { MSISDNModify as MSISDNModifyPopover } from 'containers'

import Requests, { endPoints } from 'requests'
import { setSessionToken } from 'session'
import { setLanguage } from 'languages'

import LanguagesList from './LanguagesList'
import LogoutAlert from './LogoutAlert'

import { currentLanguage, getListItems, menuId } from './utils'
import { hideLoading, showLoading, showMenu, showToast } from 'store/utils'

export class AccountPage extends React.Component {
  state = {
    credits: 0,
    msisdnPopoverShown: false,
    languagePopoverShown: false,
    logoutAlertShown: false,
  }

  componentDidMount() {
    showLoading()
    Requests.get(endPoints['credits'])
      .then(response => {
        this.setState({ credits: response })
      })
      .catch(err => {
        showToast(err.error || err.toString())
      })
      .finally(hideLoading)
  }

  showMSISDNPopover = () => {
    this.setState({ msisdnPopoverShown: true })
  }

  hideMSISDNPopover = () => {
    this.setState({ msisdnPopoverShown: false })
  }

  showLogoutAlert = () => {
    this.setState({ logoutAlertShown: true })
  }

  hideLogoutAlert = () => {
    this.setState({ logoutAlertShown: false })
  }

  showLanguagePopover = () => {
    this.setState({ languagePopoverShown: true })
  }

  hideLanguagePopover = () => {
    this.setState({ languagePopoverShown: false })
  }

  onSubmitChangeNumber = (msisdn: string) => {
    this.hideMSISDNPopover()
    showLoading()
    Requests.post<string>(endPoints['mtn-msisdn'], { msisdn })
      .then(response => {
        setSessionToken(response)
      })
      .catch(err => {
        showToast(err.error || err.toString())
      })
      .finally(hideLoading)
  }

  onSelectLanguage = (language: string) => {
    setLanguage(language)
    this.hideLanguagePopover()
  }

  toolbarActions = () => [
    {
      icon: more,
      handler: (event: React.MouseEvent) => showMenu(event.nativeEvent, menuId),
    },
  ]

  menuActions = () => [
    {
      text: 'Logout',
      handler: this.showLogoutAlert,
    },
  ]

  render() {
    const { msisdnPopoverShown, languagePopoverShown, logoutAlertShown } =
      this.state

    const context = {
      showLanguagePopover: this.showLanguagePopover,
    }

    const listItems = getListItems.call(context)

    return (
      <IonPage>
        <Header title="Profile" actions={this.toolbarActions()} />
        <Menu menuId={menuId} actions={this.menuActions()} />
        <IonContent>
          <IonList lines="inset" className="ion-no-margin ion-no-padding">
            {listItems.map((item, i, a) => {
              return item ? (
                <ListItem
                  key={i}
                  button={Boolean(item.handler)}
                  onClick={item.handler}
                  isLast={i + 1 === a.length}
                >
                  <IonIcon
                    icon={item.icon}
                    className="ion-icon-primary"
                    slot="start"
                  />
                  <IonLabel>
                    <p>{item.name}</p>
                    <h3
                      className={item.handler ? 'ion-label-primary' : undefined}
                    >
                      {item.value}
                    </h3>
                  </IonLabel>
                  {item.actionText ? (
                    <IonButton
                      type="button"
                      slot="end"
                      className={
                        item.handler
                          ? 'ion-no-margin ion-action-secondary'
                          : 'ion-no-margin'
                      }
                      fill={item.handler ? undefined : 'clear'}
                    >
                      {item.actionText}
                    </IonButton>
                  ) : null}
                </ListItem>
              ) : null
            })}
          </IonList>
          <MSISDNModifyPopover
            open={msisdnPopoverShown}
            onDismiss={this.hideMSISDNPopover}
            onSubmit={this.onSubmitChangeNumber}
          />
          <Popover
            open={languagePopoverShown}
            onDismiss={this.hideLanguagePopover}
          >
            <LanguagesList
              language={currentLanguage}
              onSelect={this.onSelectLanguage}
            />
          </Popover>
          <LogoutAlert
            open={logoutAlertShown}
            onDismiss={this.hideLogoutAlert}
          />
        </IonContent>
      </IonPage>
    )
  }
}

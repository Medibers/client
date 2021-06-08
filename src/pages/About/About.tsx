import React from 'react'

import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import * as constants from 'reducers/constants'

import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
} from '@ionic/react'

import { Header } from 'components'

import APIServer, { FileServer, endPoints } from 'requests'
import { sessionAvailable as isSessionAvailable } from 'session'

import { APP_NAME, APP_VERSION } from 'utils'

import getPageText from 'text'

import { IFAQ, ISupportContacts } from './types'

import Contacts from './Contacts'

const Text = getPageText('about')

const sessionAvailable = isSessionAvailable()

const steps = [
  'Request for any item initially selecting one of the categories',
  'Choose a delivery location',
  'Make payment or pay on delivery',
]

const faqAnswerStyle = (show: boolean) => ({
  height: show ? undefined : 0,
})

const ionItemStyle = {
  '--min-height': 0,
}

type Props = {
  showLoading: () => void
  hideLoading: () => void
  showToast: (arg: string) => void
}

type State = {
  faqs?: Array<IFAQ>
  openFAQs: Array<number>
  supportContacts?: ISupportContacts
}

class Component extends React.Component<Props> {
  state: State = { openFAQs: [] }

  componentDidMount() {
    this.fetchFAQsAndSupportContacts()
  }

  fetchFAQsAndSupportContacts = () => {
    const { showLoading, hideLoading, showToast } = this.props
    showLoading()
    Promise.all([
      FileServer.get<Array<IFAQ>>(endPoints.faqs),
      APIServer.get<ISupportContacts>(endPoints['support-contacts']),
    ])
      .then(([faqs, supportContacts]) => {
        this.setState({ faqs, supportContacts }, hideLoading)
      })
      .catch(() => {
        showToast(
          'We could not fetch FAQs and Customer Care information, please ensure you have an active internet connection'
        )
        hideLoading()
      })
  }

  onFAQSelected = (i: number) => {
    const { openFAQs } = this.state
    const index = openFAQs.indexOf(i)
    if (index < 0) {
      openFAQs.push(i)
    } else {
      openFAQs.splice(index, 1)
    }
    this.setState({ openFAQs })
  }

  render() {
    const { faqs = [], openFAQs, supportContacts } = this.state

    return (
      <IonPage>
        <Header title={Text.title} />
        <IonContent className="ion-padding">
          <IonLabel>
            <IonList lines="none" className="ion-no-padding">
              <IonItem className="ion-no-padding" style={ionItemStyle}>
                <h3>
                  {APP_NAME} securely fast delivers medical items right to where
                  you choose
                </h3>
              </IonItem>
              <IonItem
                className="ion-no-padding ion-margin-vertical"
                style={ionItemStyle}
              >
                <h3>
                  {sessionAvailable
                    ? `Get started in ${steps.length} quick steps`
                    : `
                      Set up an account with your telephone number
                      and enjoy this service in ${steps.length} quick steps
                    `}
                </h3>
              </IonItem>
              {steps.map((step, i) => (
                <IonItem
                  key={i}
                  className="ion-align-items-start ion-no-padding ion-margin-vertical"
                  style={ionItemStyle}
                >
                  <h3
                    style={{ marginInlineEnd: '8px' }}
                    className="ion-label-primary"
                  >
                    {i + 1}.
                  </h3>
                  <h3 className="ion-label-primary">{step}</h3>
                </IonItem>
              ))}
            </IonList>
          </IonLabel>
          <IonCard className="ion-no-margin ion-margin-top">
            <IonCardHeader className="ion-no-padding ion-padding-top ion-padding-horizontal">
              <IonCardSubtitle>
                <IonItem className="ion-no-padding" lines="none">
                  <IonIcon
                    slot="start"
                    className="ion-icon-secondary"
                    icon="/assets/icons/help.svg"
                  />
                  Frequently Asked Questions
                </IonItem>
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList lines="full">
                {faqs.map(({ header, qn, ans }, i, a) => {
                  if (header)
                    return (
                      <IonListHeader key={i} lines="full">
                        {header}
                      </IonListHeader>
                    )

                  return (
                    <IonItem
                      key={i}
                      lines={
                        i === a.length - 1 || (a[i + 1] && a[i + 1].header)
                          ? 'none'
                          : undefined
                      }
                      onClick={() => this.onFAQSelected(i)}
                      button
                      className="no-ripple"
                    >
                      <IonLabel>
                        <h3 className="ion-label-primary ion-text-wrap">
                          {qn}
                        </h3>
                        <h3
                          className="ion-text-wrap"
                          style={faqAnswerStyle(openFAQs.includes(i))}
                        >
                          {ans}
                        </h3>
                      </IonLabel>
                    </IonItem>
                  )
                })}
              </IonList>
            </IonCardContent>
          </IonCard>
          <IonCard className="ion-no-margin ion-margin-top">
            <IonCardHeader className="ion-no-padding ion-padding-top ion-padding-horizontal">
              <IonCardSubtitle>
                <IonItem className="ion-no-padding" lines="none">
                  <IonIcon
                    slot="start"
                    className="ion-icon-secondary"
                    icon="/assets/icons/contact.svg"
                  />
                  Contact Customer Care
                </IonItem>
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              {supportContacts && <Contacts contacts={supportContacts} />}
            </IonCardContent>
          </IonCard>

          <div
            style={{
              margin: 'calc(3 * var(--ion-margin)) 0',
            }}
          >
            <IonLabel>
              <h2 className="ion-text-center ion-label-secondary">
                {APP_NAME}&nbsp;&nbsp;{`v${APP_VERSION}`}
              </h2>
            </IonLabel>
          </div>
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
    },
    dispatch
  )

export const AboutPage = connect(null, mapDispatchToProps)(Component)

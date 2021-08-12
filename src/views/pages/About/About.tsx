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

import { Header, Refresher } from 'components'

import APIServer, { FileServer, endPoints } from 'requests'

import { APP_NAME, getAppVersion } from 'utils'

import getPageText from 'text'

import { IFAQ, ISupportContacts } from './types'

import Intro from './Intro'
import Contacts from './Contacts'

const Text = getPageText('about')

const faqAnswerStyle = (show: boolean) => ({
  height: show ? undefined : 0,
})

interface Props {
  showLoading: () => void
  hideLoading: () => void
  showToast: (arg: string) => void
}

interface State {
  faqs?: Array<IFAQ>
  openFAQs: Array<number>
  supportContacts?: ISupportContacts
  version?: string
}

class Component extends React.Component<Props> {
  state: State = { openFAQs: [] }

  async componentDidMount() {
    this.fetchFAQsAndSupportContacts()
    this.setState({ version: await getAppVersion() })
  }

  fetchFAQsAndSupportContacts = async () => {
    const { showLoading, hideLoading, showToast } = this.props
    showLoading()
    const data = await Promise.all([
      FileServer.get<Array<IFAQ>>(endPoints.faqs),
      APIServer.get<ISupportContacts>(endPoints['support-contacts']),
    ]).catch(() => {
      showToast('No connection, please refresh this page to try again.')
      hideLoading()
    })
    if (data) {
      const [faqs, supportContacts] = data
      this.setState({ faqs, supportContacts }, hideLoading)
    }
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
    const { faqs = [], openFAQs, supportContacts, version } = this.state

    return (
      <IonPage>
        <Header title={Text.title} />
        <IonContent className="ion-padding">
          <Refresher onRefresh={this.fetchFAQsAndSupportContacts} />
          <Intro />
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
                {APP_NAME}&nbsp;&nbsp;{`${version}`}
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

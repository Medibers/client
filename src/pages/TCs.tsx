import React from 'react'
import Markdown from 'react-markdown'

import { FileServer, endPoints } from 'requests'

import { IonContent, IonPage } from '@ionic/react'
import { Refresher } from 'components'

import { hideLoading, showLoading } from 'store/utils'

const styles = `
  <style>
    h5, h6, a {
      color: var(--ion-color-primary);
    }
    h5 {
      margin: 2rem 0 0.5rem 0;
      text-decoration: underline;
    }
    h6 {
      margin: 1.5rem 0 0.3rem 0;
      font-weight: bold;
    }
    p {
      margin: 0.5rem 0;
    }
    ul {
      padding: 0 0 0 16px;
      margin: 0.5rem 0;
    }
    ul li {
      margin: 0.2rem 0;
    }
  </style>
`

/*
 * Terms of operation, Privacy policy
 *
 */

class Component extends React.Component {
  state = { text: undefined }

  async componentDidMount() {
    await this.fetchTCs()
  }

  fetchTCs = async () => {
    showLoading()
    const text =
      // eslint-disable-next-line no-console
      (await FileServer.get(endPoints.tcs).catch(console.error)) ||
      'No connection, please refresh this page to try again.'
    this.setState({ text }, () => {
      hideLoading()
    })
  }

  render() {
    const { text = '' } = this.state
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <Refresher onRefresh={this.fetchTCs} />
          <Markdown allowDangerousHtml>{styles.concat(text)}</Markdown>
        </IonContent>
      </IonPage>
    )
  }
}

export default Component

import React from 'react'
import Markdown from 'react-markdown'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as constants from 'reducers/constants'

import { FileServer, endPoints } from 'requests'

import { IonContent, IonPage } from '@ionic/react'

type Props = {
  history: History,
  showLoading: () => {},
  hideLoading: () => {},
  showToast: (e: string) => {},
}

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

class Component extends React.Component<Props> {

  state = { text: undefined }

  componentDidMount() {
    this.fetchTCs()
  }

  fetchTCs = async () => {
    const { showLoading, hideLoading } = this.props
    showLoading()
    const text = await FileServer.get(endPoints.tcs)
    this.setState({ text }, hideLoading)
  }

  render() {
    const { text = '' } = this.state
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <Markdown allowDangerousHtml>{styles.concat(text)}</Markdown>
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
  })
}, dispatch)

export default connect(null, mapDispatchToProps)(Component)

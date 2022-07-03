import React from 'react'
import { IonLoading } from '@ionic/react'

import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

import * as constants from 'reducers/constants'
import { State as ReducerState } from 'reducers'

export type Props = {
  open: boolean
  message?: string
  hideLoading: Function
}

const Component: React.FC<Props> = ({ open, message, hideLoading }) => (
  <IonLoading
    isOpen={open}
    message={message}
    onDidDismiss={() => hideLoading()}
  />
)

Component.defaultProps = { message: 'Please wait' }

const mapStateToProps = (state: ReducerState) => ({
  open: state.App.loading,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      hideLoading: () => ({
        type: constants.HIDE_LOADING,
      }),
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Component)

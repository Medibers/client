import React from 'react'

import { Alert } from 'components'
import { clearSession } from 'session'

interface ILogoutAlertProps {
  open: boolean
  onDismiss: () => void
}

const header = 'Logout?'
const message =
  'Your data will be deleted and you will be redirected to login. You will have to login to recover your data.'

const confirmText = 'Yes, logout'
const cancelText = 'Cancel'

const LogoutAlert: React.FC<ILogoutAlertProps> = ({
  open,
  onDismiss: dismiss,
}) => {
  const onConfirm = () => {
    clearSession()
    window.location.reload()
  }

  const buttons = [
    { text: confirmText, handler: onConfirm, cssClass: 'ion-label-secondary' },
    { text: cancelText, handler: dismiss },
  ]

  return (
    <Alert
      open={open}
      header={header}
      message={message}
      buttonText={confirmText}
      onDismiss={dismiss}
      buttons={buttons}
    />
  )
}

export default LogoutAlert

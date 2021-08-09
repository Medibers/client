import React, { useState } from 'react'

import { IonButton, IonContent, IonList, IonPage } from '@ionic/react'

import { FormProvider, useForm } from 'react-hook-form'
import { Header } from 'components'

import Routes from 'routes'
import Requests, { endPoints } from 'requests'

import { hideLoading, hideToast, showLoading, showToast } from 'store/utils'
import { getLocationState, redirectTo } from 'app-history'

import HeadComponent from '../HeadComponent'
import VerificationCode from './Step2Fields/VerificationCode'
import Password from './Step2Fields/Password'

const title = 'Reset Password'
const subHeader =
  'Provide the verification code you received through SMS, then type your new password'

interface IFormFields {
  code: string
  password: string
}

interface IPasswordResetRequest {
  token: string
  phone: string
}

interface ILocationState {
  token: string
}

const Component: React.FC = () => {
  const [resetSucceeded, setResetSucceeded] = useState(false)
  const methods = useForm<IFormFields>()

  const onSubmit = ({ code, password: secret }: IFormFields) => {
    const { token } = getLocationState<ILocationState>()

    hideToast()
    showLoading()

    Requests.post<IPasswordResetRequest>(endPoints['password-reset-2'], {
      token,
      code,
      secret,
    })
      .then(() => {
        methods.reset()
        setResetSucceeded(true)
        showToast('Your password was reset successfully')
      })
      .catch(err => {
        showToast(err.error || err.toString())
        console.error(err) // eslint-disable-line
      })
      .finally(hideLoading)
  }

  const goToLogin = () => {
    redirectTo(Routes.login.path)
  }

  return (
    <IonPage>
      <Header title={title} />
      <IonContent>
        <HeadComponent header="" subHeader={subHeader} />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <IonList className="ion-no-margin ion-no-padding">
              <VerificationCode />
              <Password />
            </IonList>
            <IonButton
              expand="block"
              type="submit"
              className="ion-margin ion-action-primary"
            >
              Submit
            </IonButton>
          </form>
        </FormProvider>
        {resetSucceeded ? (
          <IonButton
            onClick={goToLogin}
            expand="block"
            fill="clear"
            color="secondary"
            className="ion-margin"
          >
            Go to Login
          </IonButton>
        ) : null}
      </IonContent>
    </IonPage>
  )
}

export default Component

import React, { useState } from 'react'
// import Routes from 'routes'

import {
  IonButton,
  IonContent,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
} from '@ionic/react'

import { Controller, useForm } from 'react-hook-form'
import { Header, PhoneInput } from 'components'

import HeadComponent from '../HeadComponent'

import Routes from 'routes'
import Requests, { endPoints } from 'requests'

import { hideLoading, hideToast, showLoading, showToast } from 'store/utils'
import { CCs } from 'utils/msisdn'
import { redirectTo } from 'app-history'

const title = 'Reset Password'
const subHeader = 'Provide your phone number to reset your password'

interface IFormFields {
  phone: string
}

interface IPasswordResetRequest {
  token: string
  phone: string
}

const Component: React.FC = () => {
  const [inputFocussed, setInputPhocussed] = useState<string>()

  const onSubmit = ({ phone: partPhone }: IFormFields) => {
    hideToast()
    showLoading()
    const phone = `${CCs.ug.value}${(partPhone || '').trim()}`
    Requests.post<IPasswordResetRequest>(endPoints['password-reset-1'], {
      phone,
    })
      .then(response => {
        redirectTo(Routes.passwordReset2.path, {
          token: response.token,
          phone,
        })
      })
      .catch(err => {
        showToast(err.error || err.toString())
        console.error(err) // eslint-disable-line
      })
      .finally(hideLoading)
  }

  const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setInputPhocussed(event.target.name)
  }

  const onInputBlur = () => setInputPhocussed(undefined)

  const getIonLabelStyle = (name: string) => {
    return inputFocussed === name
      ? { color: 'var(--ion-color-action-primary)' }
      : {}
  }

  const getIonItemDividerStyle = (name: string) => {
    const o = { minHeight: 0.1 }
    return inputFocussed === name
      ? { ...o, '--background': 'var(--ion-color-primary)' }
      : o
  }

  const { control, handleSubmit } = useForm<IFormFields>()

  return (
    <IonPage>
      <Header title={title} />
      <IonContent>
        <HeadComponent header="" subHeader={subHeader} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList className="ion-no-margin ion-no-padding" lines="none">
            <IonItem>
              <IonLabel position="stacked" style={getIonLabelStyle('phone')}>
                Phone <span className="ion-label-secondary">*</span>
              </IonLabel>
              <Controller
                control={control}
                name="phone"
                defaultValue=""
                render={({ value, onChange }) => (
                  <PhoneInput
                    name="phone"
                    value={value}
                    onChange={onChange}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                  />
                )}
                rules={{
                  validate: value => value.trim().length === 9,
                }}
              />
            </IonItem>
            <IonItemDivider style={getIonItemDividerStyle('phone')} />
          </IonList>
          <IonButton
            expand="block"
            type="submit"
            className="ion-margin ion-action-primary"
          >
            Next
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
}

export default Component

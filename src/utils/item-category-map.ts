/* eslint-disable no-unused-vars */

// import {
//   bandageOutline as pharmacyIcon,
//   fitnessSharp as labIcon
// } from 'ionicons/icons'

import getPageText from 'text'

const Text = getPageText('home')

const categoryImageBaseUrl = '/static/assets/images/item-category'

export enum EItemCategory {
  ALL = 'all',
  PHARMACY = 'pharmacy',
  MEDICAL_DEVICES = 'medical-devices',
  LAB_EQUIPMENT = 'lab-equipment',
  MEDICAL_SUPPLIES = 'medical-supplies',
  HEALTH_SERVICES = 'health-services',
}

const map: {
  [key: string]: { imageUrl: string; label: string; description: string }
} = {
  [EItemCategory.ALL]: {
    imageUrl: '',
    label: Text['category-all'],
    description: '',
  },
  [EItemCategory.PHARMACY]: {
    imageUrl: categoryImageBaseUrl + '/pharmacy.jpeg',
    label: Text['category-pharmacy'],
    description: Text['category-pharmacy-description'],
  },
  [EItemCategory.MEDICAL_DEVICES]: {
    imageUrl: categoryImageBaseUrl + '/medical-devices.jpeg',
    label: Text['category-medical-devices'],
    description: Text['category-medical-devices-description'],
  },
  [EItemCategory.LAB_EQUIPMENT]: {
    imageUrl: categoryImageBaseUrl + '/lab-equipment.jpeg',
    label: Text['category-maintenance-tools'],
    description: Text['category-maintenance-tools-description'],
  },
  [EItemCategory.MEDICAL_SUPPLIES]: {
    imageUrl: categoryImageBaseUrl + '/medical-supplies.jpeg',
    label: Text['category-medical-supplies'],
    description: Text['category-medical-supplies-description'],
  },
  [EItemCategory.HEALTH_SERVICES]: {
    imageUrl: categoryImageBaseUrl + '/health-services.jpeg',
    label: Text['category-health-services'],
    description: Text['category-health-services-description'],
  },
}

export default map

// import {
//   bandageOutline as pharmacyIcon,
//   fitnessSharp as labIcon
// } from 'ionicons/icons'

import getPageText from 'text'

const Text = getPageText('home')

const categoryImageBaseUrl = '/assets/images/item-category'

const map: {
  [key: string]: { imageUrl: string; label: string; description: string }
} = {
  all: {
    imageUrl: '',
    label: Text['category-all'],
    description: '',
  },
  pharmacy: {
    imageUrl: categoryImageBaseUrl + '/pharmacy.jpeg',
    label: Text['category-pharmacy'],
    description: Text['category-pharmacy-description'],
  },
  'medical-devices': {
    imageUrl: categoryImageBaseUrl + '/medical-devices.jpeg',
    label: Text['category-medical-devices'],
    description: Text['category-medical-devices-description'],
  },
  'lab-equipment': {
    imageUrl: categoryImageBaseUrl + '/lab-equipment.jpeg',
    label: Text['category-maintenance-tools'],
    description: Text['category-maintenance-tools-description'],
  },
  'medical-supplies': {
    imageUrl: categoryImageBaseUrl + '/medical-supplies.jpeg',
    label: Text['category-medical-supplies'],
    description: Text['category-medical-supplies-description'],
  },
  'health-services': {
    imageUrl: categoryImageBaseUrl + '/health-services.jpeg',
    label: Text['category-health-services'],
    description: Text['category-health-services-description'],
  },
}

export default map

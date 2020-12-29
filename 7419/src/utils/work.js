import { get, post } from './http'
import {PUT_PHOTOS_API, GET_PHOTOS_API} from './api'

export const uploadPhotoAPI = form => post(PUT_PHOTOS_API, form)

export const getPhotosAPI = () => get(GET_PHOTOS_API)

import { LocalStorage } from 'quasar'

export function getToken(key) {
  try {
    return LocalStorage.getItem(key)
  } catch(e) {
    console.log(e)
  }
}

export function setToken(key, token) {
  try {
    LocalStorage.set(key, token)
  } catch(e) {
    console.log(e)
  }
}

export function removeToken(key) {
  try {
    LocalStorage.remove(key)
  } catch(e) {
    console.log(e)
  }
}

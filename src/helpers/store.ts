import Store, { type Schema } from 'electron-store'
import type { StoreProps } from './store.types.js'

const schema: Schema<StoreProps> = {
  layer: {
    type: 'string',
    enum: ['KBD', 'BAS', 'DEV', 'AXN', 'FNK', 'STG'],
    default: 'KBD'
  },
  theme: {
    type: 'string',
    enum: ['light', 'dark'],
    default: 'dark'
  },
  caps: {
    type: 'string',
    enum: ['ON', 'OFF'],
    default: 'OFF'
  },
  os: {
    type: 'string',
    enum: ['windows', 'macos', 'linux', 'wsl']
  }
}

let store: Store<StoreProps> | undefined

export const getStore = (): Store<StoreProps> => {
  if (store === undefined) {
    store = new Store<StoreProps>({ schema })
  }
  return store
}

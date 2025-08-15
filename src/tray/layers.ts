import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Tray, nativeImage, type NativeImage } from 'electron'
import { type App } from 'electron/main'
import type { Layers } from './layers.types.js'
import { exitMenu } from '../helpers/menu.js'
import { getStore } from '../helpers/store.js'

const store = getStore()

const getDefaultIcon = (): NativeImage => {
  const theme = store.get('theme')

  const pathIconKbd = path.join(fileURLToPath(import.meta.url), '../..', `/assets/icons/layers/${theme}/KBD.png`)
  const iconLayerKbd = nativeImage.createFromPath(pathIconKbd)
  return iconLayerKbd
}

export const reset = (tray: Tray): void => {
  const iconImageKbd = getDefaultIcon()
  tray.setImage(iconImageKbd)
  tray.setToolTip('Waiting...')
}

export const set = (tray: Tray, key: Layers): void => {
  try {
    const theme = store.get('theme')

    const iconPath = path.join(fileURLToPath(import.meta.url), '../..', `/assets/icons/layers/${theme}/${key}.png`)
    const iconImage = nativeImage.createFromPath(iconPath)
    tray.setImage(iconImage)
    tray.setToolTip(`${key} Layer`)
  } catch {
    reset(tray)
  }
}

export const create = (app: App): Tray => {

  const iconLayerKbd = getDefaultIcon()
  const tray = new Tray(iconLayerKbd)
  const menu = exitMenu(app, tray)

  tray.setToolTip('Waiting...')
  tray.setContextMenu(menu)
  return tray
}

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Menu, nativeImage } from 'electron'
import { type App } from 'electron/main'
import { getStore } from './store.js'

import { type Tray } from 'electron'
import { reset as resetCapsTray } from '../tray/caps.js'
import { reset as resetLayerTray } from '../tray/layers.js'

const store = getStore()

export const exitMenu = (app: App, tray: Tray) => {
  const theme = store.get('theme')

  const resetPath = path.join(fileURLToPath(import.meta.url), '../..', `/assets/icons/menu/${theme}/reset.png`)
  const resetIcon = nativeImage.createFromPath(resetPath)

  const exitPath = path.join(fileURLToPath(import.meta.url), '../..', `/assets/icons/menu/${theme}/quit.png`)
  const exitIcon = nativeImage.createFromPath(exitPath)

  const menu = Menu.buildFromTemplate([
    {
      label: 'Reset',
      role: 'reload',
      icon: resetIcon,
      click: () => {
        resetCapsTray(tray)
        resetLayerTray(tray)
      }
    },
    {
      label: 'Quit',
      role: 'quit',
      icon: exitIcon,
      click: () => {
        app.quit()
      }
    }
  ])

  return menu
}

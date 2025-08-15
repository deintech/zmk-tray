import { app, globalShortcut } from 'electron/main'
import { type Tray } from 'electron'
import { create as createCapsTray, set as setCapsTray } from './tray/caps.js'
import { create as createLayerTray, set as setLayerTray } from './tray/layers.js'
import { getStore } from './helpers/store.js'
import { detectOs } from './helpers/os.js'
import { openHelp } from './helpers/help.js'
import { detectTheme } from './helpers/theme.js'

const store = getStore()

let capsTray: Tray
let layerTray: Tray

app.whenReady().then(() => {
  const os = detectOs()
  store.set('os', os)

  const theme = detectTheme() || 'light'
  store.set('theme', theme)

  // Hide dock icon
  app.dock.hide()

  // Caps keyboard shortcuts
  capsTray = createCapsTray(app)
  setCapsTray(capsTray, 'OFF')

  globalShortcut.register('Shift+F13', () => {
    setCapsTray(capsTray)
  })

  globalShortcut.register('Alt+F13', () => {
    setCapsTray(capsTray, 'CW-ON')
  })

  globalShortcut.register('Shift+Ctrl+F13', () => {
    setCapsTray(capsTray, 'CW-OFF')
  })

  // Layer keyboard shortcuts
  layerTray = createLayerTray(app)

  globalShortcut.register('Shift+F14', () => {
    store.set('layer', 'BAS')
    setLayerTray(layerTray, 'BAS')
  })

  globalShortcut.register('Shift+F15', () => {
    store.set('layer', 'DEV')
    setLayerTray(layerTray, 'DEV')
  })

  globalShortcut.register('Shift+F16', () => {
    store.set('layer', 'AXN')
    setLayerTray(layerTray, 'AXN')
  })

  globalShortcut.register('Shift+F17', () => {
    store.set('layer', 'FNK')
    setLayerTray(layerTray, 'FNK')
  })

  globalShortcut.register('Shift+F18', () => {
    store.set('layer', 'STG')
    setLayerTray(layerTray, 'STG')
  })

  // Help keyboard shortcut
  const helpAccelerators = [
    'Shift+Super+Control+F14',
    'Shift+Super+Control+F15',
    'Shift+Super+Control+F16',
    'Shift+Super+Control+F17',
    'Shift+Super+Control+F18'
  ]
  globalShortcut.registerAll(
    helpAccelerators,
    async (): Promise<void> => await openHelp()
  )
}).catch(error => { console.error('Error: ', error) })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('before-quit', () => {
  capsTray.destroy()
  layerTray.destroy()
})

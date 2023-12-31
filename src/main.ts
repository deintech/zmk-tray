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

  const theme = detectTheme()
  store.set('theme', theme)

  // Caps keyboard shortcuts
  capsTray = createCapsTray(app)
  setCapsTray(capsTray, 'OFF')

  globalShortcut.register('F18', () => {
    setCapsTray(capsTray)
  })

  globalShortcut.register('Shift+F18', () => {
    setCapsTray(capsTray, 'CW-ON')
  })

  globalShortcut.register('Shift+Ctrl+F18', () => {
    setCapsTray(capsTray, 'CW-OFF')
  })

  // Layer keyboard shortcuts
  layerTray = createLayerTray(app)

  globalShortcut.register('Shift+F19', () => {
    store.set('layer', 'BAS')
    setLayerTray(layerTray, 'BAS')
  })

  globalShortcut.register('Shift+F20', () => {
    store.set('layer', 'DEV')
    setLayerTray(layerTray, 'DEV')
  })

  globalShortcut.register('Shift+F21', () => {
    store.set('layer', 'AXN')
    setLayerTray(layerTray, 'AXN')
  })

  globalShortcut.register('Shift+F22', () => {
    store.set('layer', 'FNK')
    setLayerTray(layerTray, 'FNK')
  })

  globalShortcut.register('Shift+F23', () => {
    store.set('layer', 'STG')
    setLayerTray(layerTray, 'STG')
  })

  // Help keyboard shortcut
  const helpAccelerators = [
    'Ctrl+Alt+Shift+F19',
    'Ctrl+Alt+Shift+F20',
    'Ctrl+Alt+Shift+F21',
    'Ctrl+Alt+Shift+F22',
    'Ctrl+Alt+Shift+F23'
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

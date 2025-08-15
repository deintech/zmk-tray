import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { shell } from 'electron'
import { spawn } from 'node:child_process'

import { getStore } from './store.js'

const store = getStore()

export const openHelp = async (): Promise<void> => {
  const os = store.get('os')

  let layer = store.get('layer')
  if (layer === 'FNK') {
    layer = 'AXN'
  }

  if (layer !== 'KBD') {
    const imagePath = `assets/layers/${layer}.png`
    const helpPath = path.join(fileURLToPath(import.meta.url), '../..', imagePath)

    if (os === 'macos') {
      // Open with Quick Look
      spawn('qlmanage', ['-p', `"${helpPath}"`, '2>&1'], { stdio: 'inherit', detached: true, shell: true })
    } else {
      // Open with Default app
      await shell.openPath(helpPath)
    }
  }
}

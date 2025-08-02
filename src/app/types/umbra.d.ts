declare global {
  type UmbraMode = 'global' | 'website'

  interface UmbraOverlay {
    blend: string
    color: string
    opacity: number
  }

  interface UmbraSettings {
    global: { overlay: Overlay }
    website: {
      hostname: string
      mode: UmbraMode
      on: boolean
      overlay: Overlay
    }
  }

  interface UmbraState { settings: Settings }

  type UmbraUpdateType = null | 'activated' | 'reset'
}

export {}

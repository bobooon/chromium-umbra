import chromeApi, { defaultSettings } from '../extension/api.ts'

interface UmbraAction { type: string, value: any, dispatch?: (action: UmbraAction) => void }

const handler: { [key: string]: (state: UmbraState, value: any) => void } = {}

handler.loadSettings = async (state: UmbraState, value: UmbraSettings) => {
  state.settings = { ...value }
}

handler.setOn = (state, value) => {
  state.settings.website.on = value
}

handler.setMode = (state, value) => {
  state.settings.website.mode = value ? 'global' : 'website'
}

handler.setOpacity = (state, value) => {
  state.settings[state.settings.website.mode].overlay.opacity = value[0] / 100
}

handler.setBlend = (state, value) => {
  state.settings[state.settings.website.mode].overlay.blend = value
}

handler.setColor = (state, value) => {
  state.settings[state.settings.website.mode].overlay.color = value
}

handler.resetWebsite = (state) => {
  const settings = structuredClone(defaultSettings)
  settings.website.hostname = state.settings.website.hostname
  settings.global = state.settings.global
  state.settings = settings
}

handler.resetAll = (state) => {
  const settings = structuredClone(defaultSettings)
  settings.website.hostname = state.settings.website.hostname
  state.settings = settings
}

export default function pageReducer(prevState: UmbraState, action: UmbraAction) {
  const state = { ...prevState }
  if (handler[action.type])
    handler[action.type](state, action.value)

  chromeApi.saveSettings(state.settings, action.type === 'resetAll')
  return state
}

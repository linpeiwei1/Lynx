import { root } from '@lynx-js/react'
  
// import { FullScreenView } from './pop_up/FullScreenView.jsx'
import { CommondPopUpView } from './pop_up/CommondPopUpView.jsx'
// root.render(<App3 />)
// root.render(<ActivityPopup />)

// root.render(<FullScreenView />)
root.render(<CommondPopUpView />)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
  
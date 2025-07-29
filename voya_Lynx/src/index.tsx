import { root } from '@lynx-js/react'
  
import { FullScreenView } from './pop_up/FullScreenView.jsx'
 
// root.render(<App3 />)
// root.render(<ActivityPopup />)

root.render(<FullScreenView />)


if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}

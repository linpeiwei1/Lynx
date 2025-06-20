import { root, useState } from '@lynx-js/react'
 
import { ActivityPopup } from './ActivityPopup.jsx'

interface ContainerPageState {
  showHomePage: boolean;
  showAppPage: boolean; 
  globalData: string;
} 

// root.render(<App3 />)
root.render(<ActivityPopup />)


if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}

import { basicDark } from '../packages/basic-dark/src'
import { basicLight } from '../packages/basic-light/src'
import { gruvboxDark } from '../packages/gruvbox-dark/src'
import { gruvboxLight } from '../packages/gruvbox-light/src'
import { materialDark } from '../packages/material-dark/src'
import { solarizedDark } from '../packages/solarized-dark'
import { solarizedLight } from '../packages/solarized-light/src'

const themes = [
  {
    name: 'basic-dark',
    extension: basicDark
  },
  {
    name: 'basic-light',
    extension: basicLight
  },
  {
    name: 'gruvbox-dark',
    extension: gruvboxDark
  },
  {
    name: 'gruvbox-light',
    extension: gruvboxLight
  },
  {
    name: 'material-dark',
    extension: materialDark
  },
  {
    name: 'solarized-dark',
    extension: solarizedDark
  },
  {
    name: 'solarized-light',
    extension: solarizedLight
  }
]

export default themes
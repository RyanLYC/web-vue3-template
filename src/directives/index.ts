import type { App } from 'vue'
import permission from './permission'

export default (app: App<Element>) => {
  app.directive('permission', permission)
}

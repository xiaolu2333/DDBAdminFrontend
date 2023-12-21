import type {App, Directive, DirectiveBinding} from 'vue'


// 全部权限
const all_permission = ['*.*.*']


const permitDirective: Directive = {
  mounted(el, binding) {
  }
}

export const setupPermissionDirective = (app) => {
  app.directive('hasPerm', permitDirective)
}

export default permitDirective

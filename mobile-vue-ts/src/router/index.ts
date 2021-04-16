import {defineComponent, h} from 'vue'
const NotFoundComponent = { template: '<p>Page not found</p>' }
import Home from '../views/home/home'
import About from '../views/about/about.vue'

export const routes:Record<string,Record<any,any>> = {
    '/': Home,
    '/about': About,
}

const SimpleRouterApp = defineComponent({
    data: () => ({
        currentRoute: window.location.pathname
    }),

    computed: {
        ViewComponent ():Record<string,any> {
            return routes[this.currentRoute] || NotFoundComponent
        }
    },

    render () {
        return h(this.ViewComponent)
    },

    created () {
        window.addEventListener('popstate', () => {
            this.currentRoute = window.location.pathname
        })
    }
})
export default SimpleRouterApp

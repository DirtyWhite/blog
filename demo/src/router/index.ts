import Vue, { AsyncComponent } from 'vue'
import Router from 'vue-router'

import Home from '../pages/webGL/index.vue'
import Three from '../pages/three/index.vue'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/webGL'
        },
        {
            path: '/webGL',
            component: Home
        },
        {
            path: '/three',
            component: Three
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {

    } else {

    }
    next()
})

export default router;
import './assets/style.scss'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import {autoAnimatePlugin} from '@formkit/auto-animate/vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives
})

const app = createApp(App)

app.use(createPinia());

app.use(vuetify);
app.use(autoAnimatePlugin)

app.mount('#app')

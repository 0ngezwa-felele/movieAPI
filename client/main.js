import './style.css'
import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import App from './app'

window.Alpine = Alpine
Alpine.plugin(persist)

 
Alpine.data('logging', App);
Alpine.start()

import './style.css'
import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import App from './app'
console.log('App running main.js line 5')

window.Alpine = Alpine
Alpine.plugin(persist)

 
Alpine.data('logging', App);
Alpine.start()

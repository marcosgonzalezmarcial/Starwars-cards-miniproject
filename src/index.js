import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
	<BrowserRouter>
		<App tab="home" />
	</BrowserRouter>
)

import React, { useState } from 'react'
import AppLayout from '@cloudscape-design/components/app-layout'
import Topbar from './components/Topbar'
import Nav from './components/Nav'
import SplashScreen from './SplashScreen'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'


import Home from './pages/Home'
import Events from './pages/Events'
import Members from './pages/Members'
import Projects from './pages/Projects'
import Contact from './pages/Contact'


function PageWrapper({ children, keyName }) {
return (
<motion.div key={keyName}
initial={{ opacity: 0, y: 8 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -8 }}
transition={{ duration: 0.25 }}
>
{children}
</motion.div>
)
}


export default function App() {
const [booted, setBooted] = useState(false)
const location = useLocation()


if (!booted) return <SplashScreen onFinish={() => setBooted(true)} />


return (
<>
<Topbar />
<AppLayout
navigation={<Nav />}
toolsHide
content={
<AnimatePresence mode="wait">
<Routes location={location} key={location.pathname}>
<Route path="/" element={<PageWrapper keyName="home"><Home /></PageWrapper>} />
<Route path="/events" element={<PageWrapper keyName="events"><Events /></PageWrapper>} />
<Route path="/members" element={<PageWrapper keyName="members"><Members /></PageWrapper>} />
<Route path="/projects" element={<PageWrapper keyName="projects"><Projects /></PageWrapper>} />
<Route path="/contact" element={<PageWrapper keyName="contact"><Contact /></PageWrapper>} />
</Routes>
</AnimatePresence>
}
/>
</>
)
}
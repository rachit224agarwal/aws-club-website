import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


export default function SplashScreen({ onFinish }) {
const [phase, setPhase] = useState('aws') // 'aws' -> 'club'


useEffect(() => {
const t1 = setTimeout(() => setPhase('club'), 1800)
const t2 = setTimeout(() => onFinish?.(), 3600)
return () => { clearTimeout(t1); clearTimeout(t2) }
}, [onFinish])


return (
<div style={{height:'100vh'}} className="w-full flex items-center justify-center bg-white">
<AnimatePresence mode="wait">
{phase === 'aws' ? (
<motion.img key="aws" src="/aws-logo.png" alt="AWS" className="h-28"
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.8 }}
transition={{ duration: 0.8 }} />
) : (
<motion.img key="club" src="/club-logo.png" alt="Cloud Club" className="h-28"
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.8 }}
transition={{ duration: 0.8 }} />
)}
</AnimatePresence>
</div>
)
}
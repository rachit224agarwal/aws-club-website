import React from 'react'
import SideNavigation from '@cloudscape-design/components/side-navigation'
import { useLocation, useNavigate } from 'react-router-dom'


export default function Nav() {
const location = useLocation()
const navigate = useNavigate()


return (
<SideNavigation
activeHref={location.pathname}
onFollow={e => { e.preventDefault(); navigate(e.detail.href) }}
header={{ href: '/', text: 'Menu' }}
items={[
{ type:'link', text:'Home', href:'/' },
{ type:'link', text:'Events', href:'/events' },
{ type:'link', text:'Our Team', href:'/members' },
{ type:'link', text:'Projects', href:'/projects' },
{ type:'link', text:'Contact', href:'/contact' }
]}
/>
)
}
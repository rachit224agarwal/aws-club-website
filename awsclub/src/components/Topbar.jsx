import React from 'react'
import TopNavigation from '@cloudscape-design/components/top-navigation'


export default function Topbar() {
return (
<>
<TopNavigation
identity={{
href: '/',
title: 'AWS Cloud Club',
logo: { src: '/club-logo.png', alt: 'Cloud Club' }
}}
i18nStrings={{
searchDismissIconAriaLabel: 'Close search',
searchIconAriaLabel: 'Open search',
overflowMenuTriggerText: 'More',
overflowMenuTitleText: 'All',
overflowMenuBackIconAriaLabel: 'Back'
}}
utilities={[]}
/>
{/* subtle brand bar in AWS orange */}
<div style={{ height: 3, background:'#FF9900' }} />
</>
)
}
import React from 'react'
import Cards from '@cloudscape-design/components/cards'
import Header from '@cloudscape-design/components/header'
import Link from '@cloudscape-design/components/link'
import { members } from '../data/members'


export default function Members(){
return (
<Cards
header={<Header variant="h1">Our Team</Header>}
cardDefinition={{
header: item => item.name,
sections: [
{ id:'role', header:'Role', content: item => item.role },
{ id:'links', header:'Links', content: item => (<>
<Link href={item.linkedin}>LinkedIn</Link>{' | '}<Link href={item.github}>GitHub</Link>
</>) }
]
}}
cardsPerRow={[1,2,3]}
items={members}
empty={<b>No members added.</b>}
/>
)
}
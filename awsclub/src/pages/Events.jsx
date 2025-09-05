import React from 'react'
import Table from '@cloudscape-design/components/table'
import Button from '@cloudscape-design/components/button'
import Header from '@cloudscape-design/components/header'
import { events } from '../data/events'


export default function Events(){
return (
<Table
header={<Header variant="h1">Events & Results</Header>}
columnDefinitions={[
{ id:'name', header:'Event', cell: item => item.name },
{ id:'date', header:'Date', cell: item => item.date },
{ id:'status', header:'Status', cell: item => item.status },
{ id:'action', header:'', cell: item => <Button href={item.link} variant="primary">Details</Button> }
]}
items={events}
loadingText="Loading events..."
empty={<b>No events yet.</b>}
stickyHeader
/>
)
}
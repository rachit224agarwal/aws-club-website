import React from 'react'
import Container from '@cloudscape-design/components/container'
import Header from '@cloudscape-design/components/header'
import Button from '@cloudscape-design/components/button'
import Box from '@cloudscape-design/components/box'
import Grid from '@cloudscape-design/components/grid'


export default function Home(){
return (
<Container>
<Header variant="h1" description="Learn. Build. Connect. Grow with AWS.">AWS Cloud Club — Your College</Header>
<Box margin={{ top:'l' }} textAlign="center">
<Button variant="primary">Join Us</Button>
<Button variant="link">Explore Events</Button>
</Box>
<Grid gridDefinition={[{ colspan:4 },{ colspan:4 },{ colspan:4 }]} margin={{ top:'l' }}>
<Container header={<Header variant="h2">Announcements</Header>}>
Kickoff meetup next week. Stay tuned!
</Container>
<Container header={<Header variant="h2">Highlights</Header>}>
Deployed on S3 + CloudFront, built with Cloudscape.
</Container>
<Container header={<Header variant="h2">Get Involved</Header>}>
Join the core team, volunteer at events, submit talks.
</Container>
</Grid>
</Container>
)
}
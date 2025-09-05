import React, { useState } from 'react'
import Form from '@cloudscape-design/components/form'
import FormField from '@cloudscape-design/components/form-field'
import Input from '@cloudscape-design/components/input'
import Textarea from '@cloudscape-design/components/textarea'
import Button from '@cloudscape-design/components/button'
import Header from '@cloudscape-design/components/header'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onSubmit = e => {
    e.preventDefault()
    // TODO: hook to AWS (API Gateway + Lambda) or SES
    alert(`Thanks, ${form.name}! We'll reach out at ${form.email}.`)
  }

  return (
    <Form
      header={<Header variant="h1">Contact Us</Header>}
      actions={<Button variant="primary" onClick={onSubmit}>Submit</Button>}
    >
      <FormField label="Name">
        <Input
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.detail.value }))}
          placeholder="Your name"
        />
      </FormField>
      <FormField label="Email">
        <Input
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.detail.value }))}
          placeholder="you@example.com"
        />
      </FormField>
      <FormField label="Message">
        <Textarea
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.detail.value }))}
          placeholder="How can we help?"
        />
      </FormField>
    </Form>
  )
}

export default Contact

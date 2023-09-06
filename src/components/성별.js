import { Form, Button } from "react-bootstrap";

import React from 'react'

export default function 성별() {
  return (
    
<Form>
{['checkbox', 'radio'].map((type) => (
        <div key={`inline-radio`} className="mb-3">
          <Form.Check
            inline
            label="남성"
            name="usersex"
            type="radio"
            id={`inline-radio-1`}
          />
          <Form.Check
            inline
            label="여성"
            name="usersex"
            type="radio"
            id={`inline-radio-2`}
          />

        </div>
      ))}
</Form>
  )
}

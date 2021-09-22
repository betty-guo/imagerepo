import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'

import UploadImages from "./components/image-upload.component"

test('Show the uploaded file name after the user uploads a file', () => {
  const result = render(<UploadImages />)
  const uploadButton = result.container.querySelector('#file-uploader')

  const file = new File(['(⌐□_□)'], 'chucknorris.png', {
    type: 'image/png',
  })

  userEvent.upload(uploadButton, file)
  const list = screen.getByRole("list")
})

import React, { useState } from 'react'
import { Upload, Button, message, Spin } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { PUT_PHOTOS_API, post } from './utils'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export const Uploader = () => {
  const [spinning, setSpinning] = useState(false)

  const props = {
    // multiple: true, 后续支持
    beforeUpload: file => {
      setSpinning(true)

      if (!file.type.startsWith('image/')) {
        message.error(`${file.name} is not a png file`)
      }

      const limitSize = file.size / 1024 / 1024 < 20

      if (!limitSize) {
        message.error('Image must smaller than 20MB!')
      }

      return file.type.startsWith('image/') && limitSize
    },
    onChange: info => {
      const file = info.file.originFileObj

      if (['done', 'error'].includes(info.file.status)) {
        if (file.size) {
          const form = new FormData()
          form.append('file', file)
          form.append('name', `${Date.now()}-${file.name}`)

          post(PUT_PHOTOS_API, form, { form: true })
            .then(() => {
              message.success('Upload success!')
              setTimeout(() => location.reload(), 300) // 临时
            })
            .catch(message.error)
            .finally(() => setSpinning(false))

          // {
          //   base64,
          //   name: `${Date.now()}-${file.name}`,
          // }

          // getBase64(file, base64 => {

          // })
        }
      }
    },
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px',
      }}
    >
      {spinning && <Spin />}
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Upload photos</Button>
      </Upload>
    </div>
  )
}

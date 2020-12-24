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

      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isLt5M) {
        message.error('Image must smaller than 5MB!')
      }

      return file.type.startsWith('image/') && isLt5M
    },
    onChange: info => {
      const file = info.file.originFileObj

      if (['done', 'error'].includes(info.file.status)) {
        if (file.size) {
          getBase64(file, base64 => {
            post(PUT_PHOTOS_API, {
              base64,
              name: `${Date.now()}-${file.name}`,
            })
              .then(() => {
                message.success('Upload success!')
                setTimeout(() => location.reload(), 1000) // 临时
              })
              .catch(message.error)
              .finally(() => setSpinning(false))
          })
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

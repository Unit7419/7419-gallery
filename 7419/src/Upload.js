import React, { useState } from 'react'
import { Upload, Button, message, Spin } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { uploadPhotoAPI, getUserInfo } from './utils'


export const Uploader = () => {
  const [spinning, setSpinning] = useState(false)


  const props = {
    multiple: true,
    customRequest: ({ file }) => {
      if (file.size) {
        const form = new FormData()
        const user = getUserInfo()

        form.append('file', file)
        form.append('name', `${Date.now()}-${file.name}`)
        form.append('username', user.name)
        form.append('password', user.password)

        return uploadPhotoAPI(form)
          .then(() => {
            message.success('Upload success!')
            setTimeout(() => location.reload(), 300) // 临时
          })
          .catch(e => {
            message.warn(`Upload failed! ${e}`)
          })
          .finally(() => {
            setSpinning(false)
          })
      }

      message.error('Invalid image file.')
    },
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

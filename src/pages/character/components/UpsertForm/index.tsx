import { Button, Form, Input, Radio, Select, message } from 'antd'
import { useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { createCharacter } from '@/api/character'
import Magic from '@/assets/svg/magic.svg'
import { AvatarUpload } from '@/components/AvatarUpload'
import { useCharacterStore } from '@/stores/character'

import { extras } from './Extra'

const { Item: FormItem, useForm } = Form
const { Option } = Select
const { Group: RadioGroup } = Radio
const { TextArea } = Input

export function UpsertForm() {
  const navigate = useNavigate()
  const { mode } = useCharacterStore()

  const [form] = useForm()
  const [avatar, setAvatar] = useState('')
  const [expand, setExpand] = useState(false)

  async function submit() {
    try {
      const data = await form.validateFields()

      if (!avatar) {
        message.error('Please upload avatar')
        throw new Error()
      }

      data.avatar = avatar
      data.tags = JSON.stringify(data.tags)
      data.likes_count = 0
      data.talks_count = 0
      data.prompt = ''

      await createCharacter(data)
      message.success('Success')
      navigate('/')
    } catch (error) {
      document
        .querySelector('.ant-form-item-has-error')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <>
      <Form form={form} layout="vertical">
        <FormItem
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input name' }]}
          extra={extras.userName}
        >
          <Input size="large" />
        </FormItem>

        <FormItem label="Avatar" required extra={extras.avatar}>
          <AvatarUpload avatar={avatar} setAvatar={setAvatar} />
        </FormItem>

        <FormItem
          label="Visibility"
          name="visibility"
          rules={[{ required: true, message: 'Please select visibility' }]}
          extra={extras.visibility}
        >
          <Select size="large">
            <Option value="public">Public</Option>
            <Option value="private">Private</Option>
          </Select>
        </FormItem>

        <FormItem
          label="Introduction"
          name="introduction"
          rules={[{ required: true, message: 'Please input introduction' }]}
          extra={extras.introduction}
        >
          <Input size="large" />
        </FormItem>

        <FormItem
          label="Rating"
          name="rating"
          rules={[{ required: true, message: 'Please select rating' }]}
        >
          <RadioGroup
            optionType="button"
            options={[
              { label: 'Limited', value: 'limited' },
              { label: 'NSFW', value: 'nsfw' },
            ]}
          />
        </FormItem>

        <FormItem
          label="Tags"
          name="tags"
          rules={[{ required: true, message: 'Please select tags' }]}
          extra={extras.tags}
        >
          <Select size="large" mode="tags" />
        </FormItem>

        <div
          onClick={() => setExpand(!expand)}
          className="font-500 my-4 flex items-center text-pink-500 hover:cursor-pointer"
        >
          <span className="mr-1">Advanced setting</span>
          {expand ? <HiChevronDown className="h-4 w-4" /> : <HiChevronUp className="h-4 w-4" />}
        </div>

        {!expand && (
          <>
            <FormItem label="Greeting" name="greeting" extra={extras.greeting}>
              <Input size="large" />
            </FormItem>

            <FormItem label="Personality" name="personality" extra={extras.personality}>
              <Input size="large" />
            </FormItem>

            <FormItem label="Chat background" name="chat_background" extra={extras.chatBackground}>
              <Input size="large" />
            </FormItem>

            <FormItem label="Example dialogs" name="example_dialogs" extra={extras.exampleDialogs}>
              <TextArea autoSize />
            </FormItem>
          </>
        )}

        <Button type="primary" size="large" className="flex-center" block onClick={submit}>
          <img src={Magic} className="h-5 w-5" />
          <p className="font-500 ml-2">{mode}</p>
        </Button>
      </Form>
    </>
  )
}

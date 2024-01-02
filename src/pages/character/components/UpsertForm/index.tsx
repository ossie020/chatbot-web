import { Button, Form, Input, Radio, Select, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createCharacter } from '@/api/character'
import { createChatKey } from '@/api/chat'
import Magic from '@/assets/svg/magic.svg'
import { AvatarUpload } from '@/components/AvatarUpload'
import { CardImport } from '@/components/CardImport'
import { useAppStore } from '@/stores/app'
import { useCharacterStore } from '@/stores/character'

import { extras } from './Extra'

const { Item: FormItem, useForm } = Form
const { Option } = Select
const { Group: RadioGroup } = Radio
const { TextArea } = Input

export function UpsertForm() {
  const navigate = useNavigate()
  const { allTagList } = useAppStore()
  const { mode } = useCharacterStore()

  const [form] = useForm()
  const [avatar, setAvatar] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    form.setFieldsValue({ visibility: 'public' })
  }, [])

  async function submit() {
    setLoading(true)

    try {
      const data = await form.validateFields()

      if (!avatar) {
        message.error('Please upload avatar')
        throw new Error()
      }

      if (data.tags.length > 7) {
        message.error('Maximum 7 tags only')
        throw new Error()
      }

      data.avatar = avatar
      data.tags = JSON.stringify(data.tags)
      data.likes_count = 0
      data.talks_count = 0
      data.prompt = ''

      const { character_id } = await createCharacter(data)
      const { chat_key } = await createChatKey(character_id)
      message.success('Success')
      navigate(`/character/${character_id}/chat/${chat_key}`)
    } catch (error) {
      document
        .querySelector('.ant-form-item-has-error')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Form form={form} layout="vertical">
        <FormItem label="Quick Start" extra={extras.quickStart}>
          <CardImport setAvatar={setAvatar} />
        </FormItem>

        <FormItem
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please input name' },
            { max: 20, message: 'Name should be at most 20 characters' },
          ]}
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
          <Select size="large" defaultValue="public">
            <Option value="public">Public - Anyone can chat</Option>
            <Option value="private">Private - Only you can chat</Option>
          </Select>
        </FormItem>

        <FormItem
          label="Introduction"
          name="introduction"
          rules={[
            { required: true, message: 'Please input introduction' },
            {
              max: 4000,
              message: 'Introduction should be at most 4000 characters',
            },
          ]}
          extra={extras.introduction}
        >
          <TextArea
            rows={3}
            placeholder="e.g. I am very adept at emotional disputes.
"
          />
        </FormItem>

        <FormItem
          label="Rating"
          name="rating"
          rules={[{ required: true, message: 'Please select rating' }]}
        >
          <RadioGroup
            optionType="button"
            options={[
              { label: '👪 SFW', value: 'limited' },
              { label: '🔞 NSFW', value: 'nsfw' },
            ]}
          />
        </FormItem>

        <FormItem
          label="Tags"
          name="tags"
          rules={[{ required: true, message: 'Please select tags' }]}
          extra={extras.tags}
        >
          <Select
            size="large"
            mode="multiple"
            options={allTagList.map(({ name, emoji, description }) => ({
              label: `${emoji} ${name}`,
              value: name,
              description,
            }))}
            optionLabelProp="label"
            optionRender={(option) =>
              `${option.data.label} (${option.data.description})`
            }
          />
        </FormItem>

        <FormItem
          label="Greeting"
          name="greeting"
          rules={[
            { required: true, message: 'Please input greeting' },
            {
              max: 5000,
              message: 'Greeting should be at most 5000 characters',
            },
          ]}
          extra={extras.greeting}
        >
          <TextArea
            rows={3}
            placeholder="e.g. Hello,  is there anything you want to ask me?"
          />
        </FormItem>

        <FormItem
          label="Personality"
          name="personality"
          rules={[
            { required: true, message: 'Please input personality' },
            {
              max: 15000,
              message: 'Personality should be at most 15000 characters',
            },
          ]}
          extra={extras.personality}
        >
          <TextArea
            rows={5}
            placeholder="You can write about the character's experiences, personality, behavior habits, preferences, etc. here."
          />
        </FormItem>

        <FormItem
          label="Scenario"
          name="scenario"
          rules={[
            {
              max: 7000,
              message: 'Scenario should be at most 7000 characters',
            },
          ]}
          extra={extras.scenario}
        >
          <TextArea
            rows={5}
            placeholder="You can fill in the background, scenario, and scene settings of the dialogue."
          />
        </FormItem>

        <FormItem
          label="Example dialogs"
          name="example_dialogs"
          rules={[
            {
              max: 15000,
              message: 'Example dialogs should be at most 7000 characters',
            },
          ]}
          extra={extras.exampleDialogs}
        >
          <TextArea
            rows={5}
            placeholder={`- “${String.fromCharCode(
              10,
            )}{{char}}: Hey, I'm Mark${String.fromCharCode(
              10,
            )}{{user}}: hello Mark${String.fromCharCode(
              10,
            )}{{char}}: nice to meet you :)${String.fromCharCode(10)}”`}
          />
        </FormItem>

        <Button
          type="primary"
          size="large"
          className="flex-center"
          block
          loading={loading}
          onClick={submit}
        >
          <img src={Magic} className="h-5 w-5" />
          <p className="font-500 ml-2">{mode}</p>
        </Button>
      </Form>
    </>
  )
}

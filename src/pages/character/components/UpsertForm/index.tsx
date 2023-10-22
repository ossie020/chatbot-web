import { Button, Form, Input, Radio, Select, Upload } from 'antd'

import { extras } from './Extra'
import { useCharacterStore } from '@/stores/character'
import Magic from '@/assets/svg/magic.svg'

const { Item: FormItem } = Form
const { Option } = Select
const { Group: RadioGroup, Button: RadioButton } = Radio
const { TextArea } = Input

export function UpsertForm() {
  const { mode } = useCharacterStore()

  return (
    <Form layout="vertical">
      <FormItem
        label="User name"
        required
        extra={extras.userName}
      >
        <Input size="large" />
      </FormItem>

      <FormItem
        label="Avatar"
        required
        extra={extras.avatar}
      >
        <Upload listType="picture-card" />
      </FormItem>

      <FormItem
        label="Visibility"
        required
        extra={extras.visibility}
      >
        <Select size="large">
          <Option>Visible</Option>
          <Option>Invisible</Option>
        </Select>
      </FormItem>

      <FormItem
        label="Introduction"
        required
        extra={extras.introduction}
      >
        <Input size="large" />
      </FormItem>

      <FormItem label="Rating" required>
        <RadioGroup>
          <RadioButton>Limited</RadioButton>
          <RadioButton>NSFW</RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem
        label="Tags"
        required
        extra={extras.tags}
      >
        <Select size="large" mode="tags">
          <Option>Visible</Option>
          <Option>Invisible</Option>
        </Select>
      </FormItem>

      <FormItem
        label="Greeting"
        extra={extras.greeting}
      >
        <Input size="large" />
      </FormItem>

      <FormItem
        label="Personality"
        extra={extras.personality}
      >
        <Input size="large" />
      </FormItem>

      <FormItem
        label="Chat background"
        extra={extras.chatBackground}
      >
        <Input size="large" />
      </FormItem>

      <FormItem
        label="Example dialogs"
        extra={extras.exampleDialogs}
      >
        <TextArea autoSize />
      </FormItem>

      <Button type="primary" size="large" className="flex-center" block>
        <img src={Magic} className="h-5 w-5" />
        <p className="ml-2 font-500">{mode}</p>
      </Button>
    </Form>
  )
}

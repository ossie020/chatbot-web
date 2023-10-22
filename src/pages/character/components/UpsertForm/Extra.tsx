const exampleDialogs = (
  <>
    <p>Example chat between you and the character. This section is very important for teaching your character how they should speak.</p>
    <p>Best practise example:</p>
    <p>#&#123;&#123;char&#125;&#125;: Hey, I'm Mark</p>
    <p>#&#123;&#123;user&#125;&#125;: hello Mark</p>
    <p>#&#123;&#123;char&#125;&#125;: nice to meet you :&#41;</p>
  </>
)

export const extras = {
  userName: `Name your character, and you can change it later if needed.`,
  avatar: `Upload your character's avatar.`,
  visibility: `Who is authorized to talk to them?`,
  introduction: `Short Introduction about your character.`,
  tags: `Tag your character and Separate your Tags with “ , ” (maximum 7 tags only).`,
  greeting: `Write a greeting for your robot. E.g., a Newton bot might say: 'Hi, I'm Isaac Newton, born 1643, known for the laws of motion and gravitation.'`,
  personality: `Describe the character's persona here.`,
  chatBackground: `Background description when chatting with this character.`,
  exampleDialogs,
}

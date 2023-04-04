## 使用openai简单生成图片

npm地址：https://www.npmjs.com/package/openai
参考：https://medium.com/codingthesmartway-com-blog/create-an-ai-powered-react-image-generator-app-using-openai-79b575d6b808

页面使用react + vite + tailwind CSS 搭建

核心代码：
```
import { Configuration, OpenAIApi } from 'openai'

const openai = new OpenAIApi(new Configuration({
		apiKey: import.meta.env.OPENAI_API_KEY
}))
const response = await openai.createImage({
  prompt, // 提示文本
  n: 1, // 生成图片的数量
  size: '512x512' // 生成图片的大小
})
```
- 其中，apiKey是openai的密钥，需要自行在官网openai.com/创建账户，生成密钥
- 然后在.env中配置OPENAI_API_KEY = apikey


## 使用
```
pnpm i 

pnpm dev
```
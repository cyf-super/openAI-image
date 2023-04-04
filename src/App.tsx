import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import './App.css'
import search from './assets/search.svg'

function App() {
	const [prompt, setPrompt] = useState('')
	const [result, setResult] = useState('')
	const [loading, setLoading] = useState(false)

	const configuration = new Configuration({
		apiKey: import.meta.env.VITE_OPENAI_API_KEY
	})

	const openai = new OpenAIApi(configuration)

	// 定义生成图片的异步函数
	const generateImage = async () => {
    if (!prompt) return
    setLoading(true)
		// 发送请求并等待响应结果，结果中包含了生成的图片的 URL
		const response = (await openai.createImage({
			prompt, // 提示文本
			n: 1, // 生成图片的数量
			size: '512x512' // 生成图片的大小
		})) as any 
		setLoading(false)
		setResult(response.data.data[0].url)
	}

	return (
		<div className="w-96">
			<h1 className="text-4xl pb-10">OpenAI</h1>
			{loading ? <h2> 正在生成图像，请稍候！</h2> : null}

			<div className="flex align-middle justify-center flex-col">
				<div className="w-100 h-10 flex border rounded-xl mb-10 shadow-md">
					<input
						value={prompt}
						type="text"
						placeholder="Please enter"
						className="focus:outline-none flex-grow rounded-xl text-center px-3"
						onChange={(e) => setPrompt(e.target.value)}
						onKeyDown={(event) => event.keyCode === 13 && generateImage()}
					/>
					<button
						type="submit"
						className="w-10 h-10 hover:border-transparent focus:outline-none"
						onClick={generateImage}>
						<img src={search} alt="" className="w-3/4 h-3/4" />
					</button>
				</div>
				<div className="w-full h-96">
					{result.length > 0 ? <img className="w-full rounded-xl" src={result} alt="Generated Image" /> : null}
				</div>
			</div>
		</div>
	)
}

export default App

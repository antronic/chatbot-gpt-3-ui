import { useEffect, useState } from 'react'
import OpenAiLogo from './assets/OpenAI_Logo.svg'
import axios from 'axios'

import Navbar from './components/Navbar'
import { speak } from './azure-speech'

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('ถามมาได้เลยจ่ะ')
  const [answer, setAnswer] = useState('')
  const [isSearch, setIsSearch] = useState(false)

  useEffect(() => {
    if (output !== '') {
      speak(output)
    }
  }, [output])

  function handleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(event.target.value)
  }

  async function onSearchClick() {
    if (input.length === 0) {
      return
    }

    playSound()
    setIsSearch(true)

    const apiHost = localStorage.getItem('apiHost') || 'http://127.0.0.1:1234'
    const result = await axios.get(`${apiHost}/message`, {
      params: {
        q: input
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    })
    .catch((err) => { console.log(err) })

    setOutput(result?.data?.answer)
    setIsSearch(false)
  }

  // play sound when search button is clicked
  function playSound() {
    const audio = new Audio('./sounds/batman-transition.mp3')
    audio.volume = 1
    audio.play()
  }

  function onSpeakClick() {
    speak(output)
  }

  return (
    <div className="">
      <Navbar/>
      {
        isSearch && (
          <div className="fixed flex items-center justify-center flex-col bg-black/95 w-full h-full z-50 backdrop-blur-lg">
            <div className="zoom">
              <div className="animate-pulse">
                <img src="./images/cat-from-dalle.png" className="spin h-64 inline-block" alt="" />
              </div>
            </div>
            <p className="text-white text-2xl mt-2 text-center">โอเคค่าาา ดิฉันได้รับเรื่องแล้วนะคะ<br/>เดี๋ยวอีกสักครู่จะแจ้งให้...คุณทราบค่ะ<br/>ขอบคุณค่ะ</p>
          </div>
        )
      }

      <div className="flex flex-col justify-center items-center h-screen mx-auto w-4/5">

        {/* Start: Cat box */}
        <div className="my-2">
          <img src="./images/cat-from-dalle.png" className="h-32 inline-block move-in relative cursor-pointer scale-110 hover:scale-125 transition-all" alt="" onClick={onSpeakClick}/>
          <div className="inline-flex items-center ml-4 px-4 py-2 rounded-md bg-slate-50 text-slate-900">
            <p className="text-2xl inline-block">
            {output}

            </p>

            {/* <button className="ml-2 px-2 py-2 border hover:border-slate-400 hover:bg-slate-400 active:bg-slate-600 rounded-md" onClick={onSpeakClick}>😺</button> */}
          </div>
        </div>
        {/* End: CatBox */}

        {/* Start: Ask Box */}
        <div className="w-full">
          <textarea rows={3} className="rounded-md w-full text-slate-900 text-2xl px-2 py-2 relative z-10" onChange={(e) => handleInput(e)}></textarea>
          {/* search button */}
          <div className="text-center">
            <button
              className={`
                ${input.length > 0 ? 'bg-fuchsia-800 hover:shadow-lg hover:shadow-black/50 shadow-md shadow-black/25 hover:scale-105 active:shadow-sm active:scale-95' : 'bg-slate-400 text-slate-300'}
              text-slate-50 text-2xl rounded-md px-4 py-2 mt-2 transition-all
              `}
              onClick={onSearchClick}
            >
                Ask
            </button>
          {/* <button className="bg-fuchsia-800 text-slate-50 rounded-md px-4 py-2 mt-2" onClick={onSpeakClick}>speak</button> */}
          </div>
        </div>
        {/* End: Ask box */}

        <div className="mt-12">
          <div className="inline-flex justify-center items-center">
            <p className="inline-block text-sm">Powered by</p>
            <a href="https://azure.microsoft.com/en-us/products/cognitive-services/openai-service">
              <img src={OpenAiLogo} className="h-6 ml-4 inline-block fill-white" alt="" />
            </a>
            <a href="https://language.cognitive.azure.com/" className="ml-2 font-semibold text-slate-100 inline-block hover:underline">
              <img src="./images/MS-Azure_logo_horiz_white_rgb.png" className="h-12 ml-0 inline-block" alt="" />
            </a>
          </div>

          <div className="mt-2 text-center text-sm text-slate-400">
            <p className="">
              Code with ☕️ by <a target="_blank" href="https://www.github.com/antronic" className="hover:underline font-semibold">Jirachai C.</a>
            </p>
            <p className="text-xs">
              Built from <a href="https://vitejs.dev/" className="hover:underline">Vite</a> + <a href="https://reactjs.org/" className="hover:underline">React</a> + <a href="https://www.typescriptlang.org/" className="hover:underline">TS</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

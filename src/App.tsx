import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
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
    playSound()
    setIsSearch(true)
    // query string q
    // Access-Control-Allow-Origin
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
    // setTimeout(() => {
    // }, 3000)
  }

  // play sound when search button is clicked
  function playSound() {
    const audio = new Audio('./sounds/batman-transition.mp3')
    audio.volume = 1
    audio.play()
  }

  // Typing animation
  // function typing(message: string) {
  //   let i = 0
  //   const speed = 50
  //   const text = message
  //   const output = document.getElementById('output')
  //   function typeWriter() {
  //     if (i < text.length) {
  //       output.innerHTML += text.charAt(i)
  //       i++
  //       setTimeout(typeWriter, speed)
  //     }
  //   }
  //   typeWriter()
  // }

  function onSpeakClick() {
    speak(output)
  }

  return (
    <div className="">
      <nav className="px-4 py-2 bg-fuchsia-800/25">
        <img src="./images/logo-from-dalle.png" className="h-12 inline-block" alt="" />
        <h1 className="text-2xl font-bold inline-block ml-4">Arrr ... my ... GPT-3</h1>
      </nav>

      {
        isSearch && (
          <div className="fixed flex items-center justify-center flex-col bg-black w-full h-full">
            <div className="zoom">
              <img src="./images/cat-from-dalle.png" className="spin h-64 inline-block" alt="" />
            </div>
            <p className="text-white text-2xl mt-2 text-center">ดิฉันได้รับเรื่องแล้วค่ะ<br/>กำลังประสานงานให้สักครู่นะคะ</p>
          </div>
        )
      }

      <div className="flex flex-col justify-center items-center h-screen mx-auto w-4/5">

        <div className="my-2">
          <img src="./images/cat-from-dalle.png" className="h-32 inline-block" alt="" />
          <div className="inline-block ml-4 px-4 py-2 rounded-md bg-slate-50 text-slate-900">
            <p className="text-xl inline-block">
            {output}

            </p>

            <button className="ml-2 px-4 rounded-sm" onClick={onSpeakClick}>🗣️</button>
          </div>
        </div>

        <div className="w-full">
          <textarea rows={3} className="rounded-md w-full text-slate-900 text-xl px-2 py-2" onChange={(e) => handleInput(e)}></textarea>
          {/* search button */}
          <button className="bg-fuchsia-800 text-slate-50 rounded-md px-4 py-2 mt-2" onClick={onSearchClick}>Ask</button>
          {/* <button className="bg-fuchsia-800 text-slate-50 rounded-md px-4 py-2 mt-2" onClick={onSpeakClick}>speak</button> */}
        </div>
      </div>
    </div>
  )
}

export default App

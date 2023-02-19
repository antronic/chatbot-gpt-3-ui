import { useEffect, useState } from 'react'
import { speak } from '../azure-speech'

enum ErrId {
  'apiHost'
}

type Warning = {
  message: string,
  errId: ErrId
  action?: () => void
}

export default () => {
  const [warnings, setWarnings] = useState<Warning[]>([])
  const [showNotificationList, setShowNotificationList] = useState(false)

  useEffect(() => {
    prerequisiteCheck()
  }, [])

  function prerequisiteCheck() {
    const _warnings: Warning[] = []

    if (localStorage.getItem('apiHost') === null) {
      _warnings.push({
          message: 'API host is not set (click to fix)',
          errId: ErrId.apiHost,
          action: () => {
            const apiHost = window.prompt('Enter your api host')
            if (apiHost) {
              localStorage.setItem('apiHost', apiHost)
            }
          }
        }
      )
    }

    setWarnings([..._warnings])
  }

    function promptMe() {
    const prompt = window.prompt('Enter your prompt')

    switch (prompt) {
      case 'apiHost':
        const apiHost = window.prompt('Enter your api host')
        localStorage.setItem('apiHost', apiHost || 'http://127.0.0.1:1234')
        break
      case 'speak':
        const text = window.prompt('Enter your text')
        speak(text || '')
        break
      default:
        window.alert('No command found')
        break
    }
  }

  return (
    <nav className="px-4 py-2 bg-fuchsia-800/25">
        <div className="grid grid-cols-2">
          <div className="col-auto">
            <img src="./images/logo-from-dalle.png" className="h-12 inline-block" alt="" onClick={promptMe} />
            <h1 className="text-2xl font-bold inline-block ml-4">Arrr ...ummm... my ... GPT-3</h1>
          </div>
          <div className="col-auto flex items-center justify-end">
            {
              warnings.length > 0 && (
                <div className="hover:bg-black/25 active:bg-black/50 cursor-pointer px-1 rounded-md" onClick={() => setShowNotificationList(!showNotificationList)}>
                  <p className="text-yellow-500 text-3xl">⚠️</p>
                </div>
              )
            }

            {
              showNotificationList && (
                <div className="absolute top-14 right-4 w-64 bg-white rounded-md shadow-md">
                  <ul className="flex flex-col">
                    {
                      warnings.map((warning, index) => (
                        <li
                          key={index}
                          className={`bg-slate-500/25 text-slate-500 px-4 py-2 border-b border-slate-900 ${warning.action ? 'hover:bg-slate-500/50 active:bg-slate-500/75 cursor-pointer' : ''}}`}
                          onClick={() => warning.action && warning.action()}
                        >
                          <p className={`${warning.action ? 'cursor-pointer' : ''}`}>
                            {warning.message}
                          </p>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              )
            }
          </div>
        </div>
      </nav>
  )
}
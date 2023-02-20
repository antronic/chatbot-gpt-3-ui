import { SpeechConfig, SpeechSynthesizer, AudioConfig, SpeakerAudioDestination } from 'microsoft-cognitiveservices-speech-sdk'

const audio = new Audio()
export async function speak(message: string) {
  // speak out to speaker
  const speechConfig = SpeechConfig.fromSubscription(
    import.meta.env.VITE_AZ_SPEECH_KEY,
    'southeastasia',
  )
  speechConfig.speechSynthesisLanguage = 'th-TH'
  // speechConfig.speechSynthesisVoiceName = 'th-TH-AcharaNeural'

  const player = new SpeakerAudioDestination()
  // const audioConfig = AudioConfig.fromDefaultSpeakerOutput(player)
  const audioConfig = AudioConfig.fromSpeakerOutput(player)

  const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig)
  synthesizer.speakTextAsync(
    message,
    onSpeechSynthesized
  )

  player.resume()

}

function onSpeechSynthesized(result: any) {
  audio.src = URL.createObjectURL(result.audioData)
  audio.volume = 1.0
  audio.play()
}

function stopSpeak() {
  audio.pause()
  audio.currentTime = 0
}

// export function useVoice () {
//   return {
//     speak,
//     stopSpeak,
//   }
// }
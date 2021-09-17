import ReactMarkdown from "react-markdown"
import Head from '../components/head'
import AppWindow from '../components/AppWindow'

const AboutContent = `
# Welcome to a DOPE DAO Joint

Apes together strong.
`

export default function About() {
  return (
    <>
      <Head title={'About'} />
      <AppWindow>
        <ReactMarkdown>
          {AboutContent}
        </ReactMarkdown>
      </AppWindow> 
    </>
  )
}

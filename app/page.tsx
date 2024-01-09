"use client"

import { useState } from "react"

export default function Home() {

  const [prompt, setPrompt] = useState("");

  const [chatHistory, setChatHistory] = useState([
    { id: 1, message: 'Hello', sender: 'me', time: '12:00' },
  ])

  const RequestGemini = async (prompt:any) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ userPrompt: prompt }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    const data = await response.json()
  
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { id: prevChatHistory.length + 1, message: data.text, sender: 'model', time: '12:00' }
    ]);
  }

  const onHandleClick = async () => {

    console.log("clicked")
    console.log(chatHistory.length)
    setChatHistory([...chatHistory, { id: chatHistory.length + 1, message: prompt, sender: '', time: '12:00' }])
    await RequestGemini(prompt)
    setPrompt("")
  }



  return (
    <main>
      <div className="chat-history flex flex-col p-10">
        {chatHistory.length > 0 && chatHistory.map((chat) => (
          <div key={chat.id} className={`chat-message ${chat.sender}`}>
            <div className="chat-message-content">
              <div className="chat-message-text" style={chat.id % 2 == 0 ? { float: 'left', backgroundColor: 'red', padding: '5px' } : { float: 'right', backgroundColor: 'green', padding: '5px' }}>{chat.message}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center items-center">
        <input type="text" placeholder="Enter the prompt" value={prompt} className="p-5" onChange={(e) => setPrompt(e.target.value)} />
        <button onClick={onHandleClick}>click me</button>
      </div>
    </main>
  )
}

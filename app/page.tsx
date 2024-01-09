"use client"

import { useState, useEffect } from "react"
import styles from "@/styles/root.module.css"
import Image from "next/image"
import Markdown from "react-markdown";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {

  const [prompt, setPrompt] = useState("");

  const getDate = () => {
    const date = new Date()
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }

  const [chatHistory, setChatHistory] = useState([
    { id: 1, message: 'Hello', sender: 'model', time: getDate() },
  ])

  const onPromptChange = (e: any) => {
    localStorage.setItem('prompt', e.target.value)
    setPrompt(e.target.value)
  }

  const RequestGemini = async (prompt: any) => {
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
      { id: prevChatHistory.length + 1, message: data.text, sender: 'model', time: getDate() }
    ]);

    setChatHistory((prevChatHistory) => {
      const updatedChatHistory = [...prevChatHistory];
      localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));
      return updatedChatHistory;
    });

  }

  // handle click
  const onHandleClick = async () => {
    if (prompt == "") {
      toast.error("Please enter the prompt")
      return
    }

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { id: prevChatHistory.length + 1, message: prompt, sender: 'user', time: getDate() }
    ]);

    await RequestGemini(prompt)
    setPrompt("")
  }

  // show welcome message
  useEffect(() => {
    const visited = localStorage.getItem('visited')
    if (!visited) {
      toast.success("Welcome to Gemini")
      setTimeout(() => {
        toast.success("Get started by entering the prompt")
      }, 2500)
      localStorage.setItem('visited', "true")
    }
  })

  useEffect(() => {
    const chatHistory = localStorage.getItem('chatHistory')
    if (chatHistory) {
      setChatHistory(() => JSON.parse(chatHistory))
      console.log(chatHistory)
    }
  }, [])

  return (
    <main className={styles.container}>
      <Toaster />
      <div className="flex gap-2 items-center font-bold">
        <Image src="/chatbot.png" alt="logo" width={50} height={50} />
        <h1>Gemini</h1>
      </div>
      <div className={`flex flex-col mt-2 ${styles.chatHistory}`}>
        {chatHistory.length > 0 && chatHistory.map((chat) => (
          <div key={chat.id} className="mb-5">
            <Markdown className={`p-5 rounded-md ${chat.sender == "user" ? styles.user : styles.model}`}>{chat.message}</Markdown>
          </div>
        ))}
      </div>
      <div className={`flex justify-center items-center gap-5 ${styles.inputContainer}`}>
        <input type="text" placeholder="Enter the prompt" value={prompt} className="p-2" onChange={onPromptChange} />
        <button onClick={onHandleClick}>click me</button>
      </div>
    </main>
  )
}

export default function Home() {

  const chatHistory = [
    {
      id: 1,
      message: 'Hi',
      sender: 'me',
      time: '12:00',
    },
    {
      id: 2,
      message: 'Hello',
      sender: 'other',
      time: '12:01',
    },
    {
      id: 3,
      message: 'How are you?',
      sender: 'me',
      time: '12:02',
    },
    {
      id: 4,
      message: 'I am fine',
      sender: 'other',
      time: '12:03',
    },
    {
      id: 5,
      message: 'How about you?',
      sender: 'other',
      time: '12:04',
    },
    {
      id: 6,
      message: 'I am fine too',
      sender: 'me',
      time: '12:05',
    },
    {
      id: 7,
      message: 'Good to hear that',
      sender: 'other',
      time: '12:06',
    },
    {
      id: 8,
      message: 'Bye',
      sender: 'me',
      time: '12:07',
    },
    {
      id: 9,
      message: 'Bye',
      sender: 'other',
      time: '12:08',
    },
  ]

  return (
    <main>
      <div className="chat-history">
        {chatHistory.map((chat) => (
          <div key={chat.id} className={`chat-message ${chat.sender}`}>
            <div className="chat-message-content">
              <div className="chat-message-text" style={{textAlign:'left'}}>{chat.message}</div>
              <div className="chat-message-time" style={{textAlign:'right'}}>{chat.time}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

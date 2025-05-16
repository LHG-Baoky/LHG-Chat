const chat = document.getElementById('chat');
const input = document.getElementById('question');

async function sendQuestion() {
  const question = input.value.trim();
  if (!question) return;

  appendMessage(question, 'user');
  input.value = '';
  
  appendMessage('Đang suy nghĩ...', 'bot');

  // Gọi OpenAI API
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }]
      })
    });
    
    const data = await response.json();
    chat.lastChild.textContent = data.choices[0].message.content;
  } catch (error) {
    chat.lastChild.textContent = 'Có lỗi xảy ra, vui lòng thử lại.';
    console.error(error);
  }

  chat.scrollTop = chat.scrollHeight;
}

function appendMessage(text, sender) {
  const div = document.createElement('div');
  div.className = 'msg ' + sender;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

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

// LHGChat - Giao diện hiện đại giống ChatGPT

const chatContainer = document.querySelector(".chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Tạo tin nhắn trong giao diện
function appendMessage(sender, text, isBot = false) {
  const messageWrapper = document.createElement("div");
  messageWrapper.classList.add("message", isBot ? "bot" : "user");

  const messageBubble = document.createElement("div");
  messageBubble.classList.add("bubble");
  messageBubble.textContent = text;

  messageWrapper.appendChild(messageBubble);
  chatContainer.appendChild(messageWrapper);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Mô phỏng bot trả lời
function fakeBotReply(userText) {
  const loadingMsg = appendLoading();
  setTimeout(() => {
    loadingMsg.remove();
    const response = generateFakeResponse(userText);
    appendMessage("bot", response, true);
  }, 1000);
}

// Hiệu ứng đang trả lời
function appendLoading() {
  const loadingWrapper = document.createElement("div");
  loadingWrapper.classList.add("message", "bot");

  const loadingBubble = document.createElement("div");
  loadingBubble.classList.add("bubble");
  loadingBubble.innerHTML = "<span class='dot'></span><span class='dot'></span><span class='dot'></span>";

  loadingWrapper.appendChild(loadingBubble);
  chatContainer.appendChild(loadingWrapper);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return loadingWrapper;
}

// Giả lập phản hồi bot
function generateFakeResponse(input) {
  return `🤖 Mình là LHGChat! Bạn vừa nói: "${input}"`;
}

// Xử lý gửi tin
function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;

  appendMessage("user", text, false);
  userInput.value = "";
  fakeBotReply(text);
}

// Gửi bằng nút hoặc Enter
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
const apiKey = "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"; // Thay YOUR_OPENAI_API_KEY bằng API key thật của bạn

async function botReply(userText) {
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };

  const body = {
    model: "gpt-4o-mini",  // hoặc "gpt-4o", "gpt-3.5-turbo" tuỳ theo tài khoản bạn có
    messages: [
      { role: "system", content: "Bạn là trợ lý thông minh, trả lời chính xác, lịch sự và rõ ràng." },
      { role: "user", content: userText }
    ],
    temperature: 0.7,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else {
      return "Mình chưa hiểu câu hỏi của bạn, bạn vui lòng hỏi lại nhé!";
    }
  } catch (error) {
    console.error("Error from OpenAI:", error);
    return "Xin lỗi, có lỗi xảy ra khi mình trả lời. Vui lòng thử lại sau.";
  }
}
const form = document.querySelector("#chat-form");
const input = document.querySelector("#chat-input");
const chatBox = document.querySelector("#chat-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userText = input.value.trim();
  if (!userText) return;

  addMessageToChat("Bạn", userText);
  input.value = "";

  const botAnswer = await botReply(userText);
  addMessageToChat("ChatGPT", botAnswer);
});

function addMessageToChat(sender, text) {
  const messageElem = document.createElement("div");
  messageElem.classList.add("message");
  if (sender === "ChatGPT") {
    messageElem.classList.add("bot-message");
  } else {
    messageElem.classList.add("user-message");
  }
  messageElem.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(messageElem);
  chatBox.scrollTop = chatBox.scrollHeight;
}

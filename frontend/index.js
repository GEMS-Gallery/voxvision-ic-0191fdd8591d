import { backend } from 'declarations/backend';
import { AuthClient } from "@dfinity/auth-client";

let authClient;
let ttsEnabled = false;

async function init() {
  authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    handleAuthenticated();
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: handleAuthenticated,
    });
  }
}

async function handleAuthenticated() {
  loadConversationHistory();
  setupEventListeners();
  updateTTSButton();
}

async function loadConversationHistory() {
  const history = await backend.getConversationHistory();
  const chatContainer = document.getElementById('chat-container');
  chatContainer.innerHTML = '';
  history.forEach(message => {
    appendMessage(message.role, message.content);
  });
}

function setupEventListeners() {
  document.getElementById('send-btn').addEventListener('click', sendMessage);
  document.getElementById('voice-btn').addEventListener('click', toggleVoiceInput);
  document.getElementById('image-btn').addEventListener('click', handleImageUpload);
  document.getElementById('reset-btn').addEventListener('click', resetConversation);
  document.getElementById('save-btn').addEventListener('click', saveChat);
  document.getElementById('tts-btn').addEventListener('click', toggleTTS);
  document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
  });
}

async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (message) {
    appendMessage('user', message);
    input.value = '';
    await backend.addMessage('user', message);
    
    try {
      const response = await backend.chatWithClaude(message);
      appendMessage('assistant', response);
      await backend.addMessage('assistant', response);
    } catch (error) {
      console.error('Error chatting with Claude:', error);
      appendMessage('assistant', 'Sorry, I encountered an error while processing your request.');
    }
  }
}

function appendMessage(role, content) {
  const chatContainer = document.getElementById('chat-container');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;
  messageDiv.textContent = content;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function toggleVoiceInput() {
  // Implement voice input logic here
  console.log('Voice input toggled');
}

function handleImageUpload() {
  // Implement image upload logic here
  console.log('Image upload handled');
}

async function resetConversation() {
  await backend.resetConversation();
  document.getElementById('chat-container').innerHTML = '';
}

async function saveChat() {
  const markdown = await backend.saveChat();
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chat_log.md';
  a.click();
  URL.revokeObjectURL(url);
}

async function toggleTTS() {
  ttsEnabled = !ttsEnabled;
  await backend.setUseTTS(ttsEnabled);
  updateTTSButton();
}

async function updateTTSButton() {
  const ttsBtn = document.getElementById('tts-btn');
  ttsEnabled = await backend.getUseTTS();
  ttsBtn.textContent = `TTS: ${ttsEnabled ? 'On' : 'Off'}`;
}

init();

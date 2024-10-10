let currentUser = '';
let users = [];
let isBold = false;
let isItalic = false;

document.getElementById('joinChat').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    if (username) {
        currentUser = username;
        if (!users.includes(currentUser)) {
            users.push(currentUser);
        }
        updateUserList();
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
        const welcomeMessage = document.createElement('div');
        welcomeMessage.innerHTML = `<strong>${currentUser}</strong> se ha unido al chat.`;
        document.getElementById('messages').appendChild(welcomeMessage);

        // Enviar mensaje con Enter en el chat público
        document.getElementById('messageInput').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
    } else {
        alert('Por favor, ingresa tu nombre.');
    }
});

function updateUserList() {
    const usersDiv = document.getElementById('users');
    usersDiv.innerHTML = '<strong>Usuarios:</strong>';
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.textContent = user;
        userDiv.style.cursor = 'pointer';
        userDiv.onclick = function() {
            openPrivateChat(user);
        };
        usersDiv.appendChild(userDiv);
    });
}

function openPrivateChat(recipient) {
    const chatId = `privateChat_${recipient}`;
    let chatWindow = document.getElementById(chatId);

    if (!chatWindow) {
        chatWindow = document.createElement('div');
        chatWindow.id = chatId;
        chatWindow.className = 'private-chat';
        chatWindow.innerHTML = `<strong>Chat con ${recipient}</strong>
            <div class="private-messages" id="${chatId}_messages"></div>
            <input type="text" class="private-input" id="${chatId}_input" placeholder="Escribe un mensaje" />
            <button onclick="sendPrivateMessage('${recipient}')">Enviar</button>
            <div class="format-options">
                <button onclick="toggleBoldPrivate()">B</button>
                <button onclick="toggleItalicPrivate()">I</button>
                <button id="emojiButton" onclick="toggleEmojiPrivate('${recipient}')">😊</button>
            </div>
            <div class="emoji-container" id="${chatId}_emojiContainer" style="display:none;">
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '😊')">😊</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '😂')">😂</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '😢')">😢</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '❤️')">❤️</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '👍')">👍</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '🎉')">🎉</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '😎')">😎</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '😜')">😜</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '😡')">😡</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '🥳')">🥳</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '🤔')">🤔</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '😇')">😇</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '🤗')">🤗</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '🤩')">🤩</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '👀')">👀</span>
                <span class="emoji" onclick="insertEmojiPrivate('${recipient}', '🤖')">🤖</span>
            </div>`;

        document.getElementById('privateChatContainer').appendChild(chatWindow);

        // Enviar mensaje con Enter en el chat privado
        document.getElementById(`${chatId}_input`).addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                sendPrivateMessage(recipient);
            }
        });
    }

    chatWindow.style.display = 'block';
    document.getElementById(`${chatId}_input`).focus();
}
function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;
  if (message) {
      const formattedMessage = formatMessage(message);
      const messageElement = document.createElement('div');
      messageElement.innerHTML = `<strong>${currentUser}:</strong> ${formattedMessage}`;
      document.getElementById('messages').appendChild(messageElement);
      messageInput.value = '';
      messageInput.focus();
  }
}

function sendPrivateMessage(recipient) {
  const chatId = `privateChat_${recipient}`;
  const messageInput = document.getElementById(`${chatId}_input`);
  const message = messageInput.value;
  if (message) {
      const formattedMessage = formatMessage(message);
      const messageElement = document.createElement('div');
      messageElement.innerHTML = `${currentUser} (a ${recipient}): ${formattedMessage}`;
      document.getElementById(`${chatId}_messages`).appendChild(messageElement);
      messageInput.value = '';
      messageInput.focus();
  }
}

function formatMessage(message) {
  if (isBold) {
      message = `<strong>${message}</strong>`;
  }
  if (isItalic) {
      message = `<em>${message}</em>`;
  }
  return message;
}

function toggleBold() {
  isBold = !isBold;
  document.getElementById('boldButton').classList.toggle('active', isBold);
}

function toggleItalic() {
  isItalic = !isItalic;
  document.getElementById('italicButton').classList.toggle('active', isItalic);
}

function toggleEmoji() {
  const emojiContainer = document.getElementById('emojiContainer');
  emojiContainer.style.display = emojiContainer.style.display === 'none' ? 'block' : 'none';
}

function insertEmoji(emoji) {
  const messageInput = document.getElementById('messageInput');
  messageInput.value += emoji;
  messageInput.focus();
}

function toggleEmojiPrivate(recipient) {
  const chatId = `privateChat_${recipient}`;
  const emojiContainer = document.getElementById(`${chatId}_emojiContainer`);
  emojiContainer.style.display = emojiContainer.style.display === 'none' ? 'block' : 'none';
}

function insertEmojiPrivate(recipient, emoji) {
  const chatId = `privateChat_${recipient}`;
  const messageInput = document.getElementById(`${chatId}_input`);
  messageInput.value += emoji;
  messageInput.focus();
}

function changeFont() {
  const selectedFont = document.getElementById('fontSelector').value;
  document.getElementById('messages').style.fontFamily = selectedFont;
}

function toggleBoldPrivate() {
  isBold = !isBold;
  document.querySelector(`#privateChat_${currentUser} button:nth-of-type(1)`).classList.toggle('active', isBold);
}

function toggleItalicPrivate() {
  isItalic = !isItalic;
  document.querySelector(`#privateChat_${currentUser} button:nth-of-type(2)`).classList.toggle('active', isItalic);
}




//lo nuevo para crear el chat privado!

function openPrivateChat(recipientName) {
  const recipient = users.find(user => user.name === recipientName);
  if (!recipient) return;
  
  const chatId = [userId, recipient.id].sort().join('_'); // ID único para cada conversación entre dos usuarios
  const chatWindowId = `privateChat_${chatId}`;
  
  // Verificar si la ventana de chat ya existe
  let chatWindow = document.getElementById(chatWindowId);
  if (!chatWindow) {
      // Crear la ventana de chat si no existe
      chatWindow = document.createElement('div');
      chatWindow.id = chatWindowId;
      chatWindow.className = 'private-chat';
      chatWindow.innerHTML = `
          <strong>Chat con ${recipientName}</strong>
          <div class="private-messages" id="${chatWindowId}_messages"></div>
          <input type="text" class="private-input" id="${chatWindowId}_input" placeholder="Escribe un mensaje" />
          <button onclick="sendPrivateMessage('${chatId}', '${recipient.id}')">Enviar</button>
      `;
      document.getElementById('privateChatContainer').appendChild(chatWindow);

      // Escuchar mensajes de este chat privado en Firestore
      loadPrivateMessages(chatId, chatWindowId);

      // Enviar mensaje con Enter en el chat privado
      document.getElementById(`${chatWindowId}_input`).addEventListener('keypress', function(event) {
          if (event.key === 'Enter') {
              sendPrivateMessage(chatId, recipient.id);
          }
      });
  }
  chatWindow.style.display = 'block';
  document.getElementById(`${chatWindowId}_input`).focus();
}

function loadPrivateMessages(chatId, chatWindowId) {
  const privateMessagesRef = db.collection('privateChats').doc(chatId).collection('messages').orderBy('timestamp', 'asc');
  
  privateMessagesRef.onSnapshot((snapshot) => {
      const messagesContainer = document.getElementById(`${chatWindowId}_messages`);
      messagesContainer.innerHTML = ''; // Limpiar mensajes previos
      
      snapshot.forEach((doc) => {
          const messageData = doc.data();
          const messageElement = document.createElement('div');
          messageElement.textContent = `${messageData.sender === userId ? 'Yo' : messageData.sender}: ${messageData.text}`;
          messagesContainer.appendChild(messageElement);
      });
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
}

function sendPrivateMessage(chatId, recipientId) {
  const messageInput = document.getElementById(`privateChat_${chatId}_input`);
  const message = messageInput.value.trim();

  if (message) {
      const privateMessagesRef = db.collection('privateChats').doc(chatId).collection('messages');
      
      privateMessagesRef.add({
          text: message,
          sender: userId,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
          messageInput.value = '';
          messageInput.focus();
      }).catch((error) => {
          console.error("Error al enviar el mensaje: ", error);
      });
  }
}
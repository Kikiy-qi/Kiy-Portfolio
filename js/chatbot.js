var GROQ_API_KEY = "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";
var GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

var SYSTEM_PROMPT = `Kamu adalah asisten representasi portofolio Mohamad Rifki Aunur Rahman (Kiy).
Tugasmu adalah menjawab pertanyaan pengunjung seputar profil, karya fotografi/videografi/editing, tautan repositori, serta latar belakang Kiy secara profesional, santun, baku, ringkas, dan tepat sasaran.

PANDUAN KOMUNIKASI (PROFESIONAL & BAKU):
1. Gaya Bahasa: Gunakan bahasa Indonesia yang profesional, baku, santun, dan jelas. DILARANG menggunakan bahasa gaul atau singkatan informal.
2. Format: Singkat, padat, dan proporsional (1 hingga 2 kalimat). DILARANG menggunakan tanda bintang ganda (**) untuk format tebal atau format markdown lainnya.
3. Pertanyaan Link GitHub / Repositori: Jika pengunjung menanyakan link GitHub, source code, atau repositori portofolio ini, berikan link: https://github.com/Kikiy-qi/Kiy-Portfolio
4. Pertanyaan Umur: Jawab langsung bahwa Rifki berusia 19 tahun (lahir pada 10 September 2007).
5. Agama: Islam.
6. Game Favorit: Hitman 3, Assassin's Creed Valhalla, Forza Horizon series, Mobile Legends (MLBB), dan PUBG.
7. Keahlian: Fotografi (street photography), videografi, dan penyuntingan video (Adobe Premiere Pro, After Effects, DaVinci Resolve, CapCut, OBS Studio).
8. Kamera: Sony a6400 (lensa Sony E 35mm f/1.8 OSS) dan Fujifilm X-A3.
9. Personal Branding: "Kiy" merupakan nama panggung dan personal branding kreatif dari Mohamad Rifki Aunur Rahman.
10. Sapaan Singkat (seperti "halo", "p", "a"): Sambut dengan santun dan tanyakan hal yang ingin diketahui mengenai karya atau profil Kiy.
11. Batasan Topik: Tolak pertanyaan di luar konteks portofolio secara singkat, sopan, dan formal.

DATA RESMI:
- Nama Lengkap: Mohamad Rifki Aunur Rahman
- Nama Panggilan / Brand: Rifki / Kiy
- Link GitHub / Repositori: https://github.com/Kikiy-qi/Kiy-Portfolio
- Agama: Islam
- Usia: 19 tahun (10 September 2007)
- Domisili: Asal Cirebon, saat ini berdomisili di Bandung (Mahasiswa D4 Sistem Informasi Kota Cerdas, Telkom University).
- Fokus Keahlian: Fotografi (street photography), videografi, dan video editing multimedia.
- Kamera: Sony a6400 (lensa 35mm f/1.8) dan Fujifilm X-A3.
- Perangkat Lunak: Adobe Premiere Pro, After Effects, DaVinci Resolve, CapCut, OBS Studio.
- Game Favorit: Hitman 3, Assassin's Creed Valhalla, Forza Horizon series, Mobile Legends, PUBG.
- Perangkat Kerja: Laptop MSI GF63 Thin (RTX 3050), iPhone 13.`;

var chatMessages = [
  { role: "system", content: SYSTEM_PROMPT }
];

function cleanBotText(text) {
  if (!text) return "";
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#{1,6}\s*/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function initChatbot() {
  var chatToggle = document.getElementById("chat-toggle");
  var chatWindow = document.getElementById("chat-window");
  var chatClose = document.getElementById("chat-close");
  var chatForm = document.getElementById("chat-form");
  var chatInput = document.getElementById("chat-input");
  var chatBody = document.getElementById("chat-body");
  var typingIndicator = document.getElementById("typing-indicator");

  if (!chatToggle || !chatWindow) return;

  function toggleChat() {
    chatWindow.classList.toggle("is-open");
    if (chatWindow.classList.contains("is-open")) {
      chatInput.focus();
    }
  }

  chatToggle.addEventListener("click", toggleChat);
  chatClose.addEventListener("click", toggleChat);

  function appendMessage(text, sender) {
    var msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message", "chat-message--" + sender);
    msgDiv.textContent = sender === "bot" ? cleanBotText(text) : text;
    chatBody.insertBefore(msgDiv, typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function sendMessage(userText) {
    chatMessages.push({ role: "user", content: userText });

    // Keep context clean: preserve system prompt and last 8 messages
    if (chatMessages.length > 9) {
      chatMessages = [chatMessages[0]].concat(chatMessages.slice(-8));
    }

    var requestBody = {
      model: "qwen/qwen3.8-27b",
      messages: chatMessages,
      temperature: 0.2,
      max_tokens: 150
    };

    return fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + GROQ_API_KEY
      },
      body: JSON.stringify(requestBody)
    })
    .then(function(response) { return response.json(); })
    .then(function(data) {
      if (data.choices && data.choices.length > 0) {
        var botReply = cleanBotText(data.choices[0].message.content);
        chatMessages.push({ role: "assistant", content: botReply });
        return botReply;
      }
      return "Maaf, saat ini layanan sedang tidak dapat memberikan respon.";
    })
    .catch(function() {
      return "Koneksi terputus. Silakan coba kembali beberapa saat lagi.";
    });
  }

  chatForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    chatInput.value = "";

    chatInput.disabled = true;
    var sendBtn = document.querySelector(".chat-send");
    if (sendBtn) sendBtn.disabled = true;
    typingIndicator.classList.add("is-visible");
    chatBody.scrollTop = chatBody.scrollHeight;

    sendMessage(text).then(function(reply) {
      typingIndicator.classList.remove("is-visible");
      chatInput.disabled = false;
      if (sendBtn) sendBtn.disabled = false;
      appendMessage(reply, "bot");
      chatInput.focus();
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initChatbot);
} else {
  initChatbot();
}

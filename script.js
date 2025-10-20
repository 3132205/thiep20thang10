// Hàm phát nhạc và chuyển trang, được gọi khi người dùng click nút "Bắt đầu"
function startAndNavigate() {
  const music = document.getElementById('background-music');
  if (music) {
    // 1. Cố gắng phát nhạc (tương tác đã xảy ra nên trình duyệt cho phép)
    music.play().catch(error => {
      console.log('Phát nhạc bị lỗi, có thể bị chặn. Đảm bảo file nhac_nen.mp3 tồn tại:', error);
    });

    // 2. Lưu trạng thái nhạc đã được phát để trang thiệp tiếp tục
    sessionStorage.setItem('musicPlayed', 'true');
  }
  
  // 3. Chuyển trang
  window.location.href = 'thiep.html';
}

document.addEventListener('DOMContentLoaded', () => {
  
  const music = document.getElementById('background-music');

  // --- LOGIC PHÁT NHẠC KHI TRUY CẬP TRANG THIỆP ---
  if (music && sessionStorage.getItem('musicPlayed') === 'true' && document.body.classList.contains('main-card-page')) {
    music.play().catch(error => {
      console.log('Không thể tiếp tục phát nhạc ở trang thiệp:', error);
    });
  }

  // --- HIỆU ỨNG CHỮ CHẠY (TYPEWRITER) ---
  function typeWriter(elementId, text, speed, callback) {
    const element = document.getElementById(elementId);
    if (!element) {
      if (callback) callback();
      return;
    }
    
    element.innerHTML = ''; 
    let i = 0;
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        element.classList.remove('cursor-blink');
        if (callback) {
          setTimeout(callback, 500); 
        }
      }
    }
    
    element.classList.add('cursor-blink');
    type();
  }
  
  // --- LOGIC TRANG CHỦ (INDEX.HTML) - Chạy chữ tiêu đề trang chủ ---
  const mainTitleElement = document.getElementById('main-title-text');
  if (mainTitleElement) {
    const originalText = mainTitleElement.getAttribute('data-text');
    typeWriter('main-title-text', originalText, 50); 
  }
  
  // --- LOGIC TRANG THIỆP (THIEP.HTML) - CHUỖI GÕ CHỮ ---
  function startPopupTypingSequence() {
    const greetingEl = document.getElementById('popup-greeting-text');
    const messageEl = document.getElementById('popup-message-text');
    const vow1El = document.getElementById('vow-list-item-1');
    const vow2El = document.getElementById('vow-list-item-2');
    const vow3El = document.getElementById('vow-list-item-3');
    const signatureEl = document.getElementById('popup-signature-text');

    // HÀM: Hiện ảnh bó hoa
    const showFlowerImage = () => {
        const flowerImg = document.getElementById('hoa-chuc-mung');
        if (flowerImg) {
            flowerImg.classList.add('show');
        }
    };

    const step6_signature = () => {
        // Gọi showFlowerImage sau khi chữ ký gõ xong
        if (signatureEl) typeWriter(signatureEl.id, signatureEl.getAttribute('data-text'), 80, showFlowerImage); 
    };
    const step5_vow3 = () => {
        if (vow3El) typeWriter(vow3El.id, vow3El.getAttribute('data-text'), 60, step6_signature);
    };
    const step4_vow2 = () => {
        if (vow2El) typeWriter(vow2El.id, vow2El.getAttribute('data-text'), 60, step5_vow3);
    };
    const step3_vow1 = () => {
        if (vow1El) typeWriter(vow1El.id, vow1El.getAttribute('data-text'), 60, step4_vow2);
    };
    const step2_message = () => {
        if (messageEl) typeWriter(messageEl.id, messageEl.getAttribute('data-text'), 30, step3_vow1); 
    };
    const step1_greeting = () => {
        if (greetingEl) typeWriter(greetingEl.id, greetingEl.getAttribute('data-text'), 80, step2_message);
    };
    
    step1_greeting();
  }

  // --- HIỆU ỨNG EMOJI RƠI NỀN ---
  const effectContainer = document.getElementById('effect-container');
  const emojis = ['💌', '🌹', '🌸', '💖', '🎁'];
  function createEffectItem() {
    if (!effectContainer) return;
    const item = document.createElement('span');
    item.classList.add('effect-item');
    item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const size = Math.random() * 20 + 25;
    item.style.fontSize = `${size}px`;
    item.style.left = `${Math.random() * window.innerWidth}px`;
    item.style.setProperty('--end-x', `${Math.random() * 400 - 200}px`);
    item.style.animationDuration = `${Math.random() * 5 + 3}s`; 
    effectContainer.appendChild(item);
    item.addEventListener('animationend', () => item.remove());
  }
  if (effectContainer) setInterval(createEffectItem, 700);

  // --- HỘP QUÀ BẬT NẮP & GỌI HIỆU ỨNG ---
  const giftImg = document.getElementById('gift-img');
  const popupCard = document.getElementById('popup-card');
  const closeBtn = document.getElementById('close-popup-btn');

  if (giftImg) {
    giftImg.addEventListener('click', () => {
      
      // Mở hộp quà và chạy hiệu ứng
      giftImg.classList.add('gift-open');
      showPopupEmojis();
      setTimeout(() => popupCard.classList.add('show'), 1000);
      setTimeout(() => giftImg.classList.remove('gift-open'), 1200);
      
      // GỌI CHUỖI CHẠY CHỮ
      setTimeout(startPopupTypingSequence, 1700);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      popupCard.classList.remove('show');
    });
  }

  // --- EMOJI BẬT LÊN KHI MỞ QUÀ ---
  function showPopupEmojis() {
    const emojis = ['💖', '🌸', '🎁', '✨', '💐'];
    for (let i = 0; i < 8; i++) {
      const e = document.createElement('span');
      e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      e.classList.add('pop-emoji');
      e.style.left = `${Math.random() * 150 + 50}px`;
      e.style.bottom = '80px';
      e.style.animationDelay = `${i * 0.1}s`;
      const giftContainer = document.querySelector('.gift-container');
      if (giftContainer) {
          giftContainer.appendChild(e);
          setTimeout(() => e.remove(), 1500);
      }
    }
  }
});
/**
 * i9 Decorações - Festas & Eventos
 * Interactive Engine: LED Marquee Simulator, WhatsApp Generator, Lightbox & Filtering
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initLedSimulator();
  initPortfolioFilter();
  initLightbox();
  initBudgetCalculator();
  initSmoothScroll();
});

/* ==========================================================================
   1. Navbar & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Sticky header blur effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('open');
      }
    });
  }
}

/* ==========================================================================
   2. Interactive LED Marquee Simulator
   ========================================================================== */
function initLedSimulator() {
  const stage = document.getElementById('stageLettersContainer');
  const input = document.getElementById('ledTextInput');
  const presetChips = document.querySelectorAll('.preset-chip');
  const glowBtns = document.querySelectorAll('.glow-btn');
  const applyToFormBtn = document.getElementById('btnApplyLedToQuote');

  let currentGlowMode = 'glow-cold-white';

  if (!stage || !input) return;

  function renderLetters(text) {
    stage.innerHTML = '';
    const cleanText = text.trim().toUpperCase() || 'LOVE';

    // Limit to 10 characters for aesthetics on screen
    const chars = cleanText.slice(0, 10).split('');

    chars.forEach(char => {
      if (char === ' ') {
        const spacer = document.createElement('div');
        spacer.style.width = '20px';
        stage.appendChild(spacer);
        return;
      }

      const letterBox = document.createElement('div');
      letterBox.className = `marquee-char ${currentGlowMode}`;
      letterBox.innerText = char === '&' ? '&' : char;

      // Add 4 mini bulb light corners
      ['top-left', 'top-right', 'bot-left', 'bot-right'].forEach(pos => {
        const bulb = document.createElement('span');
        bulb.className = `bulb-dot ${pos}`;
        letterBox.appendChild(bulb);
      });

      stage.appendChild(letterBox);
    });
  }

  // Handle typing in input
  input.addEventListener('input', (e) => {
    renderLetters(e.target.value);
    // Unselect preset chips if custom typing
    presetChips.forEach(c => c.classList.remove('active'));
  });

  // Presets handling
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.getAttribute('data-value');
      input.value = val;
      renderLetters(val);
    });
  });

  // Glow color switcher
  glowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      glowBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGlowMode = btn.getAttribute('data-glow');
      renderLetters(input.value || 'LOVE');
    });
  });

  // Apply to WhatsApp quote form button
  if (applyToFormBtn) {
    applyToFormBtn.addEventListener('click', () => {
      const formInput = document.getElementById('quoteLedText');
      const ledCheckbox = document.getElementById('chkLed');
      if (formInput) {
        formInput.value = input.value.trim().toUpperCase() || 'LOVE';
      }
      if (ledCheckbox) {
        ledCheckbox.checked = true;
        const parent = ledCheckbox.closest('.checkbox-pill-label');
        if (parent) parent.classList.add('checked');
      }
      
      // Update quote preview
      updateWhatsAppPreview();

      // Scroll to budget section smoothly
      const budgetSection = document.getElementById('orcamento');
      if (budgetSection) {
        budgetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Initial render
  renderLetters(input.value || '#15');
}

/* ==========================================================================
   3. Portfolio Filter
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   4. Lightbox Fullscreen Viewer
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  if (!modal || !modalImg) return;

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const currentItem = galleryItems[currentIndex];
    const img = currentItem.querySelector('img');
    const title = currentItem.querySelector('.gallery-overlay-title');

    modalImg.src = img.src;
    modalCaption.textContent = title ? title.textContent : '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   5. WhatsApp Quote Generator & Budget Simulator
   ========================================================================== */
function initBudgetCalculator() {
  const nameInput = document.getElementById('quoteName');
  const typeSelect = document.getElementById('quoteEventType');
  const dateInput = document.getElementById('quoteDate');
  const cityInput = document.getElementById('quoteCity');
  const guestsInput = document.getElementById('quoteGuests');
  const ledTextInput = document.getElementById('quoteLedText');
  const notesInput = document.getElementById('quoteNotes');
  const checkboxes = document.querySelectorAll('.quote-service-chk');
  const waPreviewBubble = document.getElementById('waPreviewBubble');
  const sendWaBtn = document.getElementById('btnSendWhatsApp');

  // Contact WhatsApp of i9 Decorações
  const WHATSAPP_PHONE = '5543988080315';

  // Sync checkboxes styling
  checkboxes.forEach(chk => {
    chk.addEventListener('change', () => {
      const parent = chk.closest('.checkbox-pill-label');
      if (parent) {
        if (chk.checked) parent.classList.add('checked');
        else parent.classList.remove('checked');
      }
      updateWhatsAppPreview();
    });
  });

  // Watch inputs
  [nameInput, typeSelect, dateInput, cityInput, guestsInput, ledTextInput, notesInput].forEach(elem => {
    if (elem) {
      elem.addEventListener('input', updateWhatsAppPreview);
      elem.addEventListener('change', updateWhatsAppPreview);
    }
  });

  function updateWhatsAppPreview() {
    const name = nameInput ? nameInput.value.trim() : '';
    const eventType = typeSelect ? typeSelect.value : 'Casamento';
    const date = dateInput && dateInput.value ? formatDate(dateInput.value) : '[Data a definir]';
    const city = cityInput && cityInput.value.trim() ? cityInput.value.trim() : '[Cidade/Local]';
    const guests = guestsInput && guestsInput.value ? guestsInput.value : 'A definir';
    const ledText = ledTextInput && ledTextInput.value.trim() ? ledTextInput.value.trim().toUpperCase() : '';
    const notes = notesInput && notesInput.value.trim() ? notesInput.value.trim() : '';

    const selectedServices = [];
    checkboxes.forEach(chk => {
      if (chk.checked) {
        selectedServices.push(chk.value);
      }
    });

    let msg = `Olá, *i9 Decorações*! 🥂✨\n`;
    msg += `Gostaria de solicitar um orçamento para o meu evento:\n\n`;
    msg += `👤 *Nome:* ${name || '[Meu Nome]'}\n`;
    msg += `💍 *Tipo de Evento:* ${eventType}\n`;
    msg += `📅 *Data Prevista:* ${date}\n`;
    msg += `📍 *Local / Cidade:* ${city}\n`;
    msg += `👥 *Estimativa de Convidados:* ${guests}\n\n`;

    if (selectedServices.length > 0) {
      msg += `✨ *Serviços de Interesse:*\n`;
      selectedServices.forEach(s => {
        msg += `• ${s}\n`;
      });
      msg += `\n`;
    }

    if (ledText) {
      msg += `💡 *Letras de LED (1,20m - Luz Fria):* "${ledText}"\n\n`;
    }

    if (notes) {
      msg += `📝 *Observações:* ${notes}\n\n`;
    }

    msg += `Vocês têm disponibilidade para essa data? Aguardo o retorno para conversarmos! Muito obrigado(a).`;

    if (waPreviewBubble) {
      waPreviewBubble.textContent = msg;
    }

    return msg;
  }

  // Format date dd/mm/yyyy
  function formatDate(isoStr) {
    if (!isoStr) return '';
    const parts = isoStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return isoStr;
  }

  // Send to WhatsApp
  if (sendWaBtn) {
    sendWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const message = updateWhatsAppPreview();
      const encodedMsg = encodeURIComponent(message);
      
      // Open WhatsApp web or app
      const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodedMsg}`;
      window.open(url, '_blank');
    });
  }

  // Initial preview render
  window.updateWhatsAppPreview = updateWhatsAppPreview;
  updateWhatsAppPreview();
}

/* ==========================================================================
   6. Smooth Scrolling for Navigation
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

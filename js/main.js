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
   2. Interactive LED Marquee Simulator (Venue Preview & Draggable Letters)
   ========================================================================== */
function initLedSimulator() {
  const stage = document.getElementById('virtualStage');
  const lettersContainer = document.getElementById('stageLettersContainer');
  const input = document.getElementById('ledTextInput');
  const presetChips = document.querySelectorAll('.preset-chip');
  const applyToFormBtn = document.getElementById('btnApplyLedToQuote');
  const saveSimBtn = document.getElementById('btnSaveSimulation');
  const bgImg = document.getElementById('simVenueBg');
  const photoInput = document.getElementById('venuePhotoInput');
  const backdropBtns = document.querySelectorAll('.backdrop-btn');
  const scaleSlider = document.getElementById('simScaleSlider');
  const scaleLabel = document.getElementById('scaleValueDisplay');
  const dragHint = document.getElementById('stageDragHint');

  const currentGlowMode = 'glow-cold-white';
  let currentScale = 1;
  let posX = 0;
  let posY = 0;
  let isDragging = false;
  let startPointerX = 0;
  let startPointerY = 0;
  let startPosX = 0;
  let startPosY = 0;

  if (!stage || !lettersContainer || !input) return;

  const MARQUEE_IMAGE_MAP = {
    '#': 'hash.png',
    '&': 'amp.png',
    '❤️': 'heart.png',
    '❤': 'heart.png'
  };

  function getMarqueeAsset(char) {
    if (MARQUEE_IMAGE_MAP[char]) return MARQUEE_IMAGE_MAP[char];
    const norm = char.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    if (/^[A-Z0-9]$/.test(norm)) {
      return `${norm}.png`;
    }
    return null;
  }

  function renderLetters(text) {
    lettersContainer.innerHTML = '';
    const cleanText = text.trim().toUpperCase() || 'LOVE';
    const stripped = cleanText.replace(/\uFE0F/g, '');
    const chars = Array.from(stripped).slice(0, 12);

    chars.forEach(char => {
      if (char === ' ') {
        const spacer = document.createElement('div');
        spacer.className = 'marquee-spacer';
        lettersContainer.appendChild(spacer);
        return;
      }

      // Freestanding 3D Cut-out Marquee Channel Letter (1,20m)
      const letterChar = document.createElement('div');
      letterChar.className = `marquee-char ${currentGlowMode}`;

      const assetName = getMarqueeAsset(char);
      if (assetName) {
        const img = document.createElement('img');
        img.className = 'marquee-letter-img';
        img.src = `images/marquee-letters/${assetName}`;
        img.alt = char;
        img.loading = 'eager';
        img.draggable = false;
        letterChar.appendChild(img);
      } else {
        const glyph = document.createElement('span');
        glyph.className = 'marquee-glyph';
        glyph.innerText = char;
        letterChar.appendChild(glyph);
      }

      // Floor reflection under freestanding letter
      const floorGlow = document.createElement('span');
      floorGlow.className = 'marquee-floor-reflection';
      letterChar.appendChild(floorGlow);

      lettersContainer.appendChild(letterChar);
    });

    updateLettersPosition();
  }

  function updateLettersPosition() {
    lettersContainer.style.transform = `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px)) scale(${currentScale})`;
  }

  // --- Drag & Drop Engine (Pointer Events for Touch + Mouse) ---
  lettersContainer.addEventListener('pointerdown', (e) => {
    if (e.button && e.button !== 0) return;
    isDragging = true;
    try { lettersContainer.setPointerCapture(e.pointerId); } catch (_) {}
    lettersContainer.classList.add('is-dragging');
    
    startPointerX = e.clientX;
    startPointerY = e.clientY;
    startPosX = posX;
    startPosY = posY;

    if (dragHint) dragHint.style.opacity = '0';
  });

  lettersContainer.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPointerX;
    const deltaY = e.clientY - startPointerY;

    posX = startPosX + deltaX;
    posY = startPosY + deltaY;

    // Bounds checking inside virtual stage
    const stageRect = stage.getBoundingClientRect();
    const halfW = (stageRect.width * 0.46);
    const halfH = (stageRect.height * 0.44);

    posX = Math.max(-halfW, Math.min(halfW, posX));
    posY = Math.max(-halfH, Math.min(halfH, posY));

    updateLettersPosition();
  });

  const stopDrag = (e) => {
    if (isDragging) {
      isDragging = false;
      lettersContainer.classList.remove('is-dragging');
      try { lettersContainer.releasePointerCapture(e.pointerId); } catch (_) {}
    }
  };

  lettersContainer.addEventListener('pointerup', stopDrag);
  lettersContainer.addEventListener('pointercancel', stopDrag);

  // --- Scale / Proportion Slider ---
  if (scaleSlider) {
    scaleSlider.addEventListener('input', (e) => {
      currentScale = parseInt(e.target.value, 10) / 100;
      if (scaleLabel) {
        if (currentScale <= 0.75) scaleLabel.innerText = 'Ao Fundo (Menor)';
        else if (currentScale >= 1.25) scaleLabel.innerText = 'Primeiro Plano (Maior)';
        else scaleLabel.innerText = 'Padrão 1,20m';
      }
      updateLettersPosition();
    });
  }

  // --- Backdrop Presets Switcher ---
  backdropBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      backdropBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const bgUrl = btn.getAttribute('data-bg');
      if (bgUrl === 'stage-dark') {
        if (bgImg) bgImg.style.display = 'none';
        stage.style.background = 'radial-gradient(ellipse at 50% 95%, rgba(30, 41, 59, 0.95) 0%, #0B0E17 65%), #060911';
      } else {
        if (bgImg) {
          bgImg.style.display = 'block';
          bgImg.src = bgUrl;
        }
        stage.style.background = '#090C12';
      }
    });
  });

  // --- User Custom Photo Upload ---
  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        if (bgImg) {
          bgImg.style.display = 'block';
          bgImg.src = evt.target.result;
        }
        stage.style.background = '#090C12';
        backdropBtns.forEach(b => b.classList.remove('active'));

        // Reset letters to bottom center of uploaded photo
        posX = 0;
        posY = 0;
        updateLettersPosition();

        if (dragHint) {
          dragHint.innerHTML = '<span>✨ Foto Carregada! Arraste as letras pelo salão</span>';
          dragHint.style.opacity = '1';
          setTimeout(() => { if (dragHint) dragHint.style.opacity = '0'; }, 3500);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Handle typing in input
  input.addEventListener('input', (e) => {
    renderLetters(e.target.value);
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
      
      updateWhatsAppPreview();

      const budgetSection = document.getElementById('orcamento');
      if (budgetSection) {
        budgetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- Save / Download Simulation Image ---
  if (saveSimBtn) {
    saveSimBtn.addEventListener('click', () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const stageRect = stage.getBoundingClientRect();

        canvas.width = 1200;
        canvas.height = Math.round((stageRect.height / stageRect.width) * 1200);

        // Draw backdrop
        if (bgImg && bgImg.style.display !== 'none' && bgImg.naturalWidth > 0) {
          const imgRatio = bgImg.naturalWidth / bgImg.naturalHeight;
          const canvasRatio = canvas.width / canvas.height;
          let drawW = canvas.width;
          let drawH = canvas.height;
          let drawX = 0;
          let drawY = 0;

          if (imgRatio > canvasRatio) {
            drawW = canvas.height * imgRatio;
            drawX = (canvas.width - drawW) / 2;
          } else {
            drawH = canvas.width / imgRatio;
            drawY = (canvas.height - drawH) / 2;
          }

          ctx.drawImage(bgImg, drawX, drawY, drawW, drawH);

          // Dark vignette overlay
          const grad = ctx.createLinearGradient(0, canvas.height * 0.4, 0, canvas.height);
          grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.fillStyle = '#0B0E17';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Draw discreet watermark badge
        ctx.fillStyle = 'rgba(10, 11, 14, 0.8)';
        ctx.fillRect(25, 25, 260, 44);
        ctx.strokeStyle = '#D8AF4F';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(25, 25, 260, 44);

        ctx.font = 'bold 18px "Cinzel", Georgia, serif';
        ctx.fillStyle = '#F4E2BB';
        ctx.fillText('i9 DECORAÇÕES', 45, 54);

        // Calculate letters position and draw each 3D letter on canvas
        const scaleFactor = canvas.width / stageRect.width;
        const currentText = input.value.trim().toUpperCase() || 'LOVE';
        const letterNodes = lettersContainer.querySelectorAll('.marquee-char');

        if (letterNodes.length > 0) {
          letterNodes.forEach(node => {
            const img = node.querySelector('.marquee-letter-img');
            const rect = node.getBoundingClientRect();
            const nodeX = (rect.left - stageRect.left) * scaleFactor;
            const nodeY = (rect.top - stageRect.top) * scaleFactor;
            const nodeW = rect.width * scaleFactor;
            const nodeH = rect.height * scaleFactor;

            // Draw floor light reflection
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(nodeX + nodeW / 2, nodeY + nodeH - 4 * scaleFactor, nodeW * 0.42, 10 * scaleFactor, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(224, 242, 254, 0.4)';
            ctx.filter = 'blur(6px)';
            ctx.fill();
            ctx.restore();

            if (img && img.complete && img.naturalWidth > 0) {
              const imgRect = img.getBoundingClientRect();
              const imgX = (imgRect.left - stageRect.left) * scaleFactor;
              const imgY = (imgRect.top - stageRect.top) * scaleFactor;
              const imgW = imgRect.width * scaleFactor;
              const imgH = imgRect.height * scaleFactor;

              // Draw drop shadow & LED glow
              ctx.save();
              ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
              ctx.shadowBlur = 16 * scaleFactor;
              ctx.shadowOffsetY = 10 * scaleFactor;
              ctx.drawImage(img, imgX, imgY, imgW, imgH);
              ctx.restore();

              // Extra pass for crisp brilliance
              ctx.drawImage(img, imgX, imgY, imgW, imgH);
            } else {
              const glyph = node.querySelector('.marquee-glyph');
              if (glyph) {
                ctx.save();
                ctx.font = `900 ${Math.round(54 * currentScale * scaleFactor)}px "Montserrat", sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowColor = 'rgba(224, 242, 254, 0.9)';
                ctx.shadowBlur = 24 * scaleFactor;
                ctx.fillStyle = '#FFFFFF';
                ctx.fillText(glyph.innerText, nodeX + nodeW / 2, nodeY + nodeH / 2);
                ctx.restore();
              }
            }
          });
        }

        // Trigger download
        const link = document.createElement('a');
        link.download = `simulacao_letreiro_${currentText.replace(/[^A-Z0-9]/g, '_')}_i9decoracoes.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        console.warn('Canvas export note:', err);
        alert('Dica: Você também pode tirar um print da tela para enviar pelo WhatsApp!');
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

  // Mobile Gallery Toggle (Expand/Collapse to save vertical scroll)
  const btnToggleGalleryMobile = document.getElementById('btnToggleGalleryMobile');
  const galleryGrid = document.getElementById('galleryGrid');
  if (btnToggleGalleryMobile && galleryGrid) {
    btnToggleGalleryMobile.addEventListener('click', () => {
      const isExpanded = galleryGrid.classList.toggle('gallery-expanded');
      btnToggleGalleryMobile.innerHTML = isExpanded 
        ? '▴ Mostrar Menos Fotos' 
        : '📸 Ver Mais Fotos (+10) ▾';
      if (!isExpanded) {
        galleryGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
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


(function(){
  // Mobile menu with dynamic height, body scroll lock, and outside click close
  var burger = document.getElementById('burgerBtn');
  var panel = document.getElementById('mobilePanel');
  var header = document.getElementById('mainHeader') || document.querySelector('.nav');

  function updateNavHeight(){
    if(header){
      var h = header.offsetHeight;
      document.documentElement.style.setProperty('--nav-h', h + 'px');
    }
  }
  updateNavHeight();
  window.addEventListener('resize', function(){
    updateNavHeight();
    if(window.innerWidth > 920 && panel.classList.contains('open')){
      closePanel();
    }
  }, {passive:true});

  function closePanel(){
    panel.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
  }

  function openPanel(){
    updateNavHeight();
    panel.classList.add('open');
    burger.setAttribute('aria-expanded','true');
  }

  burger.addEventListener('click', function(e){
    e.stopPropagation();
    if(panel.classList.contains('open')){
      closePanel();
    } else {
      openPanel();
    }
  });

  // Close on nav links click & smooth scroll to target section without freezing
  panel.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(e){
      var href = a.getAttribute('href');
      closePanel();
      if(href && href.startsWith('#') && href.length > 1){
        var targetEl = document.querySelector(href);
        if(targetEl){
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && panel.classList.contains('open')){
      closePanel();
    }
  });

  // Close if clicking outside the menu panel and burger
  document.addEventListener('click', function(e){
    if(panel.classList.contains('open') && !panel.contains(e.target) && !burger.contains(e.target)){
      closePanel();
    }
  });

  // Lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, caption){
    lightboxImg.src = src;
    lightboxImg.alt = caption || '';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }
  document.querySelectorAll('[data-lightbox]').forEach(function(card){
    card.addEventListener('click', function(){
      openLightbox(card.getAttribute('data-full'), card.getAttribute('data-caption'));
    });
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){
    if(e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeLightbox();
  });

  // Reveal on scroll (single, restrained)
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  // Sticky nav shadow on scroll
  var nav = document.querySelector('.nav');
  window.addEventListener('scroll', function(){
    if(window.scrollY > 8){
      nav.style.boxShadow = '0 12px 30px -18px rgba(0,0,0,0.7)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }, {passive:true});
})();

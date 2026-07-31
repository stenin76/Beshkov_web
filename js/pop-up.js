 function showModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add('visible');
    modal.classList.remove('hidden');
    document.body.classList.add('modal-active');
    document.body.style.overflow = 'hidden';
  }

  function hideModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('visible');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
    document.body.classList.remove('modal-active');
    document.body.style.overflow = '';
  }

  // Event delegation for triggers
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('.modal-trigger');
    if (trigger) {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-target');
      showModal(targetId);
    }
  });

  // Close modal when clicking outside
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.modalOverlay.visible').forEach(modal => {
      const content = modal.querySelector('.modalContent');
      if (!content.contains(e.target) && !e.target.closest('.modal-trigger')) {
        hideModal(modal.id);
      }
    });
  });

  // Close modal with ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modalOverlay.visible').forEach(modal => {
        hideModal(modal.id);
      });
    }
  });

  document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('modalOverlay').style.display = 'none';
  });

  //Arrow move
  document.addEventListener('keydown', function (e) {
    const visibleModal = document.querySelector('.modalOverlay.visible');
    const modalContent = visibleModal?.querySelector('.modalContent');

    if (!visibleModal || !modalContent) return;

    // Close modal with ESC
    if (e.key === 'Escape') {
      hideModal(visibleModal.id);
      return;
    }

    // Scroll modal content with arrow keys
    const scrollAmount = 40;
    if (e.key === 'ArrowDown') {
      modalContent.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      modalContent.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
      e.preventDefault();
    }
  });


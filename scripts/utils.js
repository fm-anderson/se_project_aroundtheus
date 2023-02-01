function openPopup(popup) {
  popup.classList.add('modal_opened');
  popup.addEventListener('mousedown', closeByMouse);
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('modal_opened');
  popup.removeEventListener('mousedown', closeByMouse);
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(e) {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.modal_opened');
    closePopup(popup);
  }
}

function closeByMouse(e) {
  if (e.target.classList.contains('modal_opened')) {
    closePopup(e.target);
  }
}

export { openPopup, closePopup, closeByEscape, closeByMouse };

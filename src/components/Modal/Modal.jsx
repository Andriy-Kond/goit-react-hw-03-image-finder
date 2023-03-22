// Під час кліку на елемент галереї повинно відкриватися модальне вікно з темним оверлеєм і відображатися велика версія зображення.
// Модальне вікно повинно закриватися по натисканню клавіші ESC або по кліку на оверлеї.
// Приклад модалки:
// Плагін: https://basiclightbox.electerious.com/
// Демо: https://codepen.io/electerious/pen/rLBvGz

import { Component } from 'react';
import { createPortal } from 'react-dom';
import '../styles.css';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  state = {
    largeImageURL: '',
  };

  componentDidMount() {
    // Для закриття модалки по ESC
    window.addEventListener('keydown', this.presEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.presEsc);
  }

  // Закриття модалки по ESC
  presEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  // Закриття модалки по кліку на бекдропі
  backdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  getLargeImageURL = largeImageURL => {
    this.setState({ largeImageURL: largeImageURL });
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.backdropClick}>
        <div className="Modal">{this.props.children}</div>
        {/* <img src="http" alt="велике зображення" />  - переніс у this.props.children */}
      </div>,
      modalRoot
    );
  }
}

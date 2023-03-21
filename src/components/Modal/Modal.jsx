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
    // Закриття модалки по ESC
    window.addEventListener('keydown', this.presEsc);
  }

  getLargeImageURL = largeImageURL => {
    this.setState({ largeImageURL: largeImageURL });
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.presEsc);
  }

  presEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  backdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.backdropClick}>
        <div className="Modal">{this.props.children}</div>

        {/* <img src={this.props.largeImageURL} alt="велике зображення" /> */}
        {/* <img src="http" alt="велике зображення" />  - переніс у children */}
      </div>,
      modalRoot
    );
  }
}

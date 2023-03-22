// Компонент елемента списку із зображенням. Створює DOM-елемент наступної структури.

import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  // Відкриття/Закриття модалки.
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;

    return (
      <li className="ImageGalleryItem" onClick={() => this.toggleModal()}>
        <img
          className="ImageGalleryItem-image "
          src={webformatURL}
          alt={`small img of ${tags}`}
          width="300"
        />

        {/* Модалка (велике зображення) */}
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={`big img of ${tags}`} />
          </Modal>
        )}
      </li>
    );
  }
}

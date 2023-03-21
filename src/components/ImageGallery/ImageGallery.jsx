// Список карток зображень.Створює DOM - елемент наступної структури.
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import '../styles.css';

export class ImageGallery extends Component {
  state = {
    data: null,
  };

  // Монтування
  componentDidMount() {
    // console.log('imageGallery componentDidMount');
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('imageGallery componentDidUpdate');
    // // ^ обробка запиту:

    const URL_CONST = 'https://pixabay.com/api/';
    // Клас URLSearchParams:
    const searchParams = new URLSearchParams({
      key: '34581261-d39fcdfb48adfd850ac44b9c1',
      q: this.props.request,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: 1,
    });

    if (prevProps.request !== this.props.request) {
      this.props.toggleLoader(true); // показую спінер

      // Запит:
      fetch(`${URL_CONST}?${searchParams}`)
        .then(res => res.json())
        .then(({ totalHits, hits }) => {
          this.setState({ data: hits });
        })
        .finally(() => {
          this.props.toggleLoader(false); // прибираю спінер
        });
    }
  }

  render() {
    return (
      <>
        {/* Поки запита немає:  */}
        {!this.props.request && <div>Введіть запит</div>}

        {/* Якщо є масив об'єктів по запиту: */}
        {this.state.data && (
          <ul className="ImageGallery">
            {/* <li className="ImageGalleryItem">Набір LI-шек із зображеннями</li> */}

            {/* Якщо є масив об'єктів, то мапаю його: */}
            {this.state.data &&
              this.state.data.map(
                ({ id, webformatURL, largeImageURL }, index, array) => {
                  return (
                    <ImageGalleryItem
                      key={nanoid()}
                      id={id}
                      webformatURL={webformatURL}
                      largeImageURL={largeImageURL}
                      toggleModal={this.props.toggleModal}
                    />
                  );
                }
              )}

            {/* <ImageGalleryItem toggleModal={this.props.toggleModal} /> */}
          </ul>
        )}
      </>
    );
  }
}

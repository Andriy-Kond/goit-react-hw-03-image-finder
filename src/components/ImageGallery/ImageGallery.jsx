import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { toast } from 'react-toastify'; // повідомлення
import { Loader } from 'components/Loader/Loader'; // спінер
import { Button } from 'components/Button/Button'; // кнопка Load More
import PropTypes from 'prop-types';
import { getFetch } from 'components/services/getFetch';

export class ImageGallery extends Component {
  state = {
    data: [],
    error: null,
    status: '',
    page: 1,
    isShownBtn: false, // схована кнопка Load More
    isDisabledBtn: true, // деактивована кнопка Load More
    isLoading: false, // схований спінер
    perPage: 12,
  };

  componentDidUpdate(prevProps, prevState) {
    const { request } = this.props;
    const { page } = this.state;

    // Якщо запит змінився, то скидаю state і роблю запит:
    if (prevProps.request !== request) {
      this.setState({ data: [], page: 1, isShownBtn: false });
      this.getQuery(1);
    }

    // Якщо запит не змінився, а сторінка змінилась (була натиснута кнопка Load More), то роблю запит
    else {
      if (page !== prevState.page && page !== 1) {
        this.getQuery(page);
      }
    }
  }

  // * Функція запиту
  getQuery = currentPage => {
    const { perPage } = this.state;
    const { request } = this.props;

    this.setState({
      // isDisabledBtn: true, //  деактивую кнопку Load More, щоби не було випадкового кліку
      isShownBtn: false, //  ховаю кнопку Load More
      isLoading: true, // показую спінер
    });

    getFetch(request, currentPage, perPage)
      // Отримую дані від серверу (масив об'єктів)
      .then(({ totalHits, hits }) => {
        // Якщо нічого не знайдено, то виходжу
        if (totalHits === 0) {
          return toast.info(`Відсутні зображення за запитом "${request}"`);
        }

        // показую повідомлення про кількість зображень лише при першому запиті
        if (currentPage === 1)
          toast.success(
            `Знайдено ${totalHits} результат(ів) по запиту "${request}"`
          );

        // Оновлюю стейт
        this.setState(prevState => {
          return {
            data: [...prevState.data, ...hits], // старі дані + нові
            isShownBtn: true, // показую кнопку Load More
            isDisabledBtn: false, // активую кнопку Load More
            // status: 'resolved', // вже зайве
          };
        });

        // Ховаю / Деактивую кнопку Load More, якщо кількість нових об'єктів менше ніж per_page (тобто вони закінчились на сервері)
        if (hits.length < perPage) {
          // this.setState({ isShownBtn: false }); // якщо треба ховати
          this.setState({ isDisabledBtn: true }); // якщо треба деактивувати
          toast.info(
            `Це все. Більше по запиту "${request}" зображень в нас нема`
          );
        }
      })
      // Записую у state або створену помилку (якщо !res.ok), або будь-яку іншу:
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => {
        // ховаю спінер
        this.setState({ isLoading: false });
      });
  };

  // * Функція кнопки LoadMore
  loadMoreBtnClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { status, error, data, isShownBtn, isLoading, isDisabledBtn } =
      this.state;

    //  Якщо є помилка (не 404 від сервера, а будь-яка інша):
    if (status === 'rejected') {
      return <h1>{`Помилка: ${error.message}`}</h1>;
    }

    // if (status === 'resolved') {
    // прибрав 'resolved' щоби loader показувався внизу під вже завантаженими картками зображень.
    return (
      <>
        {data.length !== 0 && ( // щоби не показувати ul коли немає даних
          <ul className="ImageGallery">
            {data.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                />
              );
            })}
          </ul>
        )}
        {isLoading && <Loader />}
        {isShownBtn && (
          <Button
            loadMoreBtn={this.loadMoreBtnClick}
            isDisabledBtn={isDisabledBtn}
          />
        )}
      </>
    );
    // }
  }
}

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
};

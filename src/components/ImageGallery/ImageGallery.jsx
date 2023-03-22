import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { nanoid } from 'nanoid'; // генерація ID
import { toast } from 'react-toastify'; // повідомлення
import { Loader } from 'components/Loader/Loader'; // спінер
import { Button } from 'components/Button/Button'; // кнопка Load More

export class ImageGallery extends Component {
  state = {
    data: [],
    error: null,
    status: '',
    page: 1,
    isShownBtn: false, // показ кнопки Load More
    isDisabledBtn: false, // деактивація кнопки Load More
    isLoading: false, // показ спінеру
  };

  // * Функція запиту
  getFetch = () => {
    const { page } = this.state;
    const { request } = this.props;
    const URL_CONST = 'https://pixabay.com/api/';
    // Клас URLSearchParams:
    const searchParams = new URLSearchParams({
      key: '34581261-d39fcdfb48adfd850ac44b9c1',
      q: request, // запит
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12, // сторінок за один запит
      page: page, // сторінка у state (змінюється кнопкою Load More, або скидається новим запитом)
    });

    this.setState({ isLoading: true, isDisabledBtn: true }); // показую спінер і деактивую кнопку Load More
    fetch(`${URL_CONST}?${searchParams}`)
      .then(res => {
        // Якщо API відповіло з помилкою 4XX, то відловлюємо її тут
        if (res.ok) {
          return res.json();
        }
        // Якщо відповідь від сервера - 4XX, то роблю новий об'єкт помилки з необхідним повідомленням:
        return Promise.reject(
          new Error(`Якась помилка на сервері, спробуйте пізніше`)
        );
      })

      // Отримую дані від серверу (масив об'єктів)
      .then(({ totalHits, hits }) => {
        // Якщо нічого не знайдено, то виходжу
        if (hits.length === 0)
          toast.info(`Відсутні зображення за запитом "${request}"`);

        // показую повідомлення про кількість зображень лише при першому запиті
        if (page === 1)
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

        // Ховаю або Деактивую кнопку Load More, якщо кількість нових об'єктів менше ніж per_page (тобто вони закінчились на сервері)
        if (hits.length < searchParams.get('per_page')) {
          // this.setState({ isShownBtn: false }); // якщо треба ховати
          this.setState({ isDisabledBtn: true });
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

  componentDidUpdate(prevProps, prevState) {
    const { request } = this.props;
    const { page } = this.state;

    // Якщо запит змінився, то скидаю state і роблю запит:
    if (prevProps.request !== request) {
      this.setState({ data: [], page: 1, isShownBtn: false });
      this.getFetch();
    }

    // Якщо запит не змінився, а сторінка змінилась (була натиснута кнопка Load More), то роблю запит
    else {
      if (page !== prevState.page) {
        this.getFetch();
      }
    }
  }

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
        <ul className="ImageGallery">
          {data.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <ImageGalleryItem
                key={nanoid()}
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            );
          })}
        </ul>

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

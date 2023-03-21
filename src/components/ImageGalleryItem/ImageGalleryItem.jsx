// Компонент елемента списку із зображенням. Створює DOM-елемент наступної структури.
import '../styles.css';

export const ImageGalleryItem = ({
  toggleModal,
  webformatURL,
  largeImageURL,
}) => {
  return (
    <li className="ImageGalleryItem" onClick={() => toggleModal(largeImageURL)}>
      <img
        className="ImageGalleryItem-image "
        src={webformatURL}
        alt="small img"
        width="300"
      />
    </li>
  );
};

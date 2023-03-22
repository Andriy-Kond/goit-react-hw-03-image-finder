// Компонент елемента списку із зображенням. Створює DOM-елемент наступної структури.
import '../styles.css';

export const ImageGalleryItem = ({
  toggleModal,
  webformatURL,
  largeImageURL,
  tags,
}) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => toggleModal(largeImageURL, tags)}
    >
      <img
        className="ImageGalleryItem-image "
        src={webformatURL}
        alt={`small img of ${tags}`}
        width="300"
      />
    </li>
  );
};

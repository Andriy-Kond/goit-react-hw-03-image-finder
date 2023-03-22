export const Button = ({ loadMoreBtn, isDisabledBtn }) => {
  return (
    <button className="Button" onClick={loadMoreBtn} disabled={isDisabledBtn}>
      Load More
    </button>
  );
};

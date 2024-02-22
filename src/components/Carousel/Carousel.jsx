import { useEffect, useState, Children, cloneElement } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import styles from './Carousel.module.css';

const PAGE_WIDTH = 10;
const PADING_LEFT = 1.2;

const Carousel = ({ children }) => {
  const [pages, setPages] = useState([]);
  const [offset, setOffset] = useState(0);

  const handleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + PAGE_WIDTH + PADING_LEFT;
      return Math.min(newOffset, 0);
    });
  };
  const handleRightArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - PAGE_WIDTH - PADING_LEFT;
      const maxOffset = -((PAGE_WIDTH + PADING_LEFT) * (pages.length - 1));
      return Math.max(newOffset, maxOffset);
    });
  };

  useEffect(() => {
    setPages(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            minWidth: `${PAGE_WIDTH}rem`,
            maxWidth: `${PAGE_WIDTH}rem`,
            height: '100%',
          },
        });
      })
    );
    if (children.length !== pages.length) {
      setOffset(0);
    }
  }, [children, pages.length]);

  return (
    <div className={styles.mainContainer}>
      <FaChevronLeft className={styles.arrow} onClick={handleLeftArrowClick} />
      <div className={styles.window}>
        <div
          className={styles.allPagesContainer}
          style={{
            transform: `translateX(${offset}rem)`,
          }}
        >
          {pages}
        </div>
      </div>
      <FaChevronRight
        className={styles.arrow}
        onClick={handleRightArrowClick}
      />
    </div>
  );
};

export default Carousel;

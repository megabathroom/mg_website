import { useEffect, useState } from 'react';

import styles from './ItemCarousel.module.css';

interface IProps {
  images: string[];
}

interface ICurrentImage {
  index: number;
  img: string;
}

export default function ItemCarousel(props: IProps) {
  const [currentImg, setCurrentImg] = useState<ICurrentImage>({
    index: -1,
    img: '',
  });

  useEffect(() => {
    if (props.images.length === 0) {
      return;
    }

    const index = 0;
    setCurrentImg({ index, img: props.images[index] });
  }, [props.images]);

  if (props.images.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.big_image}>
        <img
          src={currentImg.img}
          alt={`Ссылка на изображение повреждена ( img="${currentImg.img}" )`}
        />
      </div>
      <div className={styles.little_images}>
        <ul>
          {props.images.map((e, i) => {
            return (
              <li
                key={`${i}-${e}`}
                onMouseEnter={event => setCurrentImg({ index: i, img: e })}>
                <img src={e} alt="x" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

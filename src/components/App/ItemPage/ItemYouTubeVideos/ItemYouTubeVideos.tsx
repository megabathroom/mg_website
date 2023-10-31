import styles from './ItemYouTubeVideos.module.css';
import YouTubeIframe from '../../../YouTubeIframe/YouTubeIframe';

interface IProps {
  images: string[];
}

function extractYouTubeId(input: string): string | null {
  const match = input.match(/\/youtube_(\w+)\.png/);
  if (match) {
    return match[1];
  }
  return null;
}

export default function ItemYouTubeVideos(props: IProps) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.yt__ul}>
        {props.images.map((e, i) => {
          const ytId = extractYouTubeId(e);
          if (!ytId) {
            return null;
          }

          return (
            <li key={`${ytId}-${i}`}>
              <YouTubeIframe id={ytId} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

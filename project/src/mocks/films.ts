import {Movie} from '../types/movie';
import {random, music, commerce, internet, lorem, image, datatype} from 'faker';

export const makeFakeMovies = (count: number): Movie[] => new Array(count)
  .fill(null)
  .map(() => (
    {
      'id': datatype.number(40),
      'name': random.words(4),
      'poster_image': image.imageUrl(),
      'preview_image': image.imageUrl(),
      'background_image': image.imageUrl(),
      'background_color': commerce.color(),
      'video_link': internet.url(),
      'preview_video_link': internet.url(),
      'description': lorem.sentences(5),
      'rating': datatype.number({min: 1, max: 10, precision: 0.1}),
      'scores_count': datatype.number(200),
      'director': random.words(2),
      'starring': random.arrayElements(),
      'run_time': datatype.number(120),
      'genre': music.genre(),
      'released': Number(datatype.datetime(2021).getFullYear()),
      'is_favorite': datatype.boolean(),
    }
  ));

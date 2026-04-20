export interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
  genre: string;
  year: number;
  description: string;
  ownerId: {
    _id: string;
    username: string;
  };
  likes?: string[];
  created_at: string;
}

export interface CreateMovieData {
  title: string;
  imageUrl: string;
  genre: string;
  year: number;
  description: string;
}

export interface EditMovieData {
  title: string;
  imageUrl: string;
  genre: string;
  year: number;
  description: string;
}

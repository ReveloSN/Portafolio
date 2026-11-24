interface HobbyPhoto {
  readonly src: string;
  readonly author: string;
  readonly source: string;
  readonly license: { readonly label: string; readonly href: string };
}

const UNSPLASH = { label: "Unsplash", href: "https://unsplash.com/license" };

export const HOBBY_FEATURED_IMAGE_SIZES = "(min-width: 1024px) min(55vw, 800px), 95vw";
export const HOBBY_SMALL_IMAGE_SIZES =
  "(min-width: 1024px) min(33vw, 470px), (min-width: 768px) 50vw, 95vw";

export const HOBBY_PHOTOS: Readonly<Partial<Record<string, HobbyPhoto>>> = {
  musica: {
    src: "/art/hobbies/musica.webp?v=2",
    author: "Paul Zoetemeijer",
    source: "https://unsplash.com/photos/ekBOf6sJYYo",
    license: UNSPLASH,
  },
  natacion: {
    src: "/art/hobbies/natacion.webp?v=3",
    author: "Mariusz Smenzyk",
    source: "https://unsplash.com/photos/xs9r8fPUats",
    license: UNSPLASH,
  },
  "tiempo-libre": {
    src: "/art/hobbies/tiempo-libre/teatro.webp",
    author: "Valeria Costa",
    source:
      "https://www.pexels.com/photo/man-and-woman-performing-during-a-theater-play-13607538/",
    license: { label: "Pexels", href: "https://www.pexels.com/license/" },
  },
};

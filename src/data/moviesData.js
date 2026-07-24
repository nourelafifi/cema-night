/**
 * @typedef {Object} CastMember
 * @property {string} name
 * @property {string} character
 * @property {string} image
 */

/**
 * @typedef {Object} Movie
 * @property {string} id
 * @property {string} title
 * @property {string} poster
 * @property {string[]} images
 * @property {string} trailerUrl
 * @property {string} synopsis
 * @property {string} format
 * @property {string} genre
 * @property {number} rating
 * @property {string} duration
 * @property {boolean} isNowShowing
 * @property {CastMember[]} cast
 */

/** @type {Movie[]} */
export const movies = [
  // --- NOW SHOWING ---
  {
    id: 'dune-part-two',
    title: 'Dune: Part Two',
    poster: 'https://image.tmdb.org/t/p/w1280/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    images: [
      'https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
      'https://image.tmdb.org/t/p/w1280/24Ov8wnusgnzXwjV1eDm0Lzo5da.jpg',
      'https://image.tmdb.org/t/p/w1280/wauiyiVXpdvTvt2CzdSWbYlbaE3.jpg',
      'https://image.tmdb.org/t/p/w1280/8uVKfOJUhmybNsVh089EqLHUYEG.jpg',
    ],
    trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
    synopsis:
      'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family, facing a choice between the love of his life and the fate of the universe.',
    format: 'IMAX 3D',
    genre: 'Sci-Fi / Adventure',
    rating: 8.5,
    duration: '2h 46m',
    isNowShowing: true,
    cast: [
      {
        name: 'Timothée Chalamet',
        character: 'Paul Atreides',
        image: 'https://media.themoviedb.org/t/p/w300_and_h450_face/axENiFIrSz5B7UuWkMT7PDe7CaO.jpg',
      },
      {
        name: 'Zendaya',
        character: 'Chani',
        image: 'https://media.themoviedb.org/t/p/w500/1qup8tSt95HLbcy2c2xrx4iJNxv.jpg',
      },
      {
        name: 'Rebecca Ferguson',
        character: 'Lady Jessica',
        image: 'https://media.themoviedb.org/t/p/w500/ty8ZPzaCBBlqIr5qzpOXI24iC8j.jpg',
      },
      {
        name: 'Javier Bardem',
        character: 'Stilgar',
        image: 'https://media.themoviedb.org/t/p/w500/zfRID0jx8DKBluPGU9xtk9sZWUt.jpg',
      },
      {
        name: 'Austin Butler',
        character: 'Feyd-Rautha',
        image: 'https://media.themoviedb.org/t/p/w500/atdAs4pFGjUQ4m2W8kJYly7N6cC.jpg',
      },
      {
        name: 'Florence Pugh',
        character: 'Princess Irulan',
        image: 'https://media.themoviedb.org/t/p/w500/1Uvfh7xL4U2evkhs0M3C7BbBYFf.jpg',
      },
    ],
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    poster: 'https://image.tmdb.org/t/p/w1280/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    images: [
      'https://image.tmdb.org/t/p/w1280/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
      'https://image.tmdb.org/t/p/w1280/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg',
      'https://image.tmdb.org/t/p/w1280/8ohejkcQkNgkJgLn71Ws6Kd35g0.jpg',
      'https://image.tmdb.org/t/p/w1280/eboHBoZEvMlSZ0v1CgGYAXdjDWv.jpg',
    ],
    trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg',
    synopsis:
      'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    format: '70mm IMAX',
    genre: 'Biography / Drama',
    rating: 8.9,
    duration: '3h 00m',
    isNowShowing: true,
    cast: [
      {
        name: 'Cillian Murphy',
        character: 'J. Robert Oppenheimer',
        image: 'https://image.tmdb.org/t/p/w500/2lKs67r7FI4bPu0AXxMUJZxmUXn.jpg',
      },
      {
        name: 'Emily Blunt',
        character: 'Katherine "Kitty" Oppenheimer',
        image: 'https://image.tmdb.org/t/p/w500/5nCSG5TL1bP1geD8aaBfaLnLLCD.jpg',
      },
      {
        name: 'Matt Damon',
        character: 'Leslie Groves',
        image: 'https://image.tmdb.org/t/p/w500/aCvBXTAR9B1qRjIRzMBYhhbm1fR.jpg',
      },
      {
        name: 'Robert Downey Jr.',
        character: 'Lewis Strauss',
        image: 'https://image.tmdb.org/t/p/w500/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg',
      },
      {
        name: 'Florence Pugh',
        character: 'Jean Tatlock',
        image: 'https://image.tmdb.org/t/p/w500/1Uvfh7xL4U2evkhs0M3C7BbBYFf.jpg',
      },
    ],
  },
  {
    id: 'spider-man-across-the-spider-verse',
    title: 'Spider-Man: Across the Spider-Verse',
    poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    images: [
      'https://image.tmdb.org/t/p/w1280/swjY7BXQczWF43Bpoopcr9ovruY.jpg',
      'https://image.tmdb.org/t/p/w1280/qPQiIYUzqHYYhJ3LETxJ84AnGtD.jpg',
      'https://image.tmdb.org/t/p/w1280/2XHBh0CGaNqzpe6jdmBVPZ2mx75.jpg',
      'https://image.tmdb.org/t/p/w1280/8PeDfOEUaRnULLpZTyJ7D8yitr7.jpg',
    ],
    trailerUrl: 'https://www.youtube.com/embed/cqGjhVJWtEg',
    synopsis:
      'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    format: 'Dolby Cinema',
    genre: 'Animation / Action',
    rating: 8.7,
    duration: '2h 20m',
    isNowShowing: true,
    cast: [
      {
        name: 'Shameik Moore',
        character: 'Miles Morales (voice)',
        image: 'https://image.tmdb.org/t/p/w500/ovUKfVOwJ7CadEHaG3NDsfA5xRq.jpg',
      },
      {
        name: 'Hailee Steinfeld',
        character: 'Gwen Stacy (voice)',
        image: 'https://image.tmdb.org/t/p/w500/4K2dzM3odGiVZOQOD6RjVxNq2ZQ.jpg',
      },
      {
        name: 'Oscar Isaac',
        character: "Miguel O'Hara (voice)",
        image: 'https://image.tmdb.org/t/p/w500/dW5U5yrIIPmMjRThR9KT2xH6nTz.jpg',
      },
      {
        name: 'Jake Johnson',
        character: 'Peter B. Parker (voice)',
        image: 'https://image.tmdb.org/t/p/w500/3UNfW2qZgRkW81neNVfQvaRC92K.jpg',
      },
      {
        name: 'Issa Rae',
        character: 'Jessica Drew (voice)',
        image: 'https://image.tmdb.org/t/p/w500/uFjimuDgBv8kckApr19t8DykxPH.jpg',
      },
      {
        name: 'Daniel Kaluuya',
        character: 'Hobie Brown / Punk-Spider (voice)',
        image: 'https://image.tmdb.org/t/p/w500/jj2kZqJobjom36wlhlYhc38nTwN.jpg',
      },
    ],
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    poster: 'https://image.tmdb.org/t/p/w500/nrSaXF39nDfAAeLKksRCyvSzI2a.jpg',
    images: [
      'https://image.tmdb.org/t/p/w1280/2ssWTSVklAEc98frZUQhgtGHx7s.jpg',
      'https://image.tmdb.org/t/p/w1280/5XNQBqnBwPA9yT0jZ0p3s8bbLh0.jpg',
      'https://image.tmdb.org/t/p/w1280/65BTgbR7w8g5h8PlNwUgRVWqPyQ.jpg',
      'https://image.tmdb.org/t/p/w1280/l33oR0mnvf20avWyIMxW02EtQxn.jpg',
    ],
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    synopsis:
      'When Earth becomes uninhabitable, a team of ex-NASA pilots undertakes a dangerous interstellar mission through a wormhole to find humanity a new home.',
    format: 'IMAX 70mm',
    genre: 'Sci-Fi / Drama',
    rating: 8.7,
    duration: '2h 49m',
    isNowShowing: true,
    cast: [
      {
        name: 'Matthew McConaughey',
        character: 'Cooper',
        image: 'https://image.tmdb.org/t/p/w500/lCySuYjhXix3FzQdS4oceDDrXKI.jpg',
      },
      {
        name: 'Anne Hathaway',
        character: 'Brand',
        image: 'https://image.tmdb.org/t/p/w500/nbccV2pMoyLTCeg5DQip24Eq0Jp.jpg',
      },
      {
        name: 'Jessica Chastain',
        character: 'Murph',
        image: 'https://image.tmdb.org/t/p/w500/eQKnihReJeB9vQEa5gySzAlKfZt.jpg',
      },
      {
        name: 'Michael Caine',
        character: 'Professor Brand',
        image: 'https://image.tmdb.org/t/p/w500/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg',
      },
      {
        name: 'Matt Damon',
        character: 'Mann',
        image: 'https://image.tmdb.org/t/p/w500/aCvBXTAR9B1qRjIRzMBYhhbm1fR.jpg',
      },
    ],
  },
  {
    id: 'the-dark-knight',
    title: 'The Dark Knight',
    poster: 'https://image.tmdb.org/t/p/w500/xQPgyZOBhaz1GdCQIPf5A5VeFzO.jpg',
    images: [
      'https://image.tmdb.org/t/p/w1280/4wERhZsE6Cc1PuXkvKzeJOrEhWW.jpg',
      'https://image.tmdb.org/t/p/w1280/plDp52MirFHc2PMJRMNWoG0kfr3.jpg',
      'https://image.tmdb.org/t/p/w1280/qKyd4CbUVzQmYrypZ3T3jW4b0I5.jpg',
      'https://image.tmdb.org/t/p/w1280/blqNt4KaX41piBMHAMUTNEIbn4w.jpg',
    ],
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    synopsis:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    format: 'IMAX 2D',
    genre: 'Action / Crime',
    rating: 9.0,
    duration: '2h 32m',
    isNowShowing: true,
    cast: [
      {
        name: 'Christian Bale',
        character: 'Bruce Wayne / Batman',
        image: 'https://image.tmdb.org/t/p/w500/7Pxez9J8fuPd2Mn9kex13YALrCQ.jpg',
      },
      {
        name: 'Heath Ledger',
        character: 'Joker',
        image: 'https://image.tmdb.org/t/p/w500/AdWKVqyWpkYSfKE5Gb2qn8JzHni.jpg',
      },
      {
        name: 'Aaron Eckhart',
        character: 'Harvey Dent',
        image: 'https://image.tmdb.org/t/p/w500/u5JjnRMr9zKEVvOP7k3F6gdcwT6.jpg',
      },
      {
        name: 'Michael Caine',
        character: 'Alfred Pennyworth',
        image: 'https://image.tmdb.org/t/p/w500/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg',
      },
      {
        name: 'Maggie Gyllenhaal',
        character: 'Rachel Dawes',
        image: 'https://image.tmdb.org/t/p/w500/vsfkWdYWmA9CpzMHTJzrFxlDnEZ.jpg',
      },
      {
        name: 'Gary Oldman',
        character: 'Jim Gordon',
        image: 'https://image.tmdb.org/t/p/w500/yhaSM5habNNI1Tf4ALRwRk3VvSZ.jpg',
      },
      {
        name: 'Morgan Freeman',
        character: 'Lucius Fox',
        image: 'https://image.tmdb.org/t/p/w500/905k0RFzH0Kd6gx8oSxRdnr6FL.jpg',
      },
    ],
  },
  {
    id: 'avatar-the-way-of-water',
    title: 'Avatar: The Way of Water',
    poster: 'https://image.tmdb.org/t/p/w500/q3QCd5PN4Yd58wZZT0a5I3g8hrM.jpg',
    images: [
      'https://image.tmdb.org/t/p/w1280/yEWkS8G6s6SzuHXkNso88luR2mF.jpg',
      'https://image.tmdb.org/t/p/w1280/cd8YDn7M0lfaHhZdU6MvCDxPalP.jpg',
      'https://image.tmdb.org/t/p/w1280/dKfRHBAOxh8b3vmnixwiegsLpeM.jpg',
      'https://image.tmdb.org/t/p/w1280/5EBGdIU4uwgfWHZWsewAFPyOA86.jpg',
    ],
    trailerUrl: 'https://www.youtube.com/embed/d9MyW72ELq0',
    synopsis:
      "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
    format: 'HFR 3D IMAX',
    genre: 'Sci-Fi / Action',
    rating: 7.6,
    duration: '3h 12m',
    isNowShowing: true,
    cast: [
      {
        name: 'Sam Worthington',
        character: 'Jake Sully',
        image: 'https://image.tmdb.org/t/p/w500/vM1WIfYQ1HUBtlVPwB9Hp9fLcn8.jpg',
      },
      {
        name: 'Zoe Saldana',
        character: 'Neytiri',
        image: 'https://image.tmdb.org/t/p/w500/fCJuIn1PMUQtYdRRSnnoZeMJVWs.jpg',
      },
      {
        name: 'Sigourney Weaver',
        character: 'Kiri',
        image: 'https://image.tmdb.org/t/p/w500/wTSnfktNBLd6kwQxgvkqYw6vEon.jpg',
      },
      {
        name: 'Stephen Lang',
        character: 'Colonel Miles Quaritch',
        image: 'https://image.tmdb.org/t/p/w500/gnO5VfkDgA2fsHweD0622LUY3Hu.jpg',
      },
      {
        name: 'Kate Winslet',
        character: 'Ronal',
        image: 'https://image.tmdb.org/t/p/w500/6qNnMsKtKz9si5rabpUEG85UfHp.jpg',
      },
    ],
  },

  // --- COMING SOON ---
  {
    id: 'deadpool-and-wolverine',
    title: 'Deadpool & Wolverine',
    poster: 'https://image.tmdb.org/t/p/w500/a3OLigvMB3qNHU9rGRTZsEhp1Ho.jpg',
    images: [
      'https://image.tmdb.org/t/p/w1280/ufpeVEM64uZHPpzzeiDNIAdaeOD.jpg',
      'https://image.tmdb.org/t/p/w1280/cOoVcVQ3i1m5b2xtqKBtoTSbxC1.jpg',
      'https://image.tmdb.org/t/p/w1280/gFsheBr0csPaUja8aGrv4gTpyRI.jpg',
      'https://image.tmdb.org/t/p/w1280/qRlSSvaGvoDLvFlFcRM9gYXA4cE.jpg',
    ],
    trailerUrl: 'https://www.youtube.com/embed/73_1biulkYk',
    synopsis:
      'Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool. They team up to defeat a common enemy.',
    format: '3D / 4DX',
    genre: 'Action / Comedy',
    rating: 8.1,
    duration: '2h 07m',
    isNowShowing: false,
    cast: [
      {
        name: 'Ryan Reynolds',
        character: 'Wade Wilson / Deadpool',
        image: 'https://image.tmdb.org/t/p/w500/trzgptffGvAlAT6MEu01fz47cLW.jpg',
      },
      {
        name: 'Hugh Jackman',
        character: 'Logan / Wolverine',
        image: 'https://image.tmdb.org/t/p/w500/4Xujtewxqt6aU0Y81tsS9gkjizk.jpg',
      },
      {
        name: 'Emma Corrin',
        character: 'Cassandra Nova',
        image: 'https://image.tmdb.org/t/p/w500/miSbXJBlq6S3dVvOr7OoNL4axW6.jpg',
      },
      {
        name: 'Morena Baccarin',
        character: 'Vanessa',
        image: 'https://image.tmdb.org/t/p/w500/4gyHyg6FJ1oFczOm5pmMkdEEo2J.jpg',
      },
      {
        name: 'Matthew Macfadyen',
        character: 'Paradox',
        image: 'https://image.tmdb.org/t/p/w500/sFaIfkykJdftwrc3BdEfpdg2mYW.jpg',
      },
    ],
  },
  {
    id: 'joker-folie-a-deux',
    title: 'Joker: Folie à Deux',
    poster: 'https://image.tmdb.org/t/p/w500/2CEdT3DMrwEOJlUDOq7ShccwpZn.jpg',
    images: [
      'https://image.tmdb.org/t/p/w1280/7aDM1Rba57BeXr0jWRa3kBgEDUz.jpg',
      'https://image.tmdb.org/t/p/w1280/5DD9CBuYZYAkxJyRJPPNSdQDNl0.jpg',
      'https://image.tmdb.org/t/p/w1280/oAadr06zrHUQVKdZdgdBojRssPq.jpg',
      'https://image.tmdb.org/t/p/w1280/h8LK13QA1hDufe8Yl9DTkHTxOLh.jpg',
    ],
    trailerUrl: 'https://www.youtube.com/embed/_OKAwz22TYM',
    synopsis:
      'Failed comedian Arthur Fleck meets the love of his life, Harley Quinn, while incarcerated at Arkham State Hospital.',
    format: 'IMAX 2D',
    genre: 'Crime / Musical',
    rating: 8.2,
    duration: '2h 18m',
    isNowShowing: false,
    cast: [
      {
        name: 'Joaquin Phoenix',
        character: 'Arthur Fleck / Joker',
        image: 'https://image.tmdb.org/t/p/w500/u38k3hQBDwNX0VA22aQceDp9Iyv.jpg',
      },
      {
        name: 'Lady Gaga',
        character: 'Harleen "Lee" Quinzel',
        image: 'https://image.tmdb.org/t/p/w500/9Y4Pz7AEXhB9qNar2tMsx5EVXML.jpg',
      },
      {
        name: 'Brendan Gleeson',
        character: 'Jackie Sullivan',
        image: 'https://image.tmdb.org/t/p/w500/ctPPJu5ZYDZr1IPmzoNpezczrm0.jpg',
      },
      {
        name: 'Catherine Keener',
        character: 'Maryanne Stewart',
        image: 'https://image.tmdb.org/t/p/w500/n4CTwGszs6cwS1wJRlDQ5Mlh7Ex.jpg',
      },
      {
        name: 'Zazie Beetz',
        character: 'Sophie Dumond',
        image: 'https://image.tmdb.org/t/p/w500/sgxzT54GnvgeMnOZgpQQx9csAdd.jpg',
      },
    ],
  },
  {
    id: 'gladiator-2',
    title: 'Gladiator II',
    poster: 'https://image.tmdb.org/t/p/w500/3d52MgDuO1QNR5oVpBsdQv5JX8.jpg',
    images: [
      'https://image.tmdb.org/t/p/w1280/bHeUgZKqduubnNl8GshjrpHS9lF.jpg',
      'https://image.tmdb.org/t/p/w1280/tOqIwliWMovSIZ9DyvHcHI7p2im.jpg',
      'https://image.tmdb.org/t/p/w1280/xGv28mcf8vdFttD0KgI5GnDDlkG.jpg',
      'https://image.tmdb.org/t/p/w1280/253lYITeE9pJEr9f36dr0iXb79O.jpg',
    ],
    trailerUrl: 'https://www.youtube.com/embed/4rgYUipGJNo',
    synopsis:
      'Years after witnessing the death of Maximus at the hands of his uncle, Lucius must enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist.',
    format: 'IMAX 2D',
    genre: 'Action / Drama',
    rating: 8.0,
    duration: '2h 28m',
    isNowShowing: false,
    cast: [
      {
        name: 'Paul Mescal',
        character: 'Lucius Verus',
        image: 'https://image.tmdb.org/t/p/w500/hPcyXGZ0qNL9Sm2LKlDzO54Pa8g.jpg',
      },
      {
        name: 'Pedro Pascal',
        character: 'General Acacius',
        image: 'https://image.tmdb.org/t/p/w500/oKcMbVn0NJTNzQt0ClKKvVXkm60.jpg',
      },
      {
        name: 'Denzel Washington',
        character: 'Macrinus',
        image: 'https://image.tmdb.org/t/p/w500/393wX9AGWpseVqojQDPLy3bTBia.jpg',
      },
      {
        name: 'Connie Nielsen',
        character: 'Lucilla',
        image: 'https://image.tmdb.org/t/p/w500/gSQ3O3PJ6ly6nT63joOtfZyscFP.jpg',
      },
      {
        name: 'Joseph Quinn',
        character: 'Emperor Geta',
        image: 'https://image.tmdb.org/t/p/w500/zshhuioZaH8S5ZKdMcojzWi1ntl.jpg',
      },
    ],
  },
  {
    id: 'wicked',
    title: 'Wicked',
    poster: 'https://image.tmdb.org/t/p/w500/dfdvUzj4nLZpZ37BoefqvevCMI1.jpg',
    images: [
      'https://image.tmdb.org/t/p/w1280/uKb22E0nlzr914bA9KyA5CVCOlV.jpg',
      'https://image.tmdb.org/t/p/w1280/jTOeWjamUKGxWVUO1TMZXqQUarw.jpg',
      'https://image.tmdb.org/t/p/w1280/uDjYG4ODYetiNuRaopvLvRq0RuO.jpg',
      'https://image.tmdb.org/t/p/w1280/k4xavRmJUzf3M2LRDxhlPq8R6zy.jpg',
    ],
    trailerUrl: 'https://www.youtube.com/embed/6COmYeL9448',
    synopsis:
      'Elphaba, a misunderstood young woman because of her green skin, discovers her true power, while Glinda, a popular young woman, discovers her true heart.',
    format: 'Dolby Cinema',
    genre: 'Fantasy / Musical',
    rating: 7.9,
    duration: '2h 40m',
    isNowShowing: false,
    cast: [
      {
        name: 'Cynthia Erivo',
        character: 'Elphaba',
        image: 'https://image.tmdb.org/t/p/w500/gIAXqZwZCBqkh2ppfAV4xcnMxki.jpg',
      },
      {
        name: 'Ariana Grande',
        character: 'Glinda',
        image: 'https://image.tmdb.org/t/p/w500/d4HtCXm58GuqVJVGgDKFn0dEj8M.jpg',
      },
      {
        name: 'Jonathan Bailey',
        character: 'Fiyero',
        image: 'https://image.tmdb.org/t/p/w500/i9m6JsYKQot3kbMMFsvbEuFarvq.jpg',
      },
      {
        name: 'Ethan Slater',
        character: 'Boq',
        image: 'https://image.tmdb.org/t/p/w500/xIgqyrM78FPt7Pb2Vv3IvJcnOWS.jpg',
      },
      {
        name: 'Michelle Yeoh',
        character: 'Madame Morrible',
        image: 'https://image.tmdb.org/t/p/w500/i6fHvGt7Rb8oVyjjdQVV6vEHB94.jpg',
      },
      {
        name: 'Jeff Goldblum',
        character: 'The Wonderful Wizard of Oz',
        image: 'https://image.tmdb.org/t/p/w500/kcyEPgYtBP5Pm6LLeLGfXKjYovL.jpg',
      },
    ],
  },
  {
    id: 'alien-romulus',
    title: 'Alien: Romulus',
    poster: 'https://image.tmdb.org/t/p/w500/l765ZEJlfyb50GjaF0dKdV98aI8.jpg',
    images: [
      'https://image.tmdb.org/t/p/w1280/iWjWuHIvJKCAcNeRbOlUzrYcFSS.jpg',
      'https://image.tmdb.org/t/p/w1280/eP4RZSHliWu6lPT5WQyHr5ZZKuC.jpg',
      'https://image.tmdb.org/t/p/w1280/ylwTC5aHLdCK8XEp89CGVW1a2Zj.jpg',
      'https://image.tmdb.org/t/p/w1280/ugq64P4orfeF2GHYqgL0DCvdw09.jpg',
    ],
    trailerUrl: 'https://www.youtube.com/embed/x0XDEhP4MQs',
    synopsis:
      'While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.',
    format: '4DX / Dolby',
    genre: 'Horror / Sci-Fi',
    rating: 7.5,
    duration: '1h 59m',
    isNowShowing: false,
    cast: [
      {
        name: 'Cailee Spaeny',
        character: 'Rain Carradine',
        image: 'https://image.tmdb.org/t/p/w500/UZD1rhktc7eeOJLHgL1tvkPhOA.jpg',
      },
      {
        name: 'David Jonsson',
        character: 'Andy',
        image: 'https://image.tmdb.org/t/p/w500/2ZZNGZw57KKMrVIr27g7W16G0jV.jpg',
      },
      {
        name: 'Archie Renaux',
        character: 'Tyler',
        image: 'https://image.tmdb.org/t/p/w500/uTd18t2VJovN2jSJyhuG8Yy3PV6.jpg',
      },
      {
        name: 'Isabela Merced',
        character: 'Kay',
        image: 'https://image.tmdb.org/t/p/w500/4SolFI9dwyPm6BXcb3PDcOYzSEl.jpg',
      },
      {
        name: 'Spike Fearn',
        character: 'Bjorn',
        image: 'https://image.tmdb.org/t/p/w500/o1WcXkDdlN5wdL5WIuGXNpNouZ9.jpg',
      },
    ],
  },
  {
    id: 'kingdom-of-the-planet-of-the-apes',
    title: 'Kingdom of the Planet of the Apes',
    poster: 'https://image.tmdb.org/t/p/w500/jHV0bDiAqzzgtoHiJ03LhBPB05o.jpg',
    images: [
      'https://image.tmdb.org/t/p/w1280/zW0lOvZj11nhjpCx83xKRmzRU9v.jpg',
      'https://image.tmdb.org/t/p/w1280/wMPb9uQjeE6CJ2fJQlYzyhvA1HN.jpg',
      'https://image.tmdb.org/t/p/w1280/wuANo81Kh2lEFlt0P3XwexUjVpP.jpg',
      'https://image.tmdb.org/t/p/w1280/6M8MdcaLK9nAGcFJzFPtoQr43Nv.jpg',
    ],
    trailerUrl: 'https://www.youtube.com/embed/XtFI7SNtVpY',
    synopsis:
      "Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he's been taught about the past and make choices that will define a future for apes and humans alike.",
    format: 'IMAX 3D',
    genre: 'Action / Sci-Fi',
    rating: 7.8,
    duration: '2h 25m',
    isNowShowing: false,
    cast: [
      {
        name: 'Owen Teague',
        character: 'Noa',
        image: 'https://image.tmdb.org/t/p/w500/tgCkGE0LIggyjMmgSwHhpZAkfJs.jpg',
      },
      {
        name: 'Freya Allan',
        character: 'Mae / Nova',
        image: 'https://image.tmdb.org/t/p/w500/8RuLG2mePw8YgFNUjWROBuxMrwT.jpg',
      },
      {
        name: 'Kevin Durand',
        character: 'Proximus Caesar',
        image: 'https://image.tmdb.org/t/p/w500/hINvryvce5tpod6kTnUg9ZTH8wg.jpg',
      },
      {
        name: 'Peter Macon',
        character: 'Raka',
        image: 'https://image.tmdb.org/t/p/w500/jF4jzgtWB2NAJ6BfVTSDQOlOHLr.jpg',
      },
      {
        name: 'William H. Macy',
        character: 'Trevathan',
        image: 'https://image.tmdb.org/t/p/w500/hdVEGSrP8qWlJnt0v5vSVcGOjy7.jpg',
      },
    ],
  },
];

// --- HELPER FUNCTIONS ---

export function getMovieById(id) {
  return movies.find((movie) => movie.id === id);
}

export function getNowShowingMovies() {
  return movies.filter((movie) => movie.isNowShowing);
}

export function getComingSoonMovies() {
  return movies.filter((movie) => !movie.isNowShowing);
}

export function searchMovies(query = '') {
  const q = query.toLowerCase().trim();
  if (!q) return movies;
  return movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(q) ||
      movie.genre.toLowerCase().includes(q) ||
      movie.cast.some(
        (actor) =>
          actor.name.toLowerCase().includes(q) ||
          actor.character.toLowerCase().includes(q)
      )
  );
}

export default movies;
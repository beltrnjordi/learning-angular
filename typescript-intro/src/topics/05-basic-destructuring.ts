
interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details {
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 35,
    song: "undressed",
    details: {
        author: "sombr",
        year: 2025
    }
}
const song = "new song";

// const {song: songTitle, details: songDetails} = audioPlayer;
// const {author} = songDetails;
// const {song: songTitle, details: {author}} = audioPlayer;
// console.log('Song: ', songTitle)
// console.log('Song author: ', author)

const [, , trunks = 'Not found']: string[] = ['Goku', 'Vegeta'];

console.error('Personaje 3:', trunks)
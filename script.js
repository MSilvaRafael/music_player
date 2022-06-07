//Variáveis
let musicList = [
    {
        title: 'As You Fade Away',
        artist: 'NEFFEX',
        src: 'music/As You Fade Away - NEFFEX.mp3',
        img: 'images/pop.jpg'
    },
    {
        title: 'Down With Your Getup',
        artist: 'Mini Vandals',
        src: 'music/Down With Your Getup - Mini Vandals.mp3',
        img: 'images/r&b.jpg'
    },
    {
        title: 'Smokey\'s lounge',
        artist: 'Track Tribe',
        src: 'music/Smokey s Lounge - TrackTribe.mp3',
        img: 'images/jazz.jpg'
    }
];

let music = document.querySelector('audio');
let indexMusic = 0;

let imageMusic = document.querySelector('img');
let nameMusic = document.querySelector('.descricao h2');
let nameArtist = document.querySelector('.descricao i')

//chamada da função para carregar todas as informações ao abrir ou atualizar a página
renderMusic(indexMusic);

//Eventos
document.querySelector('.btn-play').addEventListener('click', playMusic);

document.querySelector('.btn-pause').addEventListener('click', pauseMusic);

music.addEventListener('timeupdate', updateMusicTime);

music.addEventListener('loadeddata', totalTimeMusic);

document.querySelector('.btn-bw').addEventListener('click', () => {
    indexMusic--;
    if (indexMusic < 0) {
        indexMusic = 2;
    }
    renderMusic(indexMusic)
});

document.querySelector('.btn-fw').addEventListener('click', () => {
    indexMusic++;
    if (indexMusic > 2){
        indexMusic = 0;
    }
    renderMusic(indexMusic)
});


//funções
function renderMusic(index) {
    music.setAttribute('src', musicList[index].src);
    music.addEventListener('loadeddata', () => {
        nameMusic.textContent = musicList[index].title;
        nameArtist.textContent = musicList[index].artist;
        imageMusic.src = musicList[index].img;
        function totalTimeMusic() {
            let duratMusic = document.querySelector('.end');
            duratMusic.textContent = timeFormat(Math.floor(music.duration));        
        };
    });
    let prog = document.querySelector('progress')
    prog.style.width = 0;
    document.querySelector('.btn-play').style.display = 'block';
    document.querySelector('.btn-pause').style.display = 'none';
}

function totalTimeMusic() {
    let duratMusic = document.querySelector('.end');
    duratMusic.textContent = timeFormat(Math.floor(music.duration));        
}
    

function playMusic() {
    music.play()
    document.querySelector('.btn-pause').style.display = 'block';
    document.querySelector('.btn-play').style.display = 'none';
}


function pauseMusic() {
    music.pause()
    document.querySelector('.btn-play').style.display = 'block';
    document.querySelector('.btn-pause').style.display = 'none';
}

function updateMusicTime() {
    let prog = document.querySelector('progress')
    prog.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%';
    let stampedTime = document.querySelector('.start');
    stampedTime.textContent = timeFormat(Math.floor(music.currentTime));
}

function timeFormat(sec) {
    let minutField = Math.floor(sec / 60);
    let secondField = sec % 60;
    if(secondField < 10){
        secondField = '0' + secondField;
    }

    return minutField + ':' + secondField;
}


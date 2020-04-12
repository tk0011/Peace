const app =  () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.video video');

    //sounds 
    const sounds = document.querySelectorAll('.mood button');

    //Timer
    const timer = document.querySelector('.timer');

    //length of outline 
    const outlineLength = outline.getTotalLength();

    //timepicker
    const pickTime = document.querySelectorAll('.pick-time button');

    //duration 
    let duration = 1200;


    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //play-sound 

    play.addEventListener('click', () =>{
        checkPlaying(song);
    });

    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            play.src= './Assets/svg/play.svg';
        })
    })

    pickTime.forEach(list => {
        list.addEventListener('click' , function() {
            duration = this.getAttribute('data-time');
            timer.textContent = `${Math.floor(duration/60)}: ${Math.floor(duration%60)}`;
            song.pause();
            song.currentTime = 0;
            play.src= './Assets/svg/play.svg';
            video.pause();
        })
    })


    //Fn to play and pause 
    const checkPlaying = (song) => {
        if(song.paused) {
            song.play();
            video.play();
            play.src = './Assets/svg/pause.svg';
        }else{
            song.pause();
            video.pause();
            play.src = './Assets/svg/play.svg'
        }
    };

    song.ontimeupdate = () => {
        let currentTime  = song.currentTime;
        let elapsed = duration-currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes= Math.floor(elapsed/ 60);
        let progress = outlineLength - (currentTime/duration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        timer.textContent = `${minutes}:${seconds}`
        
        if(currentTime>duration) {
            song.pause();
            song.currentTime = 0;
            play.src= './Assets/svg/play.svg';
            video.pause();
        }
    }
};

  

app();
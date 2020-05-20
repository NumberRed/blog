var imageArray =    [   
                    "https://cdn2-www.gamerevolution.com/assets/uploads/2019/12/DBZ-Kakarot-box-art.jpg",
                    "https://vignette.wikia.nocookie.net/dragonball/images/6/65/Frieza_DBZ_Ep_76_001.png/revision/latest/scale-to-width-down/340?cb=20171003200511",
                    "https://i.pinimg.com/originals/bd/96/56/bd96565f65351c8d35e8241b4239f211.jpg",
                    "https://i.pinimg.com/474x/e4/58/33/e4583302ea667d6fd528ed7066dab58a--my-english-teacher-english-teachers.jpg",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4qfT2e-L3yvlNjOO20y8uqIuwjCiyfblx3SPlthB8uPASh1cS&usqp=CAU",
                    "https://vignette.wikia.nocookie.net/dragonballfanon/images/f/f0/All_super_saiyans_by_db_own_universe_arts-d4tgzvs.png/revision/latest/scale-to-width-down/340?cb=20130315202512",
                    "https://static.miraheze.org/toxicfandomsandhatedomswiki/thumb/3/30/Dbz-kai.jpg/330px-Dbz-kai.jpg",
                    "https://m.media-amazon.com/images/M/MV5BMGMyOThiMGUtYmFmZi00YWM0LWJiM2QtZGMwM2Q2ODE4MzhhXkEyXkFqcGdeQXVyMjc2Nzg5OTQ@._V1_.jpg",
                    "https://cutewallpaper.org/21/wallpaper-dragon-boll/60+-Dbz-Super-Wallpapers-on-WallpaperPlay.jpg",
                    "https://vignette.wikia.nocookie.net/dragonball/images/d/d4/Cell_DBZ_Ep_170_001.png/revision/latest/scale-to-width-down/340?cb=20180812173437",
                    "https://i.pinimg.com/originals/5d/52/60/5d5260672070182de527b2a2d527b676.jpg",
                    "https://images-na.ssl-images-amazon.com/images/I/81Dy6cNM7yL.jpg",
                    "https://live.staticflickr.com/3282/2871051998_78ddd9b96d_b.jpg",
                    "https://wallpaperaccess.com/full/54749.jpg",
                    ]
var imageRight = document.getElementById("imageRight");
var imageLeft = document.getElementById("imageLeft");

function changeImage() {
    imageRight.src = imageArray[(Math.random() * imageArray.length)|0];
    imageLeft.src = imageArray[(Math.random() * imageArray.length)|0];;
}

window.onload = changeImage();

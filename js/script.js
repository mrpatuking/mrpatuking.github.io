const API_KEY = "AIzaSyAli3fmj2z3pXVtflmncejg3NuQs2ZU3q8";

const CHANNEL_ID = "UC5xVMhmqUricJn5JINdJk4A";

// Upload Playlist
const UPLOADS_PLAYLIST = "UU" + CHANNEL_ID.substring(2);

// =================== LOAD VIDEOS ===================

async function loadVideos() {

    const url =
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${UPLOADS_PLAYLIST}&maxResults=12&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    const videoContainer = document.getElementById("video-grid");
    const shortContainer = document.getElementById("shorts-grid");

    videoContainer.innerHTML = "";
    shortContainer.innerHTML = "";

    let videoCount = 0;
    let shortCount = 0;

    data.items.forEach(item=>{

        const videoId = item.snippet.resourceId.videoId;
        const title = item.snippet.title;
        const thumb = item.snippet.thumbnails.high.url;

        // Shorts
        if(title.toLowerCase().includes("#short")){

            if(shortCount < 4){

                shortContainer.innerHTML += `
                <div class="short-card">
                    <a href="https://youtube.com/shorts/${videoId}" target="_blank">
                        <img src="${thumb}">
                    </a>
                </div>
                `;

                shortCount++;
            }

        }

        else{

            if(videoCount < 3){

                videoContainer.innerHTML += `
                <div class="video-card">

                    <a href="https://youtube.com/watch?v=${videoId}" target="_blank">

                        <img src="${thumb}">

                    </a>

                    <h3>${title}</h3>

                </div>
                `;

                videoCount++;

            }

        }

    });

}

loadVideos();


// ================= MOBILE MENU =================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click",()=>{

    navLinks.classList.toggle("active");

});


// ================= STICKY NAVBAR =================

window.addEventListener("scroll",()=>{

const navbar=document.querySelector(".navbar");

if(window.scrollY>80){

navbar.classList.add("sticky");

}

else{

navbar.classList.remove("sticky");

}

});
// ================= GALLERY LIGHTBOX =================

const galleryImages = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {

        lightbox.style.display = "flex";
        lightboxImg.src = img.src;

    });

});

closeBtn.onclick = () => {

    lightbox.style.display = "none";

};

lightbox.onclick = (e) => {

    if(e.target === lightbox){

        lightbox.style.display = "none";

    }

};
// ================= LIVE CHANNEL STATS =================

async function loadChannelStats() {

    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) return;

    const stats = data.items[0].statistics;

    document.getElementById("subs").innerText =
        Number(stats.subscriberCount).toLocaleString();

    document.getElementById("views").innerText =
        Number(stats.viewCount).toLocaleString();

    document.getElementById("videos-count").innerText =
        Number(stats.videoCount).toLocaleString();

}

loadChannelStats();
// ================= ACTIVE MENU =================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});
// ================= BACK TO TOP =================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
// ================= LOADER =================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("loader-hide");

    }, 2000);

});
// ================= SCROLL REVEAL =================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

    reveals.forEach(section=>{

        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if(top < windowHeight - 100){
            section.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

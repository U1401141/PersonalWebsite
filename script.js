document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------
       Mobile Menu Toggle
       ------------------------------------------------ */
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navItems = document.querySelectorAll('.nav-item');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            
            // Animate Hamburger (optional, simple toggle for now)
            const bars = mobileMenuBtn.querySelectorAll('.bar');
            // Add any specific animation class if needed
        });
    }

    /* ------------------------------------------------
       Dropdown Interaction (Mobile Click)
       ------------------------------------------------ */
    navItems.forEach(item => {
        const toggleBtn = item.querySelector('.toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                // Only for mobile or if clicking the parent link directly
                // Prevent default if it's just a toggle
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });

    /* ------------------------------------------------
       Close Dropdown When Clicking Outside
       ------------------------------------------------ */
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item')) {
            navItems.forEach(item => item.classList.remove('active'));
        }
    });

    /* ------------------------------------------------
       Tabbed UI Logic
       ------------------------------------------------ */
    // Initialize default tabs
    // Find all tab containers and click the first button
    // Initialize default tabs
    document.querySelectorAll('.tab-container').forEach(container => {
        const firstTab = container.querySelector('.tab-btn');
        if (firstTab) {
            firstTab.click();
        }
    });

    /* ------------------------------------------------
       Gallery Rendering Logic
       ------------------------------------------------ */
    const galleryContainer = document.getElementById('gallery-grid');
    if (galleryContainer) {
        renderGallery(galleryContainer);
    }
});

// Gallery Data
const galleryImages = [
    // --- JAPAN ---
    { src: 'Main.image/JP1.jpg', caption: 'ピクミン！！' },
    { src: 'Main.image/JP2.jpg', caption: 'チームラボ 2024（3回目！！）' },
    { src: 'Main.image/JP3.jpg', caption: 'アメリカ行く前には一杯しないといけません。（大嘘）' },
    { src: 'Main.image/JP4.jpg', caption: '2023年銀座のアートアクアリウム！' },
    { src: 'Main.image/JP5.jpg', caption: '内容量が多いおーいお茶' },
    { src: 'Main.image/JP6.jpg', caption: '２２歳で甥っ子ができました。（親への感謝が増しました）' },
    { src: 'Main.image/JP7.jpg', caption: '勝手にワケ有にするな、俺のアナザースカイだぞ！！' },
    { src: 'Main.image/JP8.jpg', caption: 'ドリアンの匂いは香りに含まれる、硫黄化合物や酯類、アルコールなどの化合物、その匂いを閉じ込める皮の研究とかしないのかな？' },
    { src: 'Main.image/JP9.jpg', caption: 'これだと、消毒した後にトイレに行くような構図だから、逆向きにした方がいいな' },
    { src: 'Main.image/JP10.jpg', caption: '深川不動尊入る前からお香の匂いがすごい！' },
    { src: 'Main.image/JP11.jpg', caption: 'かわいい' },
    { src: 'Main.image/JP12.jpg', caption: 'え、東大って黒門とかあったの（多分ない）' },
    { src: 'Main.image/JP13.jpg', caption: '南ちゃんが俺にもいたら、大谷超えてました' },
    { src: 'Main.image/JP14.jpg', caption: '題名だけで鬱になりそうだった！祖国ポーランドを思い亡くなるショパン、最後まで祖国を思い続けたラフマニノフ…音楽家の悲劇は数多ある😿' },
    { src: 'Main.image/JP15.JPG', caption: 'ダメって言われると、やりたくなるよね、カリギュラ効果！！'},
    { src: 'Main.image/JP16.JPG', caption: '新世界教育は気になる、なんか怖い' },
    { src: 'Main.image/JP17.JPG', caption: 'My Euphonium!!!' },
    { src: 'Main.image/JP18.JPG', caption: 'My Euphonium!!!' },
    { src: 'Main.image/JP19.jpg', caption: 'My Euphonium!!!' },
    { src: 'Main.image/JP20.jpg', caption: 'いやいや、お持ち帰りします！' },
    { src: 'Main.image/JP21.jpg', caption: '買って２週間で失くしたサングラス' },
    { src: 'Main.image/JP22.jpg', caption: '人違いをされたけど、ノリで話し合わせて乗り切った！奈良ではなくて、アメリカで頑張ります！' },
    { src: 'Main.image/JP23.jpg', caption: '慶應生の学生証がないとは入れんBlue-Red-Blueって言う慶應カラーのバー！' },
    { src: 'Main.image/JP24.jpg', caption: 'ほんとうに？' },
    { src: 'Main.image/JP25.jpg', caption: 'ひつまぶしの名前の由来は、木のお櫃にご飯と細かく刻んだ鰻を「まぶして」食べることから、「お櫃（ひつ）＋まぶし」で「ひつまぶし」' },
    { src: 'Main.image/JP26.jpg', caption: '八ヶ岳の空気がおいしかったです！' },
    { src: 'Main.image/JP28.jpg', caption: 'ディズニーで働く人のコミュ力すごい！' },
    { src: 'Main.image/JP29.jpg', caption: 'カフェ”の”' },
    { src: 'Main.image/JP30.jpg', caption: '成人式！男子校だったのですごい怖かったです。' },
    { src: 'Main.image/JP31.jpg', caption: 'TETSUっていうラーメン屋さんは混ぜそばを鳥インフルエンザのせいで発売を永久的にやめるという、超間違いを犯しました。もう一回だけ食べさせてほしい😿' },
    { src: 'Main.image/JP32.jpg', caption: '上野から羽田空港まで歩いてるときに、買って３分でバニラフラペチーノ落として世界樹のユグドラシルを作りました' },
    { src: 'Main.image/JP34.jpg', caption: '人生初の飛行機が、人生初の海外で、留学だった時に家族や親戚一同が、展望台から手を振ってくれているのが飛行機から見えて泣いたのは２秒前のように覚えています。' },

    // --- KOREA ---
    { src: 'Main.image/KR1.jpg', caption: '경복궁에서 인터뷰했는데, TV에도 5분이나 나왔어요! (이유는 모름, 미스터리)' },
    { src: 'Main.image/KR4.jpg', caption: '해운대는 진짜 최고예요' },
    { src: 'Main.image/KR5.jpg', caption: '라프라스 진짜 보고 싶었는데... 😿' },
    { src: 'Main.image/KR6.mp4', caption: '미국 텍사스 로드하우스에서는 춤 안 춰줘요!', type: 'video' },
    { src: 'Main.image/KR7.jpg', caption: '진짜 세상에서 제일 맛있는 우유!' },
    { src: 'Main.image/KR8.jpg', caption: '해동용궁사 너무 좋았어요!' },
    { src: 'Main.image/KR9.jpg', caption: '이 선인장 완전 제 취향이었어요. 모양이 참 예쁘죠.' },
    { src: 'Main.image/KR10.jpg', caption: '안국에 있는 미술관이에요!' },
    { src: 'Main.image/KR12.jpg', caption: '조카가 너무 귀여워요.' },
    { src: 'Main.image/KR13.jpg', caption: '크리스마스에 가족이랑 한국 왔는데, 죄다 커플뿐이더라고요. 참나.' },
    { src: 'Main.image/KR14.jpg', caption: '장미공원은 보기만 해도 행복해져요.' },
    { src: 'Main.image/KR15.jpg', caption: '호오, 타코야키라... 일본인인 제가 한번 평가해 보죠. (근데 진짜 맛있었어요, 할머니 솜씨 대박!)' },
    { src: 'Main.image/KR16.jpg', caption: '대전에서 먹은 소보로빵! 진짜 꿀맛이었어요!' },
    { src: 'Main.image/KR17.jpg', caption: '제가 제일 좋아하던 카페가 문을 닫았어요... 😿' },
    { src: 'Main.image/KR18.jpg', caption: '학생식당에서 일하시던 누나들은 잘 지내시려나... 밥 공짜로 주셔서 진짜 감사했는데 😿' },
    { src: 'Main.image/KR19.jpg', caption: '월미도에서 먹은 짜장면, 진짜 맛있었어요!' },
    { src: 'Main.image/KR20.jpg', caption: '기숙사 앞 공원에 있던 연꽃!' },
   
    // --- UNITED STATES ---
    { src: 'Main.image/US1.jpg', caption: 'Ritz-Carlton Leadership Training!' },
    { src: 'Main.image/US2.jpg', caption: 'Ritz-Carlton Leadership Training!' },
    { src: 'Main.image/US3.jpg', caption: 'Throwback to the Small Satellite Conference!' },
    { src: 'Main.image/US5.jpg', caption: 'Saw "Dear Evan Hansen." 😿' },
    { src: 'Main.image/US7.jpg', caption: 'Presented in a Data Science Hackathon.' },
    { src: 'Main.image/US11.jpg', caption: 'Banksy in Park City!?!? (I do not think so...)' },
    { src: 'Main.image/US12.jpg', caption: 'I seriously came here every day for coffee. I wouldn\' t have survived without Lassonde.' },
    { src: 'Main.image/US13.jpg', caption: 'Cafe Rio’s Horchata is legit.' },
    { src: 'Main.image/US14.jpg', caption: 'Do Americans think ketchup and mayo are dessert?' },
    { src: 'Main.image/US15.jpg', caption: 'Such a cute shop. 🐈' },
    { src: 'Main.image/US16.jpg', caption: 'Homemade pizza! Made the dough from scratch. :-)' },
    { src: 'Main.image/US22.jpg', caption: 'Chicken and Waffles in Cincinnati.' },
    { src: 'Main.image/US23.jpg', caption: 'The Chicago Cubs stadium! (Wrigley Field!)' },
    { src: 'Main.image/US24.jpg', caption: 'Chicago hot dogs are actually amazing!' },
    { src: 'Main.image/US26.jpg', caption: '僕の細道とは。。。アメリカには日本人も聞いたことのない日本の本がある。<br>"Boku no Hosomichi"? There are Japanese books here that even Japanese people don\'t know about...' },
    { src: 'Main.image/US27.jpg', caption: 'Chicago pizza portions are insane.' },
    { src: 'Main.image/US28.jpg', caption: 'University of Cincinnati!' },
    { src: 'Main.image/US30.jpg', caption: 'Well, I\'m an engineer. Gotta break the phone to understand how it works.' },
    { src: 'Main.image/US31.jpg', caption: 'Who made this origami?! It\'s beautiful!' },
    { src: 'Main.image/US32.jpg', caption: 'Thanks!' },
    { src: 'Main.image/US33.jpg', caption: 'Learning how to make the menu is tough...' }
];

/**
 * Render Gallery Grid
 * @param {HTMLElement} container - The container to render into
 */
function renderGallery(container) {
    // Clear existing content just in case
    container.innerHTML = '';

    galleryImages.forEach(imgData => {
        // Create Grid Item
        const gridItem = document.createElement('div');
        gridItem.className = 'gallery-item';

        // Image/Video Container
        const mediaWrapper = document.createElement('div');
        mediaWrapper.className = 'gallery-img-wrapper';
        
        // Media Element (Image or Video)
        let mediaElement;
        
        if (imgData.type === 'video') {
            mediaElement = document.createElement('video');
            mediaElement.src = imgData.src;
            mediaElement.controls = true; // Allow play/pause
            mediaElement.muted = true; // Muted by default for auto-play scenarios if added
            mediaElement.style.objectFit = 'cover'; // Fill wrapper like images
            mediaElement.style.width = '100%';
            mediaElement.style.height = '100%';
        } else {
            mediaElement = document.createElement('img');
            mediaElement.src = imgData.src;
            mediaElement.alt = imgData.caption;
            mediaElement.loading = 'lazy';
        }
        
        // Caption
        const caption = document.createElement('p');
        caption.className = 'gallery-caption';
        caption.className = 'gallery-caption';
        caption.innerHTML = imgData.caption;

        // Assembly
        mediaWrapper.appendChild(mediaElement);
        gridItem.appendChild(mediaWrapper);
        gridItem.appendChild(caption);
        container.appendChild(gridItem);

        if (imgData.type !== 'video') {
            gridItem.addEventListener('click', () => {
                const modal = document.getElementById('lightbox-modal');
                const modalImg = document.getElementById('lightbox-img');
                const modalCaption = document.getElementById('lightbox-caption');
    
                if (modal && modalImg && modalCaption) {
                    modal.style.display = 'flex';
                    modalImg.src = imgData.src;
                    modalImg.src = imgData.src;
                    modalCaption.innerHTML = imgData.caption;
                }
            });
        }
    });
    // Close Modal Logic (Remaining same)
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        const closeBtn = modal.querySelector('.close-btn');
        if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
        modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
    }
}


/**
 * Open a specific tab
 * @param {Event} evt - The click event
 * @param {String} tabName - The ID of the tab content to show
 */
function openTab(evt, tabName) {
    // 1. Get the current tab container to scope the changes
    // This allows multiple independent tab groups on the same page
    const container = evt.currentTarget.closest('.tab-container');
    
    // 2. Hide all tab content in THIS container
    const tabContents = container.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    // 3. Remove 'active' class from all tab buttons in THIS container
    const tabLinks = container.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // 4. Show the current tab, and add an "active" class to the button that opened the tab
    const targetContent = document.getElementById(tabName);
    if (targetContent) {
        targetContent.style.display = "block";
    }
    evt.currentTarget.className += " active";
}

/* ------------------------------------------------
   Hero Animation Logic (Fixed Visibility)
   ------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
    const rotatingSpan = document.getElementById('hero-rotating-text');
    const shapesContainer = document.querySelector('.shapes');

    // 1. INITIAL SETUP: strictly hide background shapes so text is readable
    if (shapesContainer) {
        shapesContainer.style.opacity = '0'; 
        shapesContainer.style.transition = 'opacity 2.0s ease'; // Smooth fade-in
    }

    if (rotatingSpan) {
        // Words and matching theme colors
        const words = [
            "Happy", "ツイてる", "행복해", 
            "Thankful", "サイコー", "최고", 
            "Lucky", "いいね！", "좋아", 
            "Grateful", "ありがとう", "고마워", 
            "Positive", "ポジティブ", "긍정", 
            "Graceful", "潔く", "우아하게", 
            "Harmony", "和合", "화합", 
            "Peace", "幸せ", "평화", 
            "Joy", "感謝", "기쁨", 
            "Love", "大好き", "사랑해",
            "Amazing", "最高", "대박"
        ];
        const colors = [
            "#00FFFF", "#FF00FF", "#FFFF00", "#FF0000", 
            "#00FF00", "#0000FF", "#007FFF", "#7F00FF", 
            "#FF007F", "#FF7F00", "#7FFF00", "#00FF7F", 
            "#00BFFF", "#BF00FF", "#FF00BF", "#FFBF00", 
            "#BFFF00", "#00FFBF", "#0080FF", "#800080",
            "#00FFFF", "#FF00FF", "#FFFF00", "#FF0000", 
            "#00FF00", "#0000FF", "#007FFF", "#7F00FF", 
            "#FF007F", "#FF7F00", "#7FFF00", "#00FF7F", 
            "#00BFFF", "#BF00FF", "#FF00BF", "#FFBF00", 
            "#BFFF00", "#00FFBF", "#0080FF", "#800080",
        ];

        let index = 0;
        const speed = 200; // Speed of rotation
        const totalDuration = 8000; // Duration before stopping

        // 2. START ANIMATION
        const intervalId = setInterval(() => {
            rotatingSpan.textContent = words[index];
            rotatingSpan.style.color = colors[index]; // Now visible against white bg
            index = (index + 1) % words.length;
        }, speed);

        // 3. END SEQUENCE
        setTimeout(() => {
            clearInterval(intervalId);
            
            // Final State: "Kento" in Solid Black
            rotatingSpan.textContent = "WELCOME!";
            rotatingSpan.style.color = "#000000"; 
            
            // Reveal the GSAP Shapes behind the text
            if (shapesContainer) {
                shapesContainer.style.opacity = '1';
            }
            
        }, totalDuration);
    }
});
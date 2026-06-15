document.addEventListener("DOMContentLoaded", function() {

    var heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
        var text = heroTitle.innerHTML;
        var clean = text.replace(/<br>/g, " ");
        heroTitle.innerHTML = "";
        var words = clean.split(" ");
        var wordPos = 0;
        var charPos = 0;
        var result = "";
        
        function typeWriter() {
            if (wordPos < words.length) {
                if (charPos < words[wordPos].length) {
                    result += words[wordPos][charPos];
                    heroTitle.innerHTML = result + " ";
                    charPos++;
                    setTimeout(typeWriter, 60);
                } else {
                    result += " ";
                    heroTitle.innerHTML = result;
                    wordPos++;
                    charPos = 0;
                    setTimeout(typeWriter, 120);
                }
            }
        }
        typeWriter();
    }

    function makeMenu() {
        if (window.innerWidth <= 768) {
            var menu = document.querySelector(".nav-menu");
            var headerBox = document.querySelector(".header-flex");
            
            if (menu && !document.querySelector(".menu-icon")) {
                var icon = document.createElement("div");
                icon.className = "menu-icon";
                icon.innerHTML = "<span></span><span></span><span></span>";
                
                var css = document.createElement("style");
                css.textContent = ".menu-icon{width:35px;cursor:pointer;z-index:1002;} .menu-icon span{display:block;width:35px;height:3px;background:#C45B6E;margin:6px 0;transition:all 0.3s;} .menu-icon.active span:nth-child(1){transform:rotate(45deg) translate(8px,8px);} .menu-icon.active span:nth-child(2){opacity:0;} .menu-icon.active span:nth-child(3){transform:rotate(-45deg) translate(8px,-8px);}";
                document.head.appendChild(css);
                
                headerBox.insertBefore(icon, headerBox.firstChild);
                menu.style.cssText = "position:fixed; top:0; right:-300px; width:280px; height:100%; background:white; box-shadow:-5px 0 30px rgba(0,0,0,0.2); transition:0.3s; z-index:1000; padding-top:80px;";
                
                icon.onclick = function() {
                    icon.classList.toggle("active");
                    if (menu.style.right === "0px") {
                        menu.style.right = "-300px";
                        document.body.style.overflow = "";
                    } else {
                        menu.style.right = "0px";
                        document.body.style.overflow = "hidden";
                    }
                };
            }
        }
    }
    
    makeMenu();
    window.addEventListener("resize", function() {
        var menu = document.querySelector(".nav-menu");
        var icon = document.querySelector(".menu-icon");
        if (window.innerWidth > 768) {
            if (menu) menu.style.cssText = "";
            if (icon) icon.remove();
            document.body.style.overflow = "";
        } else if (!document.querySelector(".menu-icon")) {
            makeMenu();
        }
    });

    var headerDiv = document.querySelector("header");
    if (headerDiv) {
        window.addEventListener("scroll", function() {
            var y = window.pageYOffset;
            if (y > 80) {
                headerDiv.style.background = "rgba(255,255,255,0.98)";
                headerDiv.style.backdropFilter = "blur(15px)";
                headerDiv.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                headerDiv.style.padding = "8px 0";
            } else {
                headerDiv.style.background = "#FFFFFF";
                headerDiv.style.backdropFilter = "none";
                headerDiv.style.boxShadow = "0 2px 15px rgba(0,0,0,0.05)";
                headerDiv.style.padding = "15px 0";
            }
        });
    }
var allCards = document.querySelectorAll(".service-card-premium, .service-card, .team-card, .testimonial-card, .shop-card, .blog-card, .gallery-item-horizontal, .exp-card, .feature-box");
    
    for (var a = 0; a < allCards.length; a++) {
        allCards[a].style.opacity = "0";
        allCards[a].style.transform = "translateY(30px)";
        allCards[a].style.transition = "opacity 0.5s ease, transform 0.5s ease";
        allCards[a].style.transitionDelay = (a * 0.03) + "s";
    }
    
    var scrollObserver = new IntersectionObserver(function(items) {
        for (var b = 0; b < items.length; b++) {
            if (items[b].isIntersecting) {
                items[b].target.style.opacity = "1";
                items[b].target.style.transform = "translateY(0)";
                scrollObserver.unobserve(items[b].target);
            }
        }
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    
    for (var c = 0; c < allCards.length; c++) {
        scrollObserver.observe(allCards[c]);
    }

    // فرم 1: رزرو سریع در صفحه اصلی
    var quickReserveForm = document.querySelector(".quick-reserve-form form");
    if (quickReserveForm) {
        quickReserveForm.addEventListener("submit", function(e) {
            e.preventDefault();
            var nameInput = this.querySelector('input[type="text"]');
            var phoneInput = this.querySelector('input[type="tel"]');
            var dateInput = this.querySelector('input[type="date"]');
            var timeInput = this.querySelector('input[type="time"]');
            var serviceSelect = this.querySelector('select');
            var isValid = true;
            var errorMessage = "";
            if (!nameInput || nameInput.value.trim() === "") {
                isValid = false;
                errorMessage = "لطفاً نام و نام خانوادگی را وارد کنید";
                if (nameInput) { nameInput.style.borderColor = "red"; }
            } else if (!phoneInput || phoneInput.value.trim() === "") {
                isValid = false;
                errorMessage = "لطفاً شماره تماس را وارد کنید";
                if (phoneInput) { phoneInput.style.borderColor = "red"; }
            } else if (phoneInput && phoneInput.value.trim().length < 10) {
                isValid = false;
                errorMessage = "شماره تماس معتبر نیست (حداقل 10 رقم)";
                phoneInput.style.borderColor = "red";
            } else if (!dateInput || dateInput.value === "") {
                isValid = false;
                errorMessage = "لطفاً تاریخ مورد نظر را انتخاب کنید";
                if (dateInput) { dateInput.style.borderColor = "red"; }
            } else if (!timeInput || timeInput.value === "") {
                isValid = false;
                errorMessage = "لطفاً ساعت مورد نظر را انتخاب کنید";
                if (timeInput) { timeInput.style.borderColor = "red"; }
            } else if (!serviceSelect || serviceSelect.value === "" || serviceSelect.value === "انتخاب خدمت مورد نظر") {
                isValid = false;
                errorMessage = "لطفاً یک خدمت را انتخاب کنید";
                if (serviceSelect) { serviceSelect.style.borderColor = "red"; }
            }
            if (isValid) {
                var successMsg = document.createElement("div");
                successMsg.style.cssText = "position:fixed; top:100px; left:50%; transform:translateX(-50%); background:#4CAF50; color:white; padding:15px 30px; border-radius:50px; z-index:10000; font-weight:bold;";
                successMsg.innerHTML = "✅ نوبت شما با موفقیت رزرو شد!";
                document.body.appendChild(successMsg);
                setTimeout(function() { successMsg.remove(); }, 3000);
                this.reset();
            } else {
                var errorMsg = document.createElement("div");
errorMsg.style.cssText = "position:fixed; top:100px; left:50%; transform:translateX(-50%); background:#f44336; color:white; padding:15px 30px; border-radius:50px; z-index:10000; font-weight:bold;";
                errorMsg.innerHTML = "❌ " + errorMessage;
                document.body.appendChild(errorMsg);
                setTimeout(function() { errorMsg.remove(); }, 3000);
            }
        });
        var formInputs = quickReserveForm.querySelectorAll("input, select");
        for (var d = 0; d < formInputs.length; d++) {
            formInputs[d].addEventListener("input", function() {
                this.style.borderColor = "";
            });
        }
    }

    // فرم 2: رزرو نوبت در صفحه reserve.html
    var reservePageForm = document.querySelector(".reserve-full-form form");
    if (reservePageForm) {
        reservePageForm.addEventListener("submit", function(e) {
            e.preventDefault();
            var nameInput = this.querySelector('input[type="text"]');
            var phoneInput = this.querySelector('input[type="tel"]');
            var emailInput = this.querySelector('input[type="email"]');
            var dateInput = this.querySelector('input[type="date"]');
            var timeInput = this.querySelector('input[type="time"]');
            var serviceSelect = this.querySelector('select');
            var isValid = true;
            var errorMessage = "";
            if (!nameInput || nameInput.value.trim() === "") {
                isValid = false;
                errorMessage = "لطفاً نام و نام خانوادگی را وارد کنید";
                if (nameInput) { nameInput.style.borderColor = "red"; }
            } else if (!phoneInput || phoneInput.value.trim() === "") {
                isValid = false;
                errorMessage = "لطفاً شماره تماس را وارد کنید";
                if (phoneInput) { phoneInput.style.borderColor = "red"; }
            } else if (phoneInput && phoneInput.value.trim().length < 10) {
                isValid = false;
                errorMessage = "شماره تماس معتبر نیست";
                phoneInput.style.borderColor = "red";
            } else if (emailInput && emailInput.value.trim() !== "" && emailInput.value.indexOf("@") === -1) {
                isValid = false;
                errorMessage = "لطفاً ایمیل معتبر وارد کنید";
                emailInput.style.borderColor = "red";
            } else if (!dateInput || dateInput.value === "") {
                isValid = false;
                errorMessage = "لطفاً تاریخ مورد نظر را انتخاب کنید";
                if (dateInput) { dateInput.style.borderColor = "red"; }
            } else if (!timeInput || timeInput.value === "") {
                isValid = false;
                errorMessage = "لطفاً ساعت مورد نظر را انتخاب کنید";
                if (timeInput) { timeInput.style.borderColor = "red"; }
            } else if (!serviceSelect || serviceSelect.value === "" || serviceSelect.value === "لطفا یک گزینه را انتخاب کنید") {
                isValid = false;
                errorMessage = "لطفاً یک خدمت را انتخاب کنید";
                if (serviceSelect) { serviceSelect.style.borderColor = "red"; }
            }
            if (isValid) {
                var successMsg = document.createElement("div");
                successMsg.style.cssText = "position:fixed; top:100px; left:50%; transform:translateX(-50%); background:#4CAF50; color:white; padding:15px 30px; border-radius:50px; z-index:10000; font-weight:bold;";
                successMsg.innerHTML = "✅ درخواست نوبت شما ثبت شد!";
                document.body.appendChild(successMsg);
                setTimeout(function() { successMsg.remove(); }, 3000);
                this.reset();
            } else {
                var errorMsg = document.createElement("div");
                errorMsg.style.cssText = "position:fixed; top:100px; left:50%; transform:translateX(-50%); background:#f44336; color:white; padding:15px 30px; border-radius:50px; z-index:10000; font-weight:bold;";
errorMsg.innerHTML = "❌ " + errorMessage;
                document.body.appendChild(errorMsg);
                setTimeout(function() { errorMsg.remove(); }, 3000);
            }
        });
        var reserveInputs = reservePageForm.querySelectorAll("input, select");
        for (var e = 0; e < reserveInputs.length; e++) {
            reserveInputs[e].addEventListener("input", function() {
                this.style.borderColor = "";
            });
        }
    }

    // فرم 3: تماس با ما در صفحه contact.html
    var contactForm = document.querySelector(".contact-form-box form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            var nameInput = this.querySelector('input[type="text"]');
            var emailInput = this.querySelector('input[type="email"]');
            var phoneInput = this.querySelector('input[type="tel"]');
            var subjectSelect = this.querySelector('select');
            var messageTextarea = this.querySelector('textarea');
            var isValid = true;
            var errorMessage = "";
            if (!nameInput || nameInput.value.trim() === "") {
                isValid = false;
                errorMessage = "لطفاً نام و نام خانوادگی را وارد کنید";
                if (nameInput) { nameInput.style.borderColor = "red"; }
            } else if (!emailInput || emailInput.value.trim() === "") {
                isValid = false;
                errorMessage = "لطفاً آدرس ایمیل را وارد کنید";
                if (emailInput) { emailInput.style.borderColor = "red"; }
            } else if (emailInput && emailInput.value.indexOf("@") === -1) {
                isValid = false;
                errorMessage = "لطفاً ایمیل معتبر وارد کنید";
                emailInput.style.borderColor = "red";
            } else if (!phoneInput || phoneInput.value.trim() === "") {
                isValid = false;
                errorMessage = "لطفاً شماره تماس را وارد کنید";
                if (phoneInput) { phoneInput.style.borderColor = "red"; }
            } else if (phoneInput && phoneInput.value.trim().length < 10) {
                isValid = false;
                errorMessage = "شماره تماس معتبر نیست";
                phoneInput.style.borderColor = "red";
            } else if (!subjectSelect || subjectSelect.value === "" || subjectSelect.value === "انتخاب موضوع") {
                isValid = false;
                errorMessage = "لطفاً موضوع پیام را انتخاب کنید";
                if (subjectSelect) { subjectSelect.style.borderColor = "red"; }
            } else if (!messageTextarea || messageTextarea.value.trim() === "") {
                isValid = false;
                errorMessage = "لطفاً پیام خود را وارد کنید";
                if (messageTextarea) { messageTextarea.style.borderColor = "red"; }
            }
            if (isValid) {
                var successMsg = document.createElement("div");
                successMsg.style.cssText = "position:fixed; top:100px; left:50%; transform:translateX(-50%); background:#4CAF50; color:white; padding:15px 30px; border-radius:50px; z-index:10000; font-weight:bold;";
                successMsg.innerHTML = "✅ پیام شما با موفقیت ارسال شد!";
                document.body.appendChild(successMsg);
                setTimeout(function() { successMsg.remove(); }, 3000);
                this.reset();
            } else {
                var errorMsg = document.createElement("div");
                errorMsg.style.cssText = "position:fixed; top:100px; left:50%; transform:translateX(-50%); background:#f44336; color:white; padding:15px 30px; border-radius:50px; z-index:10000; font-weight:bold;";
                errorMsg.innerHTML = "❌ " + errorMessage;
                document.body.appendChild(errorMsg);
setTimeout(function() { errorMsg.remove(); }, 3000);
            }
        });
        var contactInputs = contactForm.querySelectorAll("input, select, textarea");
        for (var f = 0; f < contactInputs.length; f++) {
            contactInputs[f].addEventListener("input", function() {
                this.style.borderColor = "";
            });
        }
    }

    var topBtn = document.createElement("div");
    topBtn.innerHTML = "↑";
    topBtn.style.cssText = "position:fixed; bottom:30px; right:30px; width:52px; height:52px; background:linear-gradient(135deg,#C45B6E,#A84558); color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; opacity:0; visibility:hidden; transition:all 0.3s; z-index:999; font-size:26px; font-weight:bold;";
    document.body.appendChild(topBtn);
    
    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 500) {
            topBtn.style.opacity = "1";
            topBtn.style.visibility = "visible";
        } else {
            topBtn.style.opacity = "0";
            topBtn.style.visibility = "hidden";
        }
    });
    
    topBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    
    topBtn.addEventListener("mouseenter", function() {
        topBtn.style.transform = "scale(1.15)";
    });
    
    topBtn.addEventListener("mouseleave", function() {
        topBtn.style.transform = "scale(1)";
    });

    var allImages = document.querySelectorAll(".gallery-item-horizontal img, .gallery-item-large img, .gallery-item-small img");
    if (allImages.length > 0) {
        var bigBox = document.createElement("div");
        bigBox.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:5000; display:flex; align-items:center; justify-content:center; opacity:0; visibility:hidden; transition:0.3s; cursor:pointer;";
        var bigImg = document.createElement("img");
        bigImg.style.cssText = "max-width:90%; max-height:90%; object-fit:contain; border-radius:12px;";
        bigBox.appendChild(bigImg);
        document.body.appendChild(bigBox);
        for (var g = 0; g < allImages.length; g++) {
            allImages[g].style.cursor = "pointer";
            allImages[g].addEventListener("click", function(e) {
                e.stopPropagation();
                bigImg.src = this.src;
                bigBox.style.opacity = "1";
                bigBox.style.visibility = "visible";
                document.body.style.overflow = "hidden";
            });
        }
        bigBox.addEventListener("click", function() {
            bigBox.style.opacity = "0";
            bigBox.style.visibility = "hidden";
            document.body.style.overflow = "";
        });
    }

    var heroBg = document.querySelector(".hero-section");
    if (heroBg) {
        window.addEventListener("scroll", function() {
            var move = window.pageYOffset * 0.35;
            heroBg.style.backgroundPositionY = move + "px";
        });
    }

    var allHrefs = document.querySelectorAll("a[href^='#']");
    for (var h = 0; h < allHrefs.length; h++) {
        allHrefs[h].addEventListener("click", function(e) {
            e.preventDefault();
            var targetName = this.getAttribute("href");
            if (targetName && targetName !== "#") {
                var targetElem = document.querySelector(targetName);
                if (targetElem) {
                    targetElem.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    }

    console.log("سالن زیبایی دلارا با موفقیت بارگذاری شد");

});

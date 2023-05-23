const changeButton = document.querySelector('.change-button');

const changeTheme=function() {
    var r = document.querySelector(':root');
    r.style.setProperty('--background','#fff');
    r.style.setProperty('--color-background', '#FFCBB3');
    r.style.setProperty('--text','#000');
    var rs = getComputedStyle(r);
    changeButton.addEventListener('click', function() {
        if (rs.getPropertyValue('--background') == '#fff') {
            r.style.setProperty('--background','#000');
            r.style.setProperty('--color-background', '#E69795');
            r.style.setProperty('--text','#fff');
            
        } else {
            r.style.setProperty('--background','#fff');
            r.style.setProperty('--color-background','#FFCBB3');
            r.style.setProperty('--text','#000');
        }
        
    });
}

changeTheme();


const rainButton = document.querySelector(".rain-button");

const rainOpen = function () {
    rainButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        if (window.innerWidth >= 800) {
            const rain = document.querySelector(".rain");
            rain.classList.add("rain_open");
            rain.classList.add("rain_animation");
        }
    })
}

rainOpen();

const rain = document.querySelector(".rain");

const rainStop = function () {
    window.addEventListener('resize', function () {
        if (rain.classList.contains("rain_open")) {
            rain.classList.toggle("rain_animation");
        }
    })
}

rainStop();

const rainClose = function () {
    rain.addEventListener('click', function () {
        if (rain.classList.contains("rain_open")) {
            rain.classList.remove("rain_open");
        }
    })
}

rainClose();





const check=function(){
    const forms=document.querySelectorAll('.form');
    
    forms.forEach(element => {
        validation(element);
    });
    // document.f
    const buttons=document.querySelectorAll('button[type="submit"]');
    buttons.forEach((button)=>{
        button.addEventListener('click',async function(){
            button.innerHTML="Отправляем";
            button.style.color="red";
            button.disabled=true;
            let response = await fetch('https://jsonplaceholder.typicode.com/posts',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    title:"test.title",
                    body:"test.body"
                })
            });
            if (response.ok) {
            button.innerHTML="Отправлено";
            button.style.color="black";
            button.disabled=false;
            } else {
             button.innerHTML="Ошибка";  
             button.style.color="black";
            button.disabled=false; 
            alert("Ошибка HTTP: " + response.status);
            }
            return false;
        });
    });
}
const validation=function (form){
    const button=form.querySelector('button[type="submit"]');
    const inputs=form.querySelectorAll('input');
    inputs.forEach((input)=>{
        input.addEventListener('input',function(){
            console.log("work");
            isvalid(form, input);
            buttonValid(inputs, button);
        });
    });

}
const buttonValid=function(inputs,button){
    let b=true;
    inputs.forEach((input)=>{
        if(!input.validity.valid){
            b=false;
        }
    });
    if(b){
        button.disabled=false;
    }else{
        button.disabled=true;
    }
}
const isvalid=function(form,input){
    if(input.id){
        if(!input.validity.valid){
            showError(form,input,input.validationMessage);
        } else if (!checklanguage(input.value.replace(/\s/g))){
            showError(form,input,"Invalid Language");
        } else {
            notShowError(form,input);
        }
    }
}

const checklanguage=function(text){
    let value=/^[a-zA-Z0-9.@]+$/;
    if (value.test(text)==true){
        return true;
    } else {
        return false;
    }
}


const showError=function(form,input, error){
    console.log(error);
    input.classList.add('error');
    let span=form.querySelector(`.${input.id}-error`);
    span.textContent=error;
    span.style.opacity=1;
    span.classList.add('span-error');
}
const notShowError=function(form,input){
    console.log('ok');
    let span=form.querySelector(`.${input.id}-error`);
    input.classList.remove('error');
    span.style.opacity=0;
    span.textContent="";
    span.classList.remove('span-error');

}

check();


const popup=function(){
    let openLink = document.querySelectorAll(".form_modal");
    let oPopup = document.querySelector(".form__popup-bg");
    openLink.forEach((button) => {
	    button.addEventListener('click', function(evt){
		    let formID = evt.target.getAttribute('href');
            console.log("sdasdas");
		    document.querySelector(formID).classList.add("form__popup_active");
		    oPopup.classList.add("form__popup-bg_active");
	    });
    });
    document.addEventListener('click', function(evt){
        if(evt.target == oPopup){
            console.log("dfsdfsdf")
            oPopup.classList.remove("form__popup-bg_active");
            oPopup.querySelectorAll('.popup').forEach((popupItem) => {
                popupItem.classList.remove("form__popup_active");
            });
        }
    });

}

popup();








const opacityButtonsnext=function(list,button){
    if(!list.nextElementSibling){
        button.classList.add("gallery__button-nonactive");
    }else{
        button.classList.remove("gallery__button-nonactive");
    }
}
const opacityButtonsprev=function(list,button){
    if(!list.previousElementSibling){
        button.classList.add("gallery__button-nonactive");
    }else{
        button.classList.remove("gallery__button-nonactive");
    }
}

const popupGallery=function(){
    let openLink = document.querySelectorAll('.gallery__modal');
    let oPopup = document.querySelector(".gallery__popup-bg");
    openLink.forEach((button) => {
	    button.addEventListener('click', function(evt){
		    let formID = evt.currentTarget.getAttribute('href');
            let srcImg=evt.target.getAttribute('src');
            let altImg=evt.target.getAttribute('alt');
            let image=document.querySelector(".popup_image");
            image.innerHTML=`<img class="class_1" src="${srcImg}" alt="${altImg}" style="width:100%">`;
            let list=button.parentElement;
            const prev=document.querySelector('.prev');
            const next=document.querySelector('.next');
            opacityButtonsnext(list, next);
            opacityButtonsprev(list, prev);
            next.addEventListener('click',function() {
                if(list.nextElementSibling){
                    list=list.nextElementSibling;
                    srcImg=list.firstElementChild.firstElementChild.getAttribute('src');
                    altImg=list.firstElementChild.firstElementChild.getAttribute('alt');
                    image.innerHTML=`<img class="class_1" src="${srcImg}" alt="${altImg}" style="width:100%">`;
                    console.log(altImg);
                    opacityButtonsnext(list, next);
                    opacityButtonsprev(list, prev);
                }
            });
            prev.addEventListener('click',function() {
                if(list.previousElementSibling){
                    list=list.previousElementSibling;
                    srcImg=list.firstElementChild.firstElementChild.getAttribute('src');
                    altImg=list.firstElementChild.firstElementChild.getAttribute('alt');
                    image.innerHTML=`<img class="class_1" src="${srcImg}" alt="${altImg}" style="width:100%">`;
                    console.log(altImg);
                    opacityButtonsnext(list, next);
                    opacityButtonsprev(list, prev);
                }
            });
            

            console.log(list);
		    document.querySelector(formID).classList.add("gallery__popup_active");
		    oPopup.classList.add("gallery__popup-bg_active");
	    });
    });

    document.addEventListener('click', function(evt){
        if (evt.target == oPopup){
            oPopup.classList.remove("gallery__popup-bg_active");
            oPopup.querySelectorAll('.popup').forEach((popupItem) => {
                popupItem.classList.remove("gallery__popup_active");
            });
        }
    });

}


popupGallery();




const popupTimeout=async function(){
    console.log(localStorage.getItem("popup"));
    if(localStorage.getItem("popup")==null){
        await new Promise(resolve => setTimeout(function(){
    let oPopup = document.querySelector(".time__popup-bg");
	document.querySelector(".time__popup").classList.add("time__popup_active");
	oPopup.classList.add("time__popup-bg_active");
    document.addEventListener('click', function(evt){
        if(evt.target == oPopup){
            localStorage.setItem("popup","true");
            oPopup.classList.remove("time__popup-bg_active");
            oPopup.querySelector('.time__popup').remove("time__popup_active");
        }
    });
    }, 3000));
    }
}
popupTimeout();

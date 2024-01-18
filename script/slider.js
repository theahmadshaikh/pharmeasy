function initSlider()
{
    const slideButtons = document.querySelectorAll(".first-slider .slider-wrapper .slide-button")
    const labSlideButtons = document.querySelectorAll(".labtest .slider-wrapper .slide-button")
    const categorySlideButtons = document.querySelectorAll(".category .slider-wrapper .slide-button")
    const imageList = document.querySelector(".slider-wrapper .image-list")
    const labeTestImageList = document.querySelector(".labtest .slider-wrapper .image-list")
    const categoryImageList = document.querySelector(".category .slider-wrapper .image-list")
    
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    const labTestMaxScrollLeft = labeTestImageList.scrollWidth - labeTestImageList.clientWidth;
    const categoryMaxScrollLeft = categoryImageList.scrollWidth - categoryImageList.clientWidth;
    
    const sliderScrollbar = document.querySelector(".slider-container .slider-scrollbar");
    const scrollBarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    slideButtons.forEach(function(button){
        button.addEventListener('click',function(){
            const direction = button.id=="prev-slide"?-1:1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({left:scrollAmount,behavior:"smooth"})
        })
    })
    labSlideButtons.forEach(function(button){
        button.addEventListener('click',function(){
            const direction = button.id=="prev-slide"?-1:1;
            const scrollAmount = labeTestImageList.clientWidth * direction;
            labeTestImageList.scrollBy({left:scrollAmount,behavior:"smooth"})
        })
    })
    categorySlideButtons.forEach(function(button){
        button.addEventListener('click',function(){
            const direction = button.id=="prev-slide"?-1:1;
            const scrollAmount = categoryImageList.clientWidth * direction;
            categoryImageList.scrollBy({left:scrollAmount,behavior:"smooth"})
        })
    })
    
    
    function handleSlideButtons(){
        slideButtons[0].style.display = imageList.scrollLeft <=0 ? "none":"block";
        slideButtons[1].style.display = imageList.scrollLeft >=maxScrollLeft ?"none":"block"
    }
    function handleLabTestSlideButtons(){
        labSlideButtons[0].style.display = labeTestImageList.scrollLeft <=0 ? "none":"block";
        labSlideButtons[1].style.display = labeTestImageList.scrollLeft >=labTestMaxScrollLeft ?"none":"block"
    }
    function handleCategorySlideButtons(){
        categorySlideButtons[0].style.display = categoryImageList.scrollLeft <=0 ? "none":"block";
        categorySlideButtons[1].style.display = categoryImageList.scrollLeft >=categoryMaxScrollLeft ?"none":"block"
    }
    function updateScrollThumbPosition(){
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition/maxScrollLeft)*(sliderScrollbar.clientWidth-scrollBarThumb.offsetWidth);
        scrollBarThumb.style.left = `${thumbPosition}px`
    }
    
    imageList.addEventListener('scroll', 
    function(){
    handleSlideButtons();
    updateScrollThumbPosition();
    
})
labeTestImageList.addEventListener('scroll',function(){
    handleLabTestSlideButtons();
})
categoryImageList.addEventListener('scroll',function(){
    handleCategorySlideButtons();   
})
}
window.addEventListener('load',initSlider)
function initSlider()
{
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button")
    const imageList = document.querySelector(".slider-wrapper .image-list")
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    const sliderScrollbar = document.querySelector(".slider-container .slider-scrollbar");
    const scrollBarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    slideButtons.forEach(function(button){
        button.addEventListener('click',function(){
            const direction = button.id=="prev-slide"?-1:1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({left:scrollAmount,behavior:"smooth"})
        })
    })
    function handleSlideButtons(){
        slideButtons[0].style.display = imageList.scrollLeft <=0 ? "none":"block";
        slideButtons[1].style.display = imageList.scrollLeft >=maxScrollLeft ?"none":"block"
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
}
window.addEventListener('load',initSlider)
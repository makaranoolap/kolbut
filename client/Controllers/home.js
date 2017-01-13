Template.home.helpers({
	getSlider:function(){
		var result = slider.find();
		console.log(result.count());
		return result;
	},
	activeClass:function(index){
		if(index == 0){
			return 'active';
		}
	}
})
Template.home.rendered = function(){
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        parallax: true,
        speed: 600,
    });
}
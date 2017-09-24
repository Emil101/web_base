var $wrapper = $(".wrapper");
var analytics = $("#analytics");
var referal = $("#referal");

var playadmin = function () {

	/*Sidebar Collapse Animation*/
	var sidebarNavCollapse = $('.fixed-sidebar-left .side-nav  li .collapse');
	var sidebarNavAnchor = '.fixed-sidebar-left .side-nav  li a';
	$(document).on("click", sidebarNavAnchor, function (e) {
		if ($(this).attr('aria-expanded') === "false")
			$(this).blur();
		$(sidebarNavCollapse).not($(this).parent().parent()).collapse('hide');
	});

	/*Panel Remove*/
	$(document).on('click', '.close-panel', function (e) {
		var effect = $(this).data('effect');
		$(this).closest('.card')[effect]();
		return false;
	});

	/*Accordion js*/
	$(document).on('show.bs.collapse', '.card-collapse', function (e) {
		$(this).siblings('.card-heading').addClass('activestate');
	});

	$(document).on('hide.bs.collapse', '.card-collapse', function (e) {
		$(this).siblings('.card-heading').removeClass('activestate');
	});

	/*Sidebar Navigation*/
	$(document).on('click', '#toggle_nav_btn', function (e) {
		$(".dropdown.open > .dropdown-toggle").dropdown("toggle");
		return false;
	});

	$(document).on('click', '#toggle_nav_btn', function (e) {
		$wrapper.removeClass('open-right-sidebar open-setting-panel').toggleClass('slide-nav-toggle');
		return false;
	});

	/*Slimscroll*/
	$('.nicescroll-bar').slimscroll({
		height: '100%',
		color: '#878787',
		disableFadeOut: true,
		borderRadius: 0,
		size: '4px',
		alwaysVisible: false
	});

	/*Nav Tab Responsive Js*/
	$(document).on('show.bs.tab', '.nav-tabs-responsive [data-toggle="tab"]', function (e) {
		var $target = $(e.target);
		var $tabs = $target.closest('.nav-tabs-responsive');
		var $current = $target.closest('li');
		var $parent = $current.closest('li.dropdown');
		$current = $parent.length > 0 ? $parent : $current;
		var $next = $current.next();
		var $prev = $current.prev();
		$tabs.find('>li').removeClass('next prev');
		$prev.addClass('prev');
		$next.addClass('next');
		return;
	});

	var testimonial_carousel = $('.testimonials-carousel').slick({
		dots: true,
		mobileFirst: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: true,
		fade: true,
		cssEase: 'linear',
		responsive: [{
			breakpoint: 1299,
			settings: {
				arrows: false,
				dots: true
			}
		}]
	});
	var property_carousel = $('.property-carousel').slick({
		mobileFirst: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: true,
		arrows: false,
		dots: true,
		adaptiveHeight: true,
		responsive: [{
			breakpoint: 991,
			settings: {
				slidesToShow: 3
			}
		}, {
			breakpoint: 767,
			settings: {
				slidesToShow: 2
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 1
			}
		}]
	});
	var widgetForm = $('#widget-form').submit(function(e){
		e.preventDefault();
		form = $(this);
		url  = form.attr('action');
		submit_form('widget-form',url,'wig-msg',false,function(data){
			var jsonObj = data;
			var status 	= jsonObj.status;
			var message = jsonObj.message;
			if (status == 'success') {
				$("#wig-msg").html(message)
				AutoRefresh(1000);
			}
		});
	});
	var Ckeditor = $('.ckeditor').ckeditor();
};

"use strict";
$(document).ready(function () {
	playadmin();
});
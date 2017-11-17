/* Table of content
1. scroll-based animations
2. show certain character in Description - jQuery dotdotdot 1.8.3
3. fix all title the same height
4. Dropdown-list for Product detail page
5. Sticky navigation
6. Smooth scroll for links
7. fancyBox v3.0.47
8. Show more
9. Thumnail carousel - Owl Carousel v2.2.1
10. Divide content into 2 columns - jQuery columnizer 1.6.0
*/

;jQuery(function($) {
  var windowWidth, windowHeight;
  windowWidth = $(window).width(),
  windowHeight = $(window).height();
  
  $(document).ready(function() {
    if(windowWidth <= 480){
      accorToggle("#footer-section", ".footer-title", ".footer-info");
    } 
    if(windowWidth > 767){
      menuHover();
      tickyMenu();
      lazyLoad();
      twoColumns();
    } 
    if(windowWidth < 768){
      menuToggle();
    } 
    if(windowWidth < 1340 && windowWidth >= 768){
      // fixSeachbar();
    }

    // $(window).on('load', function () {
    //   $(".status").fadeOut();
    //   $(".preloader").delay(100).fadeOut(300);
    // });

    window.onresize = function(event) {
      if(windowWidth >= 768){
        itemPerBlock = 3;
      }else{
        itemPerBlock = 2;
      }
      blocks = sliceBlock(arr, itemPerBlock);
      setEqualHeightBlock(blocks);

      if(windowWidth <= 480){
        accorToggle("#footer-section", ".footer-title", ".footer-info");
      }
      if(windowWidth > 767){
        menuHover();
        tickyMenu();
        lazyLoad();
      }
      if(windowWidth < 768){
        menuToggle();
      }
      if(windowWidth < 1340 && windowWidth >= 768){
        // fixSeachbar();
      }
    };

    if($(".testimonial-block").length){
      $(".testimonial-block .quote-txt").each(function(index, el) {
        if(index % 2){
          $(this).addClass('right');
        }
      });
    }

    function fixSeachbar(){
      var searchBar = $("#search-frm .form-control");
      $("#search-frm .btn-search").on("click mouseenter", function(e){ 
          e.preventDefault();
          searchBar.addClass('center-block').focus();
      });

      // click outside the search bar to close it
      $(document).click(function(event) { 
        if(!$(event.target).closest('#search-frm').length) {
          if(searchBar.hasClass("center-block")){
            searchBar.removeClass("center-block");
          }
        }        
      });
    }

    /*-----------------------------------------
    MENUHOVER - submenu place outside main menu (duplicate HTML as result of full-width menu)
    ------------------------------------------*/
    function menuHover(){
      var tmrMenu, idCurrentEl, subMenu = $(".custom-submenu");
      $("#site-navigation .menu-item").mouseenter(function() {
        $("#site-navigation .menu-item").removeClass('is-hover');
      });
      $("#site-navigation .menu-item-has-children").on({
        mouseenter: function(event) {
          $(this).addClass('is-hover');
          clearTimeout(tmrMenu);
          subMenu.addClass("is-active");
          idCurrentEl = $(this).attr("id");
          $(".custom-submenu .primary-menu > li").hide();
          $(".custom-submenu ." + idCurrentEl).show();
        }, mouseleave: function(event) {
          var $this =  $(this);
          tmrMenu = setTimeout(function() {
            $this.removeClass('is-hover');
            console.log($this);
            subMenu.removeClass("is-active");
          }, 100);
        }
      });

      subMenu.on('mouseenter', function(e) {
          clearTimeout(tmrMenu);
        }).on('mouseleave', function(e) {
          $(this).removeClass("is-active");
          $("#site-navigation .menu-item-has-children.is-hover").removeClass('is-hover');
        });
    }

    /*-----------------------------------------
    DIVIDE CONTENT INTO 2 COLUMNS
    https://welcome.totheinter.net/columnizer-jquery-plugin/
    ------------------------------------------*/
    function twoColumns(){
      if($(".info-section .two-columns")){
        $(".info-section .two-columns").columnize({ 
          columns: 2,
          lastNeverTallest: true,
          buildOnce:true 
        });
      } 
    }
   
    /*-----------------------------------------
    MENU ICON FOR MOBILE
    ------------------------------------------*/
    function menuToggle(){
      var wrapperEl = $(".wrapper"),
        menuItems = $("#menu-header-menu").find('li');

      $(".menu-item-has-children").prepend('<i class="icon-toggle"/>');
      sequentialTransition(menuItems);

      $("#menu-toggle").on("click", function(){
        $(this).toggleClass('toggled-on');
        $("#site-header-menu").toggleClass('toggled-on');
        if( !wrapperEl.attr('style')){
          wrapperEl.css({
            '-webkit-transform': 'translateX(-300px)',
            '-moz-transform': 'translateX(-300px)',
            'transform': 'translateX(-300px)'
          });
        }else{
          wrapperEl.css('transform', '');
        }
      });

      $(".current-menu-item .icon-toggle").addClass('is-active');
      accorToggle("#menu-header-menu", ".icon-toggle", ".sub-menu");
    }
    
    function sequentialTransition(el){
      el.each(function() {
        var $this = $(this);
        $this.css({
          '-webkit-transition-delay': $this.index() / 15 + 's',
          '-moz-transition-delay': $this.index() / 15 + 's',
          'transition-delay': $this.index() / 15 + 's'
        });
      });
    }

    function accorToggle(wrapperEl, titleEl, contentEl, openFirstEl){
      $(wrapperEl).on("click tap", titleEl, function(){
          if($(this).hasClass("is-active")){
              $(this).removeClass("is-active").parent().find(contentEl).slideUp(500);
          }else{
              $(wrapperEl + " " +contentEl).hide();
              $(wrapperEl + " " +titleEl).removeClass("is-active");
              $(this).addClass("is-active").parent().find(contentEl).slideDown(500);
          }
      });
      if(openFirstEl){
        $(wrapperEl + " " +titleEl).eq(0).click();
      }
    }
    /*-----------------------------------------
    SCROLL-BASED ANIMATIONS
    ------------------------------------------*/
    function lazyLoad(){
      $.fn.isInViewport = function() {
          var elementTop = $(this).offset().top;
          var elementBottom = elementTop + $(this).height();

          var viewportTop = $(window).scrollTop();
          var viewportBottom = viewportTop + $(window).height();

          return elementBottom > viewportTop && elementTop <= viewportBottom;
      };

      function isInCurrentViewport (el) {
        //special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
      }

      // Make the elements in the viewport will be displayed without animation
      $('.animation').each(function(index, el){
        if (isInCurrentViewport($(this))) {
          var $this = $(this);
          $this.removeClass('animation').addClass('animated');
        }
      })

      $(window).on('scroll resize', function() {
        $('.animation').each(function(){
          if ($(this).isInViewport()) {
              $(this).addClass('is-visible');
          }
        });
      });
    }

    /*-----------------------------------------
    SHOW CERTAIN CHARACTER IN DESCRIPTION - jQuery dotdotdot 1.8.3
    ------------------------------------------*/
    $(".intro-block .content p").dotdotdot({
      /*  Whether to update the ellipsis: true/'window' */
      watch: true
    });

    /*-----------------------------------------
    FIX ALL TITLE THE SAME HEIGHT
    ------------------------------------------*/
    var arr, blocks;
    if(windowWidth >= 768){
      arr = $(".intro-section .intro-title"),
        itemPerBlock = 3;
      blocks = sliceBlock(arr, itemPerBlock);
      setEqualHeightBlock(blocks);
    }else{
      arr = $(".contact .intro-title"),
        itemPerBlock = 3;
      blocks = sliceBlock(arr, itemPerBlock);
      setEqualHeightBlock(blocks);
    }
    
    /*-----------------------------------------
    DROPDOWN-LIST FOR PRODUCT DETAIL PAGE
    ------------------------------------------*/
    $(".document-section .dropdown-list").click(function(){
      $(this).toggleClass('is-active');
    });

    /*-----------------------------------------
    STICKY NAVIGATION
    ------------------------------------------*/   
    function tickyMenu(){
      var header = $(".header-section"),
        posHeader = $(".header-inner").offset().top;
      $(window).scroll(function() {
          var scroll = $(window).scrollTop();
          if (scroll >= 100) {
            header.addClass("sticky-nav");
          } else {
            header.removeClass("sticky-nav");
          }
      });
    }

    /*-----------------------------------------
    SMOOTH SCROLL FOR LINKS
    ------------------------------------------*/
    if($('.smooth-scroll').length){
      $('.smooth-scroll').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        var target = this.hash;
        var marginTarget = parseInt($(target).css("margin-top"), 10);;
        var posTop = $(target).offset().top;
        $('html, body').stop().animate({
            'scrollTop': ( posTop - 62 - marginTarget)
        }, 500, 'swing');
      });
    }
    
    /*-----------------------------------------
    fancyBox v3.0.47
    ------------------------------------------*/
    if($('[data-fancybox]').length){
      var $instance = $(".has-fancybox[data-fancybox]").fancybox();
      $('.video-fancybox [data-fancybox]').fancybox({
        // thumbs : {
        //   showOnStart : true
        // },
        // youtube : {
        //   controls : 0,
        //   showinfo : 0
        // }
      });
    }
    
    /*-----------------------------------------
    SHOW MORE - about.html
    ------------------------------------------*/
    if($(".btn-more").length){
      $(".btn-more").on("click", function(e){
        var $this = $(this);
        $this.prev(".small-txt").stop().slideToggle("slow");
        $this.text($this.text().trim().toLowerCase() == 'läs mer' ? "läs mindre" : "läs mer");
        e.preventDefault();
      });
    }

    /*-----------------------------------------
    Thumnail carousel - Owl Carousel v2.2.1 - product-detail.html
    ------------------------------------------*/
    if($(".slider-section").length){
      var $sync1 = $(".main-carousel"),
          $sync2 = $(".thumbs-carousel"),
          flag = false,
          duration = 300;

      $sync1
        .owlCarousel({
          items: 1,
          nav: true,
          dots: false,
          // navText: ["<div class='next'></div>","<div class='prev'></div>"]
        })
        .on('changed.owl.carousel', function (e) {
          if (!flag) {
            flag = true;
            $sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
            flag = false;
          }
        });

      $sync2
        .owlCarousel({
          margin: 20,
          items: 4,
          nav: true,
          dots: false
        })
        .on('click', '.owl-item', function () {
          $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
        })
        .on('changed.owl.carousel', function (e) {
          if (!flag) {
            flag = true;    
            $sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
            flag = false;
          }
        });
    }
    
  });
  

  function setEqualHeightBlock( blocks ){
   var totalBlocks = blocks.length;
   for( var i = 0; i<totalBlocks; i++ ){
     maxHeight = getMaxHeight(blocks[i]);
     setHeight( blocks[i], maxHeight);
   }
  }

  function sliceBlock(arr, itemPerBlock){
   var totalItems = arr.length;
   var block=[];
   var slicedBlock = [];
   for(var i=0; i<totalItems; i++){
     block.push(arr[i]);
     // check item is end of block or not
     if (i> 0 && ((i + 1)%itemPerBlock == 0 || i + 1==totalItems )){          
         slicedBlock.push(block);
         block = [];
     }      
   }
   return slicedBlock;  
  }
   
  function getMaxHeight(arr){
    var maxHeight = 0;
    $.each(arr, function( index, element ) {
      $(element).css('height', '');
      maxHeight = Math.max(maxHeight, $(element).height());
    });
    return maxHeight;
  }

  function setHeight( arr, newHeight){
    $.each(arr, function( index, element ) {
      $(element).height(newHeight);
    });
  }
});

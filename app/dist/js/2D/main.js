!function t(e,i,n){function o(r,a){if(!i[r]){if(!e[r]){var u="function"==typeof require&&require;if(!a&&u)return u(r,!0);if(s)return s(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var c=i[r]={exports:{}};e[r][0].call(c.exports,function(t){var i=e[r][1][t];return o(i?i:t)},c,c.exports,t,e,i,n)}return i[r].exports}for(var s="function"==typeof require&&require,r=0;r<n.length;r++)o(n[r]);return o}({1:[function(t){(function(e){"use strict";t("./polyfills/animFramePolyfill"),t("./polyfills/bindPolyfill"),t("./polyfills/indexOfPolyfill");var i="undefined"!=typeof window?window.jQuery:"undefined"!=typeof e?e.jQuery:null,n="undefined"!=typeof window?window.skrollr:"undefined"!=typeof e?e.skrollr:null;t("./libs/waypointLib");var o=t("./modules/hashModule"),s=t("./classes/LoaderClass"),r=t("./objects2D/LoaderObject2D"),a=t("./objects2D/HelpObject2D"),u=t("./objects2D/menuObject2D"),l=t("./objects2D/WireframeObject2D");i(function(){var t=new r,e=new s(["../app/public/img/part-beam.png","../app/public/img/part-drop.png","../app/public/img/part-sphere.png","../app/public/img/part-grid.png","../app/public/img/part-field.png","../app/public/img/part-stars.png"]);e.onProgress(function(e){t.update(e)}),e.start(),o.replacePlaceholders();var c=(new a,u());c.onClick(function(){}),n.init();var f=new l($(".wireframe")),d=i(".tails"),p=d.find(".tails__section"),h=p.waypoint({offset:30,startAt:d.offset().top-1e3});h.start(),p.on("active",function(){var t=i(this);return t.attr("data-appeared")?!1:(i(this).find(".tails__section__el").each(function(t){i(this).stop().delay(100*t).animate({opacity:1,y:0},500)}),void t.attr("data-appeared",!0))}),i(".tails__section--site").on("stateChange",function(t,e){"active"===e?(f.start(),f.in()):f.stop()}),e.onComplete(function(){t.out(),setTimeout(function(){c.in()},1500)})})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./classes/LoaderClass":2,"./libs/waypointLib":4,"./modules/hashModule":5,"./objects2D/HelpObject2D":6,"./objects2D/LoaderObject2D":9,"./objects2D/WireframeObject2D":11,"./objects2D/menuObject2D":12,"./polyfills/animFramePolyfill":13,"./polyfills/bindPolyfill":14,"./polyfills/indexOfPolyfill":15}],2:[function(t,e){"use strict";function i(t){this.images=t||[],this.total=this.images.length,this.progress=function(){},this.complete=function(){}}i.prototype.start=function(){function t(){i++;var t=100*i/e.total;e.progress(t),i===e.total&&e.complete()}for(var e=this,i=0,n=0;n<this.total;n++){var o=new Image;o.src=this.images[n],o.onload=o.onerror=t}},i.prototype.onProgress=function(t){this.progress=t},i.prototype.onComplete=function(t){this.complete=t},e.exports=i},{}],3:[function(t,e){(function(i){"use strict";function n(t){this.$el=t,this.$container=this.$el.find(".slider__slides"),this.$slides=this.$container.find(".slider__slide"),this.$map=this.$el.find(".slider__map"),this.totalSlides=this.$slides.length,this.slideWidth=100/this.totalSlides,this.current=0,this.interval=null,this.$container.css("width",100*this.totalSlides+"%"),this.onResize=null;var e=this,i=o('<div class="slider__map__node">');this.$nodes=o(),this.$slides.each(function(t){var n=o(this);n.css({width:e.slideWidth+"%",left:t*e.slideWidth+"%"});var s=i.clone();0===t&&(n.addClass("is-active"),s.addClass("is-active")),e.$nodes=e.$nodes.add(s)}),this.$map.html(this.$nodes),this.onResize=function(){var t=0;this.$slides.each(function(){var e=o(this).height();e>t&&(t=e)}),t+=10,this.$el.css({height:t,marginTop:-(t/2)})}.bind(this),this.onResize()}var o="undefined"!=typeof window?window.jQuery:"undefined"!=typeof i?i.jQuery:null;t("jquery.transit"),n.prototype.next=function(){this.current++,this.current>=this.totalSlides&&(this.current=0),this.goTo(this.current)},n.prototype.prev=function(){this.current--,this.current<=0&&(this.current=this.totalSlides),this.goTo(this.current)},n.prototype.goTo=function(t){var e=-(100*t)+"%";this.updateMap(t),this.$container.stop().animate({left:e},500),this.$slides.removeClass("is-active"),o(this.$slides[t]).addClass("is-active")},n.prototype.updateMap=function(t){this.$nodes.removeClass("is-active"),o(this.$nodes[t]).addClass("is-active")},n.prototype.start=function(){this.$nodes.on("click",function(){var e=o(this).index();t.goTo(e)});var t=this;this.interval=window.setInterval(function(){t.next()},1e4),this.$el.on({mouseenter:function(){window.clearInterval(t.interval)},mouseleave:function(){t.interval=window.setInterval(function(){t.next()},1e4)}}),o(window).on("resize",this.onResize),this.onResize()},n.prototype.stop=function(){this.$nodes.off("click"),this.$el.off("mouseenter mouseleave"),o(window).off("resize",this.onResize),window.clearInterval(this.interval)},e.exports=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"jquery.transit":17}],4:[function(t,e){(function(i){"use strict";var n="undefined"!=typeof window?window.jQuery:"undefined"!=typeof i?i.jQuery:null,o=t("../utils/debounceUtil");e.exports=function(t){t.fn.waypoint=function(e){function i(){a.each(function(){var e=t(this),i=parseInt(e.outerHeight()),n=s?parseInt(e.position().top)+c:parseInt(e.offset().top);e.attr({"data-height":i,"data-top":n})})}function n(){l=u.height(),f=l*(r.offset/100),i(),t(this).trigger("scroll")}var s=e.$viewport?!0:!1,r=t.extend({$viewport:t(window),offset:0,startAt:null},e),a=t(this),u=r.$viewport,l=u.height(),c=u.scrollTop(),f=l*(r.offset/100),d=o(function(){if(c=t(this).scrollTop(),r.startAt&&c<r.startAt)return!1;var e=c+f,i=c+(l-f);a.each(function(){var n=t(this),o=n.attr("data-state"),r=parseInt(n.attr("data-height"))||n.outerHeight(),a=s?parseInt(n.attr("data-top"))+1||n.position().top+1:parseInt(n.attr("data-top"))+1||n.offset().top+1,u=a+r;a>e&&i>a||u>e&&i>u||e>a&&u>i?o||(n.attr("data-state","visible"),n.trigger("active"),n.trigger("stateChange","active")):o&&(n.attr("data-state",null),n.trigger("inactive"),n.trigger("stateChange","inactive"))})},20);return{start:function(){t(window).on("resize",n),u.on("scroll",d),i(),d()},stop:function(){t(window).off("resize",n),u.off("scroll",d)}}}}(n)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils/debounceUtil":16}],5:[function(t,e){(function(t){"use strict";var i="undefined"!=typeof window?window.jQuery:"undefined"!=typeof t?t.jQuery:null,n=n||function(){function t(){function t(){return window.location.hash.split("#")[1]}function e(t){var e;return e=t&&n[t]?n[t]:""}var n={akqa:"AKQA",eli:"Eli",hki:"HKI",malguy:"Malguy",mediamonks:"Media Monks",soleilnoir:"Soleil Noir",thread:"Thread",ultranoir:"Ultra Noir"},o=t(),s=e(o);return{hash:o,agency:s,replacePlaceholders:function(){var t=i(".placeholder--agency");t.each(function(){var t=i(this);t.html(t.hasClass("placeholder--agency--you")?""!==s?s:"you":t.hasClass("placeholder--agency--capital")?s.toUpperCase():s)});var e=i(".placeholder--email"),n=o?"?subject=Hi from "+s:"?subject=Hi",r=o?"&body=Hi V, we like your work and would love to meet you.":"&body=Hi V";e.attr("href",["mailto:valentin.marmonier@gmail.com",n,r].join(""))}}}var e=null;return{getInstance:function(){return e||(e=t()),e}}}();e.exports=n.getInstance()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],6:[function(t,e){(function(i){"use strict";function n(){this.$el=o(".help"),this.slider=new s(this.$el.find(".slider")),this.keys=new u(this.$el.find(".keys")),this.mouse=new a(this.$el.find(".mouse")),this.layout=new r(this.$el.find(".layout"))}var o="undefined"!=typeof window?window.jQuery:"undefined"!=typeof i?i.jQuery:null,s=t("../libs/sliderLib"),r=t("../objects2D/LayoutObject2D"),a=t("../objects2D/MouseObject2D"),u=t("../objects2D/KeysObject2D");n.prototype.in=function(){var t=this;this.$el.css({display:"block",opacity:0}),this.slider.start(),this.slider.$el.delay(100).css({top:"60%",opacity:0}).animate({top:"50%",opacity:1},500),this.$el.stop().animate({opacity:.9},500,function(){t.keys.start(),t.mouse.start(),t.layout.start()}),this.$el.on("click",function(e){e.target===this&&t.out()}),this.$el.find(".help__quit").on("click",function(){t.out()})},n.prototype.out=function(){var t=this;this.$el.stop().animate({opacity:0},500,function(){t.$el.css("display","none"),t.slider.stop(),t.keys.stop(),t.mouse.stop(),t.layout.stop()}),this.$el.off("click"),this.$el.find(".help__quit").off("click")},e.exports=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../libs/sliderLib":3,"../objects2D/KeysObject2D":7,"../objects2D/LayoutObject2D":8,"../objects2D/MouseObject2D":10}],7:[function(t,e){(function(t){"use strict";function i(t){this.$el=t,this.$top=this.$el.find(".key--top"),this.$bottom=this.$el.find(".key--bottom"),this.interval=null,this.current="top"}"undefined"!=typeof window?window.jQuery:"undefined"!=typeof t?t.jQuery:null;i.prototype.highlight=function(){this.current="top"===this.current?"bottom":"top";var t="top"===this.current?this.$top:this.$bottom;t.stop().animate({opacity:1},400,function(){t.stop().animate({opacity:.2},300)})},i.prototype.start=function(){var t=this;this.interval=window.setInterval(function(){t.highlight()},1e3)},i.prototype.stop=function(){window.clearInterval(this.interval)},e.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(t,e){(function(t){"use strict";function i(t){this.$el=t,this.$container=this.$el.find(".layout__parts"),this.$mouse=this.$el.find(".layout__mouse"),this.$click=this.$mouse.find(".layout__mouse__click"),this.y=0,this.openY=-15,this.mouseY=90,this.interval=null}"undefined"!=typeof window?window.jQuery:"undefined"!=typeof t?t.jQuery:null;i.prototype.slide=function(){function t(){var t=!1;s.$mouse.animate({top:s.mouseY+"%"},{duration:500,progress:function(i,n){!t&&n>.5&&(t=!t,e())}})}function e(){s.$container.animate({top:s.openY+"%"},800,function(){i()})}function i(){var t=!1;s.$click.delay(500).animate({width:70,height:70,"margin-left":-35,"margin-top":-35,opacity:0},{duration:400,progress:function(e,i){!t&&i>.7&&(t=!t,n())},complete:function(){s.$click.css({width:0,height:0,"margin-left":0,"margin-top":0,opacity:1})}})}function n(){s.$container.animate({top:s.y+"%"},500),o()}function o(){s.$mouse.delay(300).animate({top:"45%"},500)}0===this.y?(this.y=-100,this.openY=-15,this.mouseY=83):(this.y=0,this.openY=-85,this.mouseY=3);var s=this;t()},i.prototype.start=function(){var t=this;t.slide(),this.interval=window.setInterval(function(){t.slide()},4e3)},i.prototype.stop=function(){window.clearInterval(this.interval)},e.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],9:[function(t,e){(function(t){"use strict";function i(){this.$el=n(".loader"),this.$title=this.$el.find(".loader__title"),this.$progress=this.$el.find(".loader__progress")}var n="undefined"!=typeof window?window.jQuery:"undefined"!=typeof t?t.jQuery:null;i.prototype.out=function(){var t=this;this.$progress.stop().animate({width:"100%"},1e3,function(){t.$el.animate({opacity:0},1e3,function(){t.$el.css("display","none")}),t.$title.animate({top:"-10%",opacity:0},500),t.$progress.animate({height:0},400)})},i.prototype.update=function(){},e.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],10:[function(t,e){(function(t){"use strict";function i(t){this.$el=t,this.$wheel=this.$el.find(".mouse__wheel"),this.$lines=this.$wheel.find(".mouse__wheel__lines"),this.interval=null,this.y=0}"undefined"!=typeof window?window.jQuery:"undefined"!=typeof t?t.jQuery:null;i.prototype.scroll=function(){this.y=0===this.y?-80:0;var t=this;this.$wheel.stop().animate({opacity:1},400),this.$lines.stop().animate({top:t.y+"%"},500,function(){t.$wheel.stop().animate({opacity:.2},300)})},i.prototype.start=function(){var t=this;this.interval=window.setInterval(function(){t.scroll()},2e3)},i.prototype.stop=function(){window.clearInterval(this.interval)},e.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],11:[function(t,e){(function(t){"use strict";function i(t,e){this.parameters=n.extend({delay:200,positions:[-20,-90,-135,-200,-20,40]},e),this.$topLines=t.find(".wireframe__frame--top"),this.$bottomLines=t.find(".wireframe__frame--bottom"),this.$leftLines=t.find(".wireframe__frame--left"),this.$rightLines=t.find(".wireframe__frame--right"),this.$leftColumn=t.find(".wireframe__column--left"),this.$textLines=t.find(".wireframe__text__line"),this.$controlNodes=t.find(".wireframe__controls__node"),this.interval=null,this.totalPositions=this.parameters.positions.length,this.currentPosition=0}var n="undefined"!=typeof window?window.jQuery:"undefined"!=typeof t?t.jQuery:null;i.prototype.in=function(t){function e(t){var e=n(a.$topLines[t]),o=n(a.$bottomLines[t]),s=n(a.$leftLines[t]),r=n(a.$rightLines[t]);setTimeout(function(){e.css("width",i),r.css("height",i)},t*a.parameters.delay+400),setTimeout(function(){s.css("height",i),o.css("width",i)},t*a.parameters.delay+600)}var i,o,s,r,a=this;0===t?(i=o=s=0,r=30):(i=o="100%",s="60%",r=0);for(var u=this.$topLines.length,l=0;u>l;l++)e(l);this.$textLines.each(function(t){var e=n(this);setTimeout(function(){e.css("width",e.hasClass("wireframe__text__line--incomplete")?s:o)},t*a.parameters.delay)}),this.$controlNodes.each(function(t){var e=n(this);setTimeout(function(){e.css("top",r)},t*a.parameters.delay)})},i.prototype.out=function(){this.$topLines.css("width",0),this.$bottomLines.css("width",0),this.$leftLines.css("height",0),this.$rightLines.css("height",0),this.$textLines.css("width",0),this.$controlNodes.css("top",30)},i.prototype.start=function(){function t(){e.currentPosition>e.totalPositions&&(e.currentPosition=0),e.$leftColumn.css("top",e.parameters.positions[e.currentPosition]+"px"),e.currentPosition++}if(this.interval)return!1;var e=this;this.interval=setInterval(t,2e3)},i.prototype.stop=function(){return this.interval?(window.clearInterval(this.interval),void(this.interval=null)):!1},e.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],12:[function(t,e){(function(t){"use strict";function i(){function t(){r.on("click",a),s.css("display","block"),i.stop().animate({left:0},{duration:400,easing:"easeOutQuart"}),o.stop().animate({opacity:0},400),r.each(function(t){var e=n(this),i=window.setTimeout(function(){e.stop().animate({opacity:1},400)},200*t);u.push(i)}),i.one("mouseleave",e)}function e(){if(u){for(var e=0,n=u.length;n>e;e++)window.clearTimeout(u[e]);u=[]}i.stop().animate({left:30},{duration:400,easing:"easeOutQuart"}),o.stop().animate({opacity:.5},400),r.stop().animate({opacity:0},400,function(){s.css("display","none"),r.off("click",a)}),o.one("mouseover click",t)}var i=n(".menu"),o=i.find(".menu__button"),s=i.find(".menu__items"),r=i.find(".menu__item"),a=(r.length-1,function(){}),u=[];return o.one("mouseover click",t),{"in":function(){i.animate({top:0,opacity:1},500)},onClick:function(t){a=t}}}var n="undefined"!=typeof window?window.jQuery:"undefined"!=typeof t?t.jQuery:null;e.exports=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],13:[function(){"use strict";!function(){for(var t=0,e=["ms","moz","webkit","o"],i=0;i<e.length&&!window.requestAnimationFrame;++i)window.requestAnimationFrame=window[e[i]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[i]+"CancelAnimationFrame"]||window[e[i]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e){var i=(new Date).getTime(),n=Math.max(0,16-(i-t)),o=window.setTimeout(function(){e(i+n)},n);return t=i+n,o}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}()},{}],14:[function(){"use strict";!function(){Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),i=this,n=function(){},o=function(){return i.apply(this instanceof n&&t?this:t,e.concat(Array.prototype.slice.call(arguments)))};return n.prototype=this.prototype,o.prototype=new n,o})}()},{}],15:[function(){"use strict";!function(){Array.prototype.indexOf||(Array.prototype.indexOf=function(t){if(null==this)throw new TypeError;var e=Object(this),i=e.length>>>0;if(0===i)return-1;var n=0;if(arguments.length>1&&(n=Number(arguments[1]),n!=n?n=0:0!=n&&1/0!=n&&n!=-1/0&&(n=(n>0||-1)*Math.floor(Math.abs(n)))),n>=i)return-1;for(var o=n>=0?n:Math.max(i-Math.abs(n),0);i>o;o++)if(o in e&&e[o]===t)return o;return-1})}()},{}],16:[function(t,e){"use strict";function i(t,e,i){var n;return function(){var o=this,s=arguments,r=function(){n=null,i||t.apply(o,s)},a=i&&!n;window.clearTimeout(n),n=window.setTimeout(r,e),a&&t.apply(o,s)}}e.exports=i},{}],17:[function(t,e,i){(function(t){!function(n,o){"function"==typeof define&&define.amd?define(["jquery"],o):"object"==typeof i?e.exports=o("undefined"!=typeof window?window.jQuery:"undefined"!=typeof t?t.jQuery:null):o(n.jQuery)}(this,function(t){function e(t){if(t in f.style)return t;for(var e=["Moz","Webkit","O","ms"],i=t.charAt(0).toUpperCase()+t.substr(1),n=0;n<e.length;++n){var o=e[n]+i;if(o in f.style)return o}}function i(){return f.style[d.transform]="",f.style[d.transform]="rotateY(90deg)",""!==f.style[d.transform]}function n(t){return"string"==typeof t&&this.parse(t),this}function o(t,e,i){e===!0?t.queue(i):e?t.queue(e,i):t.each(function(){i.call(this)})}function s(e){var i=[];return t.each(e,function(e){e=t.camelCase(e),e=t.transit.propertyMap[e]||t.cssProps[e]||e,e=u(e),d[e]&&(e=u(d[e])),-1===t.inArray(e,i)&&i.push(e)}),i}function r(e,i,n,o){var r=s(e);t.cssEase[n]&&(n=t.cssEase[n]);var a=""+c(i)+" "+n;parseInt(o,10)>0&&(a+=" "+c(o));var u=[];return t.each(r,function(t,e){u.push(e+" "+a)}),u.join(", ")}function a(e,i){i||(t.cssNumber[e]=!0),t.transit.propertyMap[e]=d.transform,t.cssHooks[e]={get:function(i){var n=t(i).css("transit:transform");return n.get(e)},set:function(i,n){var o=t(i).css("transit:transform");o.setFromString(e,n),t(i).css({"transit:transform":o})}}}function u(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function l(t,e){return"string"!=typeof t||t.match(/^[\-0-9\.]+$/)?""+t+e:t}function c(e){var i=e;return"string"!=typeof i||i.match(/^[\-0-9\.]+/)||(i=t.fx.speeds[i]||t.fx.speeds._default),l(i,"ms")}t.transit={version:"0.9.12",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:!0,useTransitionEnd:!1};var f=document.createElement("div"),d={},p=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;d.transition=e("transition"),d.transitionDelay=e("transitionDelay"),d.transform=e("transform"),d.transformOrigin=e("transformOrigin"),d.filter=e("Filter"),d.transform3d=i();var h={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"},y=d.transitionEnd=h[d.transition]||null;for(var m in d)d.hasOwnProperty(m)&&"undefined"==typeof t.support[m]&&(t.support[m]=d[m]);return f=null,t.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeInCubic:"cubic-bezier(.550,.055,.675,.190)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"},t.cssHooks["transit:transform"]={get:function(e){return t(e).data("transform")||new n},set:function(e,i){var o=i;o instanceof n||(o=new n(o)),e.style[d.transform]="WebkitTransform"!==d.transform||p?o.toString():o.toString(!0),t(e).data("transform",o)}},t.cssHooks.transform={set:t.cssHooks["transit:transform"].set},t.cssHooks.filter={get:function(t){return t.style[d.filter]},set:function(t,e){t.style[d.filter]=e}},t.fn.jquery<"1.8"&&(t.cssHooks.transformOrigin={get:function(t){return t.style[d.transformOrigin]},set:function(t,e){t.style[d.transformOrigin]=e}},t.cssHooks.transition={get:function(t){return t.style[d.transition]},set:function(t,e){t.style[d.transition]=e}}),a("scale"),a("scaleX"),a("scaleY"),a("translate"),a("rotate"),a("rotateX"),a("rotateY"),a("rotate3d"),a("perspective"),a("skewX"),a("skewY"),a("x",!0),a("y",!0),n.prototype={setFromString:function(t,e){var i="string"==typeof e?e.split(","):e.constructor===Array?e:[e];i.unshift(t),n.prototype.set.apply(this,i)},set:function(t){var e=Array.prototype.slice.apply(arguments,[1]);this.setter[t]?this.setter[t].apply(this,e):this[t]=e.join(",")},get:function(t){return this.getter[t]?this.getter[t].apply(this):this[t]||0},setter:{rotate:function(t){this.rotate=l(t,"deg")},rotateX:function(t){this.rotateX=l(t,"deg")},rotateY:function(t){this.rotateY=l(t,"deg")},scale:function(t,e){void 0===e&&(e=t),this.scale=t+","+e},skewX:function(t){this.skewX=l(t,"deg")},skewY:function(t){this.skewY=l(t,"deg")},perspective:function(t){this.perspective=l(t,"px")},x:function(t){this.set("translate",t,null)},y:function(t){this.set("translate",null,t)},translate:function(t,e){void 0===this._translateX&&(this._translateX=0),void 0===this._translateY&&(this._translateY=0),null!==t&&void 0!==t&&(this._translateX=l(t,"px")),null!==e&&void 0!==e&&(this._translateY=l(e,"px")),this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var t=(this.scale||"1,1").split(",");return t[0]&&(t[0]=parseFloat(t[0])),t[1]&&(t[1]=parseFloat(t[1])),t[0]===t[1]?t[0]:t},rotate3d:function(){for(var t=(this.rotate3d||"0,0,0,0deg").split(","),e=0;3>=e;++e)t[e]&&(t[e]=parseFloat(t[e]));return t[3]&&(t[3]=l(t[3],"deg")),t}},parse:function(t){var e=this;t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,i,n){e.setFromString(i,n)})},toString:function(t){var e=[];for(var i in this)if(this.hasOwnProperty(i)){if(!d.transform3d&&("rotateX"===i||"rotateY"===i||"perspective"===i||"transformOrigin"===i))continue;"_"!==i[0]&&e.push(t&&"scale"===i?i+"3d("+this[i]+",1)":t&&"translate"===i?i+"3d("+this[i]+",0)":i+"("+this[i]+")")}return e.join(" ")}},t.fn.transition=t.fn.transit=function(e,i,n,s){var a=this,u=0,l=!0,f=t.extend(!0,{},e);"function"==typeof i&&(s=i,i=void 0),"object"==typeof i&&(n=i.easing,u=i.delay||0,l="undefined"==typeof i.queue?!0:i.queue,s=i.complete,i=i.duration),"function"==typeof n&&(s=n,n=void 0),"undefined"!=typeof f.easing&&(n=f.easing,delete f.easing),"undefined"!=typeof f.duration&&(i=f.duration,delete f.duration),"undefined"!=typeof f.complete&&(s=f.complete,delete f.complete),"undefined"!=typeof f.queue&&(l=f.queue,delete f.queue),"undefined"!=typeof f.delay&&(u=f.delay,delete f.delay),"undefined"==typeof i&&(i=t.fx.speeds._default),"undefined"==typeof n&&(n=t.cssEase._default),i=c(i);var p=r(f,i,n,u),h=t.transit.enabled&&d.transition,m=h?parseInt(i,10)+parseInt(u,10):0;if(0===m){var w=function(t){a.css(f),s&&s.apply(a),t&&t()};return o(a,l,w),a}var g={},v=function(e){var i=!1,n=function(){i&&a.unbind(y,n),m>0&&a.each(function(){this.style[d.transition]=g[this]||null}),"function"==typeof s&&s.apply(a),"function"==typeof e&&e()};m>0&&y&&t.transit.useTransitionEnd?(i=!0,a.bind(y,n)):window.setTimeout(n,m),a.each(function(){m>0&&(this.style[d.transition]=p),t(this).css(f)})},b=function(t){this.offsetWidth,v(t)};return o(a,l,b),this},t.transit.getTransitionValue=r,t})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);
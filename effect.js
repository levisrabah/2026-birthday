$(window).on('load', function(){
	$('.loading').fadeOut('fast');
	$('.container.main-stage').fadeIn('fast');
});

$(document).ready(function(){
	var wished = false;

	function positionBalloonsRow(duration) {
		var winW = $(window).width();
		var isMobile = winW < 600;
		var balloonW = isMobile ? (winW < 420 ? 44 : 52) : 86;
		var maxSpread = Math.min(winW - balloonW - 12, 640);
		var step = maxSpread / 6;
		var startLeft = (winW - maxSpread - balloonW) / 2;
		var targetTop = isMobile ? 96 : 148;

		var ids = ['#b11', '#b22', '#b33', '#b44', '#b55', '#b66', '#b77'];
		for (var idx = 0; idx < ids.length; idx++) {
			$(ids[idx]).stop().animate({
				top: targetTop,
				left: Math.round(startLeft + (step * idx))
			}, duration);
		}
	}

	$(window).resize(function(){
		if (wished) {
			positionBalloonsRow(300);
		}
	});

	$('#turn_on').click(function(){
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$('.portrait-frame').fadeIn(1500);
		$(this).fadeOut('slow').delay(4000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});

	$('#play').click(function(){
		var audio = $('.song')[0];
		audio.play();
		$('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('background-color', '#FFF');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');
		});
	});

	function flyBalloon(selector) {
		if (wished) return;
		var maxLeft = Math.max(40, $(window).width() - 90);
		var maxBottom = Math.max(120, $(window).height() - 180);
		var randleft = Math.floor(maxLeft * Math.random());
		var randbottom = Math.floor(maxBottom * Math.random());
		$(selector).animate({ left: randleft, bottom: randbottom }, 9000, function(){
			flyBalloon(selector);
		});
	}

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({ top: -500 }, 8000);
		$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');

		flyBalloon('#b1');
		flyBalloon('#b2');
		flyBalloon('#b3');
		flyBalloon('#b4');
		flyBalloon('#b5');
		flyBalloon('#b6');
		flyBalloon('#b7');

		$(this).fadeOut('slow').delay(4500).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});

	$('#cake_fadein').click(function(){
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(2500).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').delay(1500).promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

	$('#wish_message').click(function(){
		wished = true;
		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop(true, false);
		$('#b1').attr('id','b11');
		$('#b2').attr('id','b22');
		$('#b3').attr('id','b33');
		$('#b4').attr('id','b44');
		$('#b5').attr('id','b55');
		$('#b6').attr('id','b66');
		$('#b7').attr('id','b77');

		$('.balloons').css({ 'bottom': 'auto', 'opacity': '0.95' });
		positionBalloonsRow(600);

		$(this).fadeOut('slow').delay(2500).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});

	$('#story').click(function(){
		$(this).fadeOut('slow');
		$('.cake-cover').fadeOut('fast').promise().done(function(){
			$('.message').fadeIn('slow');
		});

		var $bubbles = $('.sms-bubble');
		var $typing = $('#sms_typing');
		var $body = $('#sms_body');
		var idx = 0;

		function showNextBubble() {
			if (idx >= $bubbles.length) {
				$typing.hide();
				setTimeout(function() {
					$('.cake-cover').fadeIn('slow');
				}, 1200);
				return;
			}

			$typing.css('display', 'inline-flex');
			$body.scrollTop($body[0].scrollHeight);

			setTimeout(function() {
				$typing.hide();
				$bubbles.eq(idx).fadeIn(350);
				$body.scrollTop($body[0].scrollHeight);
				idx++;
				setTimeout(showNextBubble, 1300);
			}, 900);
		}

		setTimeout(showNextBubble, 500);
	});
});

function screenshots()
{
	$(document).ready(function(){
		if(navigator.userAgent.match(/(iPhone|iPad|iPod)/))
		{
			function ios_memory_image_limit_workaround()
			{
				$('.images img').each(function(){
					$(this).css({'visibility':'hidden'});
				});
				$('.images img').load(function(){
					$(this).css({'visibility':'visible'});
					$(this).data('loaded','yes');
					$('#log').append(' loaded('+$(this).attr('src')+') ');
				});
				function reload_screenshot_images()
				{
					var imgs=$('.images img');
					var reloaded=false;
					for(var i=0;i<imgs.length;i++)
					{
						var img=imgs[i];
						if($(img).attr('src')==$(img).data('src'))
						{
							$(img).css({'visibility':'visible'});
							continue;
						}
						$(img).attr('src',$(img).data('src'));
						$(img).css({'visibility':'visible'});
						reloaded=true;
						break;
					}
					if(reloaded)
					{
						setTimeout(reload_screenshot_images,333);
					}
				}
				function check_screenshot_images()
				{
					$('.images img').each(function(){
						if($(this).data('loaded')=='yes'){return;}
						$(this).data('src',$(this).attr('src'));
						$(this).attr('src','data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
						setTimeout(reload_screenshot_images,333);
					});
				}
				setTimeout(check_screenshot_images,55);
				$('.images').bind('scroll',function(){
					check_screenshot_images();
				});
			}
			ios_memory_image_limit_workaround();
			$('.images').css({
				'height':$('.images').children().first().height()+10,
				'overflow-x':'scroll',
				'margin':'15px 15px 5px 15px',
				'-webkit-overflow-scrolling':'touch'
			});
			return(false);
		}
		function theme()
		{
			if(navigator.userAgent.match(/MSIE 8./))
			{
				return('light');
			}
			var color=$('body').css('background-color');
			var rgb=color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			var y=rgb[1]*0.299+rgb[2]*0.587+rgb[3]*0.114;
			return((y<55)?'light':'dark');
		}
		$('.images').mCustomScrollbar({
			set_width:false,
			set_height:$('.images').children().first().height()+20,
			horizontalScroll:true,
			verticalScroll:false,
			scrollInertia:222,
			mouseWheel:true,
			mouseWheelPixels:'auto',
			autoDraggerLength:true,
			autoHideScrollbar:false,
			scrollButtons:
			{
				enable:false
			},
			advanced:
			{
				updateOnBrowserResize:true,
				updateOnContentResize:false,
				autoExpandHorizontalScroll:false,
				autoExpandVerticalScroll:false,
				autoScrollOnFocus:true,
				normalizeMouseWheelDelta:false
			},
			contentTouchScroll:true,
			theme:theme() /*'light', 'dark', 'light-2', 'dark-2', 'light-thick', 'dark-thick', 'light-thin', 'dark-thin'*/
		});
	});
}

(function screenshots_wait_js(){
	if(typeof $==='undefined'){
		setTimeout(screenshots_wait_js,10);
		return;
	}
	if(typeof $({}).mCustomScrollbar==='undefined')
	{
		setTimeout(screenshots_wait_js,10);
		return;
	}
	screenshots();
})();

$(document).ready(function () {
	$('form').submit(function (event) {
		var json;
		var form = new FormData(this);
		event.preventDefault();
		$.ajax({
			type: $(this).attr('method'),
			url: $(this).attr('action'),
			data: form,
			dataType: 'json',
			contentType: false,
			cache: false,
			processData: false,
			success: function (json) {
				if (json.url) {
					window.location.href = json.url;
				}
				if (json.msg) {
					var bup;
					if (json.msg.duration) {
						bup = $(json.msg.elem).html();
					}
					$(json.msg.elem).html(json.msg.text);
					if (bup) {
						setTimeout(() => {
							$(json.msg.elem).html(bup);
						}, json.msg.duration);
					}
				} else {
					console.log(json);
				}
			},
		});
	});
});

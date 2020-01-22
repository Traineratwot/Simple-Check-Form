$(document).ready(function () {
	$('form').submit(function (event) {
		var json, bup;
		var form = this;
		var FormD = new FormData(form);
		event.preventDefault();
		$.ajax({
			type: $(form).attr('method'),
			url: $(form).attr('action'),
			data: FormD,
			dataType: "json",
			contentType: false,
			cache: false,
			processData: false,
			success: function (json) {
				if (json.url) {
					window.location.href = json.url;
				}
				if (json.msg) {

					if (json.msg.duration && !bup) {
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
				$(form)[0].reset();
			},
		});
	});
});
//return json_encode(['msg' => ['text' => 'Запрос отправлен', 'elem' => '#button_so', 'duration' => 1000]], 256);

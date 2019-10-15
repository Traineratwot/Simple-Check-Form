var $rule = {}
$rule.number = { 'regexp': /\d*/, 'name': 'число' }
$rule.date = { 'regexp': /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/, 'name': 'дата' }
$rule.float = { 'regexp': /\-?\d+(\.\d{0,})?/, 'name': 'дробное число' }
$rule.name = { 'regexp': /^[а-яА-ЯёЁa-zA-Z]+$/i, 'name': 'имя' }
$rule.email = { 'regexp': /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/i, 'name': 'email' }
$rule.phone = { 'regexp': /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/i, 'name': 'телефон' }

jQuery(document).ready(function($) {
    $("form button,form input[type='button'],input[type='submit']").on('click',
        function(t) {
            var test = true;
            var selecter
            if ($(this)[0].form) {
                selecter = $(this)[0].form
            } else if ($(this).attr('form')) {
                selecter = $('form[name=' + $(this).attr('form') + ']')
            } else {
                console.warn('где форма?')
                return true;
            }
            $(selecter).find('input[required]').each(function(index, element) {
                var x = $(element).val()
                if (x === false || x == '' || x == 'undefind') {
                    // console.log('X')
                    test = false
                    var tooltip = $('<span>', {
                        css: {
                            'width': 'fit - content',
                            'z-index': 9999,
                            'background': '#b5b5b5bd',
                            'color': '#20272F',
                            'padding': '5px',
                            'border-radius': '2px'
                        },
                        html: '<i class="fas fa-exclamation-circle" style="color:gold;"></i> Не заполнено поле'
                    }).appendTo('body');
                    $(tooltip).offset({
                        top: $(element).offset().top - $(element).height() - 7,
                        left: $(element).offset().left
                    })
                    $(tooltip).fadeOut(0).fadeIn(500)
                    setTimeout(() => {
                        $(tooltip).fadeOut(500)
                        setTimeout(() => {
                            $(tooltip).remove()
                        }, 500);
                    }, 2500);

                } else {
                    type = $(element).attr('data-type') ? $(element).attr('data-type') : $(element).attr('type')
                    pattern = $(element).attr('data-pattern') ? $(element).attr('data-pattern') : $(element).attr('pattern')
                    if ((type && $rule[type]) || pattern) {
                        var str = $(element).val()
                        test = false
                        if (type) {
                            var sr = $rule[type].regexp.exec(str)
                            if (sr !== null) {
                                test = true
                            }
                            if (!$rule[type].name) {
                                $rule[type].name = type
                            }
                        } else {
                            pattern = new RegExp(pattern, i)
                            var sr = pattern.exec(str)
                            if (sr !== null) {
                                test = true
                            }
                        }


                        if (!test) {
                            var name = $rule[type].name ? $rule[type].name : 'то что нужно'
                            var tooltip = $('<span>', {
                                css: {
                                    'width': 'fit - content',
                                    'z-index': 9999,
                                    'background': '#b5b5b5',
                                    'color': '#20272F',
                                    'padding': '5px',
                                    'border-radius': '2px'
                                },
                                html: '<i class="fas fa-exclamation-circle" style="color:gold;"></i> это не похоже на ' + name
                            }).appendTo('body');
                            $(tooltip).offset({
                                top: $(element).offset().top - $(element).height() - 7,
                                left: $(element).offset().left
                            })
                            $(tooltip).fadeOut(0).fadeIn(500)
                            setTimeout(() => {
                                $(tooltip).fadeOut(500)
                                setTimeout(() => {
                                    $(tooltip).remove()
                                }, 500);
                            }, 2500);
                        }
                    }
                }
            });
            if (test) {
                eval($(t.currentTarget).attr('data-click'))
            }
        }
    );
})

function autoGrow(...textarea) {
    console.log(textarea);
    [...textarea].forEach(function (e){
        e.style.height = "1px";
        e.style.height = (e.scrollHeight + 6)  + 'px';
    })
}
function fixedHeader(){
    let header = document.querySelector('header');
    let heightHeader = header.clientHeight;
    if(document.documentElement.scrollTop > heightHeader){
        document.body.style.paddingTop = heightHeader+'px';
        header.classList.add('fixed-header');
    }else{
        document.body.style.paddingTop = '';
        header.classList.remove('fixed-header');
    }
}
document.addEventListener('DOMContentLoaded', function(){
    fixedHeader();
    window.addEventListener('scroll', function () {
        fixedHeader();
    });
    window.addEventListener('resize', function() {
        fixedHeader();
    });

    $('form input:not(.js-custom-validation-inited), form textarea:not(.js-custom-validation-inited)')
        .filter(':not([type=submit])').filter(':not([type=reset])').filter(':not([type=button])').filter(':not([type=hidden])')
        .addClass('js-custom-validation-inited')
        .on('invalid blur', function (e) {
            e.preventDefault();
            if (e.type === 'blur') {
                this.checkValidity();
            }
            let mess = this.validationMessage;
            if (mess.startsWith('Адрес электронной почты должен содержать символ «@»')) {
                mess = 'Не верный формат';
            }
            if (mess) {
                $(this).parent().attr('data-field-error', mess);
            } else {
                $(this).parent().removeAttr('data-field-error');
            }
        })
        .on('input', function (e) {
            let $input = $(this);
            if( $(this).attr("type") == 'radio'){
                let inputName = $(this).attr("name");
                $input = $('input[name="'+inputName+'"');
            }
            $input.parent().removeAttr('data-field-error');
        })
    ;

    [...document.querySelectorAll('.js_phonemask')].forEach(function (e) {
        let params = {
            mask: [
                {
                    mask: '+7 (000) 000-00-00',
                    startsWith: '7',
                },
                {
                    mask: '0 (000) 000-00-00',
                    startsWith: '8',
                },
                {
                    mask: '+7 (000) 000-00-00',
                    startsWith: '',
                },
            ],
            dispatch: (appended, dynamicMasked) => {
                const number = (dynamicMasked.value + appended).replace(/\D/g, '');
                return dynamicMasked.compiledMasks.find(m => number.indexOf(m.startsWith) === 0);
            }
        }
        IMask(e, params)
    });

    [...document.querySelectorAll('textarea')].forEach(function (e){
        let textarea = e;
        textarea .addEventListener('input', function (){
            autoGrow(this);
        });
        window.addEventListener('resize', function() {
            autoGrow(textarea);
        });
    });

    [...document.querySelectorAll('.jsMenuModal')].forEach(function (menu){
        [...menu.querySelectorAll('.jsMenuModalDrop')].forEach(function (link){
            link.addEventListener('click', function (){
                console.log('pp');
                this.classList.toggle('open');
            })
        });
    });
    [...document.querySelectorAll('.jsShowMore')].forEach(function (e){
        e.addEventListener('click', function (){
            this.classList.toggle('open');
            this.parentElement.classList.toggle('open');
        })
    });



});

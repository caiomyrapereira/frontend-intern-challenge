(function(wind, doc) {

    'use strict';

    console.log('initialize!')

    const app = (function() {
        return {

            initialize: function() {
                this.initEvent();
            },

            initEvent: function() {
                this.get();
            },

            get: function get() {
                const ajax = new XMLHttpRequest();
                const arq = 'https://caiomyrapereira.github.io/frontend-intern-challenge//js/urls.json';
                ajax.open('GET', arq);
                ajax.send();
                ajax.addEventListener('readystatechange', this.response);
            },

            response: function response() {
                if (app.isRequestOk(this)) {
                    const data = JSON.parse(this.responseText);
                    app.top5(data);
                    app.totalHits(data);
                    app.encurtar(data);
                }
            },

            isRequestOk: function isRequestOk(ajax) {
                return ajax.readyState === 4 && ajax.status === 200;
            },

            top5: function top5(data) {
                const $links = doc.querySelectorAll('[data-js="links"]');
                const $hits = doc.querySelectorAll('[data-js="hits"]');
                const top5 = data.sort(function(a, b) {
                    return b.hits - a.hits;
                }).slice(0, 5);

                top5.forEach(function(elem, index) {
                    $links[index].innerHTML = elem.shortUrl;
                    $hits[index].innerHTML = app.formatarHits(elem.hits);
                })
            },

            totalHits: function totalHits(data) {
                const $total = doc.querySelector('[data-js="totalHits"]');
                $total.innerHTML = app.formatarHits(data.reduce(function(atual, acom) {
                    return atual + acom.hits;
                }, 0));
            },

            encurtar: function encurtar(data) {
                const $encurtar = doc.querySelector('[data-js="encurtar"]');
                const $close = doc.querySelector('[data-js="close"]');
                const $inputUrl = doc.querySelector('[data-js="inputUrl"]');
                $encurtar.addEventListener('click', function(e) {
                    e.preventDefault();
                    data.forEach((elem) => app.buttonClose(elem, $encurtar, $close, $inputUrl));
                    app.copyUrl($encurtar, $close, $inputUrl);
                })
            },

            buttonClose: function buttonClose(elem, $encurtar, $close, $inputUrl) {
                if (elem.url === $inputUrl.value) {
                    $inputUrl.value = elem.shortUrl;
                    $close.setAttribute('style', 'visibility:visible;');
                    $inputUrl.setAttribute('style', 'color:white;');
                    $inputUrl.setAttribute('disabled', 'true');

                    $close.addEventListener('click', function(e) {
                        e.preventDefault();
                        $close.setAttribute('style', 'visibility:collapse;');
                        $inputUrl.value = '';
                        $encurtar.innerHTML = 'Encutar';
                        $encurtar.setAttribute('data-js', 'Encutar');
                        $inputUrl.removeAttribute('disabled')
                        $inputUrl.setAttribute('style', 'color: #fe6f14;')
                    })
                }
            },

            copyUrl: function copyUrl($encurtar, $close, $inputUrl) {
                if ($close.style.visibility === 'visible') {
                    $encurtar.innerHTML = 'Copiar';
                    $encurtar.setAttribute('data-clipboard-text', $inputUrl.value);
                    $encurtar.setAttribute('data-js', 'copy');
                    const clipboard = new ClipboardJS('[data-js="copy"]');
                    clipboard.on('success', function(e) {
                        console.log("Texto copiado")
                    });
                }
            },

            formatarHits: function formatarHits(hits) {
                return hits.toLocaleString('pt-BR');
            }
        };
    })();

    app.initialize();

})(window, document)
(function(wind, doc) {

    'use strict';

    console.log('initialize!')

    const app = (function() {
        return {
            initialize: function() {
                this.initEvent();
            },
            initEvent: function() {
                const ajax = new XMLHttpRequest();
                const arq = '/Assets/urls.json';
                ajax.open('GET', arq);
                ajax.send();
                ajax.addEventListener('readystatechange', function() {

                    if (app.isRequestOk(this)) {
                        const data = JSON.parse(ajax.responseText);
                        console.log('requesição ok! \n' + data)
                        app.top5(data)
                        app.totalHits(data)
                    }

                }, false)
            },
            isRequestOk: function isRequestOk(ajax) {
                return ajax.readyState === 4 && ajax.status === 200;
            },
            top5: function top5(data) {
                const links = doc.querySelectorAll('[data-js="links"]');
                const hits = doc.querySelectorAll('[data-js="hits"]');
                const top5 = data.sort(function(a, b) {
                    return b.hits - a.hits;
                }).slice(0, 5);

                top5.forEach(function(elem, index) {
                    links[index].innerHTML = elem.shortUrl;
                    hits[index].innerHTML = app.formatarHits(elem.hits);
                })
            },
            totalHits: function totalHits(data) {
                const total = doc.querySelector('[data-js="totalHits"]');

                total.innerHTML = app.formatarHits(data.reduce(function(atual, acom) {
                    return atual + acom.hits;
                }, 0));
            },
            formatarHits: function formatarHits(hits) {
                return hits.toLocaleString('pt-BR');
            }

        };

    })();

    app.initialize();

})(window, document)
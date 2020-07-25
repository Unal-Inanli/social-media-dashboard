(function () {
    function ready(callbackFunction) {
        if (document.readyState != 'loading')
            callbackFunction(event)
        else
            document.addEventListener("DOMContentLoaded", callbackFunction)
    }
    ready(event => {
        var theme = window.localStorage.getItem('theme');
        var toggleCircle = document.getElementById('theme-circle');
        var toggleButton = document.getElementById('theme-toggle');


        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
            toggleCircle.classList.add(theme == 'light' ? 'theme-toggle__circle--inactive' : 'theme-toggle__circle--active')
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleCircle.classList.add('theme-toggle__circle--inactive')
        }

        function documentMeta() {
            this.rootElement = document.documentElement;
            this.userTheme = window.localStorage.getItem('theme') ? window.localStorage.getItem('theme') : null;
        }
        documentMeta.prototype.getRoot = function () {
            return this.rootElement;
        }
        documentMeta.prototype.getCurrent = function () {
            return this.rootElement.getAttribute('data-theme');
        }
        documentMeta.prototype.userTheme = function () {
            return this.userTheme;
        }
        documentMeta.prototype.switchTheme = function (theme) {
            this.rootElement.setAttribute('data-theme', theme);
            this.setUserTheme(theme);
        }
        documentMeta.prototype.setUserTheme = function (theme) {
            window.localStorage.setItem('theme', theme);
        }

        var DM = new documentMeta();

        toggleButton.addEventListener('click', function () {

            if (DM.getCurrent() === "dark") {
                DM.switchTheme('light');
                toggleCircle.classList.remove('theme-toggle__circle--active')
                toggleCircle.classList.add('theme-toggle__circle--inactive')
            } else {
                DM.switchTheme('dark');
                toggleCircle.classList.remove('theme-toggle__circle--inactive')
                toggleCircle.classList.add('theme-toggle__circle--active')
            }
        });


        var mainCounters = document.querySelectorAll('.social-media__card__main-counter');

        mainCounters.forEach(function (element) {
            var counterValue = parseInt(element.innerHTML);
            var interval = 25;
            var rate = parseInt(counterValue / (interval * 2));
            element.innerHTML = 0;


            var myInt = setInterval(function () {

                if (parseInt(element.innerHTML) < counterValue - rate) {
                    element.innerHTML = parseInt(element.innerHTML) + rate
                } else {
                    element.innerHTML = counterValue;
                    clearInterval(myInt);
                }
            }, interval)
        });


    })
})()
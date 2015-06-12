(function () {
        function getUrlVars() {
            var vars = [],
                hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = decodeURI(hash[1]);
            }
            return vars;
        }

        document.addEventListener("deviceready", function () {
            $("#headerSpan").text(getUrlVars()["produto"]);

            $('#button-confirmar').click(function () {
                sessionStorage.setItem("isPendencia", 0);
                var proposta = $("#proposta").val();
                var cpf = $("#cpf").val();
                window.location.href = 'documentos.html?produto=' + getUrlVars()["produto"] + '&proposta=' + proposta + '&cpf=' + cpf + '';
                return false;
            });

            /*app = new kendo.mobile.Application(document.body);
            window.app = app;*/
        }, false);

    }
    ());
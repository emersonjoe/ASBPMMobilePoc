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

        window.Documentos = {
            data: new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "../data/documentos.js",
                        type: "get",
                        dataType: "json"
                    }
                },
                schema: {
                    data: "documentos"
                }
            }),
            back: function () {},
            settings: function () {}
        };

        document.addEventListener("deviceready", function () {
            console.log("produto : " + getUrlVars()["produto"]);
            $("#headerSpan").text(getUrlVars()["produto"]);
            $("#proposta").val(getUrlVars()["proposta"]);
            $("#cpf").val(getUrlVars()["cpf"]);
            /*app = new kendo.mobile.Application(document.body);
            window.app = app;*/
        }, false);
        
    }
    ());
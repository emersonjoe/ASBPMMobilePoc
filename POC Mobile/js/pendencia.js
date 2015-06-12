(function () {
    document.addEventListener("deviceready", function () {
        sessionStorage.setItem("isPendencia", 1);

        function getUrlVars() {
            var vars = [],
                hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }

        var app;
        var apiKey = "kSrpI2x2pp9EPl65";
        var el = new Everlive(apiKey);

        var dataSource = new kendo.data.DataSource({
            type: "everlive",
            transport: {
                typeName: "Formulario"
            },
            serverFiltering: true,
            filter: {
                logic: "and",
                filters: [{
                    field: "proposta",
                    operator: "eq",
                    value: getUrlVars()["proposta"]
                    }]
            }
        });
        dataSource.fetch(function () {
            var view = dataSource.view();
            $("#proposta").val(view[0].proposta);
            $("#cpf").val(view[0].cpf);
        });

        /*app = new kendo.mobile.Application(document.body);
        window.app = app;*/
    }, false);
}());
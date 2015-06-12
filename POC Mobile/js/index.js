(function () {
    var apiKey = "kSrpI2x2pp9EPl65";
    var el = new Everlive(apiKey);


    document.addEventListener("deviceready", function () {

        var app;
        var formularioDataSource = new kendo.data.DataSource({
            type: "everlive",
            sort: {
                field: "proposta",
                dir: "asc"
            },
            transport: {
                typeName: "Formulario"
            },
            serverFiltering: true,
            filter: {
                logic: "and",
                filters: [{
                    field: "temPendencia",
                    operator: "eq",
                    value: true
                       }]
            },
            serverPaging: true,
            pageSize: 6
        });

        $('#button-log-out').click(function () {
            // Prevent going to the login page until the login call processes.
            event.preventDefault();
            $.ajax({
                type: "GET",
                url: 'http://api.everlive.com/v1/' + apiKey + '/oauth/logout',
                headers: {
                    "Authorization": "Bearer " + localStorage["login"]
                },
                success: function (data) {
                    $("#username").val('');
                    $("#password").val('');
                    localStorage.clear();
                    window.location.href = "#login";
                },
                error: function (error) {
                    navigator.notification.alert("Ocorreu um erro ao fazer o log out." + JSON.stringify(erro));
                }
            });
        });

        $('#button-login').click(function () {
            localStorage.clear();
            if (localStorage["login"] == null) {
                if ($("#username").val() === '') {
                    navigator.notification.alert("Preencha o nome do usuário");
                }
                if ($("#password").val() === '') {
                    navigator.notification.alert("Preencha a senha");
                }
                el.Users.login($("#username").val(), $("#password").val(),
                    function (data) {
                        localStorage["login"] = data.result.access_token;
                        window.location.href = "#index";
                    },
                    function () {
                        navigator.notification.alert("Usuário/senha inválido.");
                    });
            }
        });

        formularioDataSource.fetch(function () {
            var view = formularioDataSource.view();
            for (i = 0; i < view.length; i++) {

                var img;
                var href;
                var proposta = view[i].proposta;

                img = "Close-Delete-Alt-32.png";
                href = "href='views/pendencia.html?proposta=" + proposta + "'";

                var append = "<image style='float: left; width: 25px; height: auto;' src='img/32/" + img + "'><a " + href + " class='full-link'>Proposta: " + proposta + "</a>";
                $("#pendencias-list").append("<li>" + append + "</li>");
            }
        });

        app = new kendo.mobile.Application(document.body);
        window.app = app;

    }, false);
}());
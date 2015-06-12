(function () {
    document.addEventListener("deviceready", function () {
        var apiKey = "kSrpI2x2pp9EPl65";
        var el = new Everlive(apiKey);

        var formDataSource = new kendo.data.DataSource({
            type: "everlive",
            sort: {
                field: "proposta",
                dir: "asc"
            },
            transport: {
                typeName: "Formulario"
            }
        });

        $('#button-cancelar').click(function () {
            window.location.href = "../index.html#index";
        });

        $('#button-concluir').click(function () {
            try {
                var proposta = sessionStorage.getItem("proposta");
                formDataSource.add({
                    tipo_favorecido: $("#tipo-favorecido").val(),
                    txa_especial: $("#taxa").val(),
                    optou_cartao: $("#cartao").val(),
                    banco: $("#banco").val(),
                    agencia: $("#agencia").val(),
                    conta: $("#conta").val(),
                    dac: $("#dac").val(),
                    percentual: $("#percentual").val(),
                    proposta: proposta,
                    cpf: sessionStorage.getItem("cpf")
                });
                formDataSource.one("sync", this.close);
                formDataSource.sync();

                var storedImages = JSON.parse(sessionStorage["images"]);

                var files = [];
                for (i = 0; i < storedImages.length; i++) {
                    var file = {
                        "Filename": proposta + "_" + i + ".jpg",
                        "ContentType": "image/jpg",
                        "CustomField": "customValue",
                        "base64": storedImages[i]
                    };

                    el.Files.create(file, onSuccess, onFail);
                }
            } catch (erro) {
                alert(erro);
            }
        });

        var int = 0;

        function onSuccess(data) {
            try {
                var storedImages = JSON.parse(sessionStorage["images"]);
                int = int + 1;

                if (int === storedImages.length) {
                    sessionStorage.clear();
                    window.location.href = "../index.html#index";
                }
            } catch (erro) {
                alert(erro);
            }
        }

        function onFail(error) {
            alert('Failed because: ' + message);
        }

    });
}());
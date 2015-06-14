/*$(function () {
    $("#drawer").kendoMobileDrawer({
        container: "#index"
    });

    $("#drawer-trigger").click(function () {
        $("#drawer").data("kendoMobileDrawer").show();
        return false;
    });

    $(".drawer-link").click(function () {
        $("#drawer").data("kendoMobileDrawer").hide();
        $(".drawer-link").removeClass("active");
        $(this).addClass("active");
        return false;
    });

    $(".drawer-link").click(function () {
 alert($(this).data("target"));
        
        	if($(this).data("target") == 'login')
            {
                  var apiKey = "kSrpI2x2pp9EPl65";
    		var el = new Everlive(apiKey);
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
                    window.location.href = "index.html#login";
                  
                },
                error: function (error) {
                    navigator.notification.alert("Ocorreu um erro ao fazer o log out." + JSON.stringify(erro));
                }
            });
                
         		
            }
        	else if($(this).data("target") == 'pendencia')
            {
                window.location.href = "index.html#index";
            }

      //  $(".inner-content").hide();
      //  $("#" + $(this).data("target")).show();
    });
});*/


$(function () {
    
    $("#drawer-trigger").click(function () {
        $("#drawer").data("kendoMobileDrawer").show();
        return false;
    });

    $("#drawer-trigger2").click(function () {
        $("#drawer").data("kendoMobileDrawer").show();
        return false;
    });
    
    //fecha o menu e seta o item ativo
    $(".drawer-link").click(function () {
        $("#drawer").data("kendoMobileDrawer").hide();
        $(".drawer-link").removeClass("active");
        $(this).addClass("active");
        return false;
    });

    $(".drawer-link").click(function () {
        if ($(this).data("target") == "login") {
            return;
        }
        window.location.href = "#" + $(this).data("target");
    });
});
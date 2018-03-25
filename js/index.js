let channels = ["ESL_SC2", "taimoutv", "xQcOW ", "dafran", "stpeach", "tf2pine"];

function getChannelInfo() {
    channels.forEach(function(channel) {
        function makeUrl(type, name) {
            return "https://wind-bow.glitch.me/twitch-api/" + type + "/" + name + "?callback=?";
        };
        $.getJSON(makeUrl("streams", channel), function(data) {
            var game, status;
            if (data.stream === null) {
                game = "Offline";
                status = "offline";
            } else if (data.stream === undefined) {
                game = "Account Closed";
                status = "offline";
            } else {
                game = data.stream.game;
                status = "online";
            };
            $.getJSON(makeUrl("channels", channel), function(data){
                var logo = data.logo ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
                description = status === "online" ? ": " + data.status : "";
                html = '<div class="row ' +
                  status + '"><div class="col-2 col-sm-1"><img class="rounded-circle" src="' +
                  logo + '"></div><div class="col-sm-3 text-align"><a href="' +
                  data.url + '" target="_blank">' +
                  data.display_name + '</a></div><div class="col-sm-8" id="name">' +
                  game + '<span class="d-none d-sm-inline" id="streaming">' +
                  description + '</span></div></div>';
                  status === "online" ? $("#display").prepend(html) : $("#display").append(html);
            });
        });
    });
};

$(document).ready(function(){
    getChannelInfo();
    $(".selector").click(function(){
        $(".selector").removeClass("active");
        $(this).addClass("active");
        var status = $(this).attr("id");
        if (status === "all") {
            $(".online, .offline").show();
        } else if (status === "online") {
            $(".offline").hide();
            $(".online").show();
        } else {
            $(".online").hide();
            $(".offline").show();
        }
    })

/* for loop:
->if (document.getElementById("name" + x).innerHTML === "")
only works sometimes. other times live streamers show as offline

-> url.indexOf("streams") >= 0; data.stream !== "null";
$("#status" + x).prop("src").val()
I tried all three codes to ensure data.stream != null

-> if (document.getElementById("status" + x).innerHTML === ""
if I don't put the code above, when ESL_SC2 and stpeach are streaming
their status sometimes show that they are offline

    for (var x = 0; x < users.length; x++){
        getStreams("streams/" + users[x], x);
        if (document.getElementById("name" + x).innerHTML === "") {
            getChannels("channels/" + users[x], x);
        }
    }

    function getStreams(url, x){
        $.ajax({
            url:"https://wind-bow.glitch.me/twitch-api/" + url,
            dataType: "json",
            cache: false,
            success: function(data){
                if (data.stream !== null) {
                    $("#logo" + x).attr("src", data["stream"]["channel"]["logo"]);
                    $("#name" + x).text(data.stream.channel.display_name);
                    $("#link" + x).attr("href", data.stream.channel.url);
                    $("#status" + x).text(data.stream.channel.game + ": " + data.stream.channel.status);
                }
            },
            error: function(){
                console.log("getStreams ajax fails");
            }
        });
    }

    function getChannels(url, x){
        $.ajax({
            url:"https://wind-bow.glitch.me/twitch-api/" + url,
            dataType: "json",
            cache: false,
            success: function(data){
                $("#logo" + x).attr("src", data.logo);
                $("#name" + x).text(data.display_name);
                $("#link" + x).attr("href", data.url);
                if (document.getElementById("status" + x).innerHTML === ""){
                    $("#status" + x).text("Offline");
                }
            },
            error: function(){
                console.log("getChannels ajax fails");
            }
        });
    }
*/

});

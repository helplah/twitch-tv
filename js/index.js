const channels = ["ESL_SC2", "taimoutv", "xQcOW ", "dafran", "stpeach", "tf2pine"];

function getChannelInfo() {
    // apply method on all channels
    channels.forEach(channel => {
        function makeUrl(type, name) {
            return "https://wind-bow.glitch.me/twitch-api/" + type + "/" + name + "?callback=?";
        };
        // check under streams route if the user is streaming, update user status
        $.getJSON(makeUrl("streams", channel), data => {
            let game, status;
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
            // go channels route, and retrieve data
            $.getJSON(makeUrl("channels", channel), data => {
                let logo = data.logo ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
                description = status === "online" ? ": " + data.status : "";
                html = '<div class="row ' +
                  status + '"><div class="col-2 col-sm-1"><img class="rounded-circle" src="' +
                  logo + '"></div><div class="col-5 col-sm-3 text-align"><a href="' +
                  data.url + '" target="_blank">' +
                  data.display_name + '</a></div><div class="col-5 col-sm-8" id="name">' +
                  game + '<span class="d-none d-sm-inline" id="streaming">' +
                  description + '</span></div></div>';
                  status === "online" ? $("#display").prepend(html) : $("#display").append(html);
            });
        });
    });
};

$(document).ready(() => {
    getChannelInfo();
    $(".selector").click(event => {
        $(".selector").removeClass("active");
        $(event.currentTarget.id).addClass("active");
        let status = $(event.currentTarget).attr("id");
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
});

let selection = [];

function selected(chkBox) {
  let filename = chkBox.id.split('/')[1];
  let img_id = parseInt(filename.split('.')[0]);
  selection.push(img_id);
  console.log(selection);
}

var xzhu = (function(md) {
  md.data = {
    photo_list: []
  };

  // md.create_radar_chart = function() {};

  md.click_event = function() {
    $("#submit").click(function() {
      $("#main-section").empty();
      // md.create_radar_chart();

      selection = Array.from(new Set(selection));

      // let image_ids = [];
      // for (let s of selection) {
      //   let filename = s.split('/')[1];
      //   let img_id = parseInt(filename.split('.')[0]);
      //   image_ids.push(img_id);
      // }

      if(typeof(Storage)!=="undefined")
      {
        window.localStorage.setItem("selection", JSON.stringify(selection));
      }
      else
      {
        console.log('error at sotrage at index');
      }

      window.location.replace("chart.html");

    });
  };

  md.append_slide_photo = function(arr) {

    let a_start = "<a href=\"#\">";
    let a_end = "</a>";
    $.each(arr, function(idx, val) {
      let photo_src = val;
      let input = `<input type="checkbox" id="cb_${photo_src}" onclick="if(this.checked){ selected(this) }"/>`;
      let photo = `<label for="cb_${photo_src}"><img src="${photo_src}" id="img_${photo_src}"/>`;

      $("#carousel").append(
        a_start + input + photo + a_end
      );
    });
  };

  md.init_slide = function() {
    var carousel = $("#carousel").waterwheelCarousel({
      flankingItems: 3,
      movingToCenter: function ($item) {
        $('#callback-output').prepend('movingToCenter: ' + $item.attr('id') + '<br/>');
      },
      movedToCenter: function ($item) {
        $('#callback-output').prepend('movedToCenter: ' + $item.attr('id') + '<br/>');
      },
      movingFromCenter: function ($item) {
        $('#callback-output').prepend('movingFromCenter: ' + $item.attr('id') + '<br/>');
      },
      movedFromCenter: function ($item) {
        $('#callback-output').prepend('movedFromCenter: ' + $item.attr('id') + '<br/>');
      },
      clickedCenter: function ($item) {
        $('#callback-output').prepend('clickedCenter: ' + $item.attr('id') + '<br/>');
      }
    });

    $('#prev').bind('click', function () {
      carousel.prev();
      return false
    });

    $('#next').bind('click', function () {
      carousel.next();
      return false;
    });

    // $('#reload').bind('click', function () {
    //   newOptions = eval("(" + $('#newoptions').val() + ")");
    //   carousel.reload(newOptions);
    //   return false;
    // });

  };

  md.able_submit = function(){
    $("#submit").css({
      "font-size": "3rem",
      "text-decoration": "none",
      "padding": "0 20px",
      "background": "#1E1E20",
      "color": "#fff",
      "border-top": "solid 2px #fff",
      "border-bottom": "solid 2px #fff",
      "font-family": "'Source Sans Pro', sans-serif",
      "font-style": "normal",
      "font-weight": "300",
      "transition-timing-function": "ease-in-out",
      "-webkit-transition": "all 0.5s ease-in-out",
      "pointer-events": "auto",
      "cursor": "pointer"
    });

    $("#submit").mouseover(function() {
      $("#submit").css({
        "background": "#fff",
        "color": "#1E1E20"
      });
    });
    $("#submit").mouseout(function() {
      $("#submit").css({
        "background": "#1E1E20",
        "color": "#fff"
      });
    });
    console.log('submit');
  };

  md.disable_submit = function() {
    $("#submit").css({
      "font-size": "3rem",
      "text-decoration": "none",
      "padding": "0 20px",
      "background": "#1E1E20",
      "color": "#383840",
      "border-top": "solid 2px #383840",
      "border-bottom": "solid 2px #383840",
      "font-family": "'Source Sans Pro', sans-serif",
      "font-style": "normal",
      "font-weight": "300",
      "transition-timing-function": "ease-in-out",
      "-webkit-transition": "all 0.5s ease-in-out",
      "pointer-events": "none",
      "cursor": "defult"
    });
  };

  md.get_image = function() {
    $( ":checkbox" ).click(function() {
      let check = $('#carousel').find('input[type=checkbox]:checked').length;
      // if (check > 4)
      if (check > 2)
        md.able_submit();
      else
        md.disable_submit();
    });
  };

  md.init = function() {
    let cheat = [123, 203, 205, 457, 458, 459, 460, 461, 18, 40,
       43, 114, 391, 223, 227, 196, 44, 199, 200, 201, 221, 222,
       24, 40, 29, 62, 168, 208, 73, 352, 401, 310, 80, 108, 199,
       202, 204, 446, 456, 458];

    cheat = Array.from(new Set(cheat)).sort(function(a, b){return a - b}); // 'shuffle' the images by simply sorting them

    // for (let i = 1, c = 60; i <= c; i++)
    for (let i of cheat)
    {
      md.data.photo_list.push("images/" + i + ".jpg");
    }

    md.append_slide_photo(md.data.photo_list);
    md.init_slide();
    md.get_image();

    md.click_event();

  };

  return md;
})(xzhu || {});

$(document).ready(function(){
  xzhu.init();
  // xzhu.click_event();
});

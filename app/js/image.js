let selection = [];

function selected(chkBox) {
  let filename = chkBox.id.split("/")[1];
  let img_id = parseInt(filename.split(".")[0]);
  selection.push(img_id);
}

var xzhu = (function(md) {
  md.data = {
    photo_list: []
  };

  md.append_slide_photo = function(arr) {
    let a_start = '<a href="#">';
    let a_end = "</a>";
    $.each(arr, function(idx, val) {
      let photo_src = val;
      let input = `<input type="checkbox" class="mycb" id="cb_${photo_src}" onclick="if(this.checked){ selected(this) }"/>`;
      let photo = `<label for="cb_${photo_src}"><img src="${photo_src}" id="img_${photo_src}"/>`;

      $("#carousel").append(a_start + input + photo + a_end);
    });
  };

  md.init_slide = function() {
    var carousel = $("#carousel").waterwheelCarousel({
      flankingItems: 3,
      movingToCenter: function($item) {
        $("#callback-output").prepend(
          "movingToCenter: " + $item.attr("id") + "<br/>"
          );
      },
      movedToCenter: function($item) {
        $("#callback-output").prepend(
          "movedToCenter: " + $item.attr("id") + "<br/>"
          );
      },
      movingFromCenter: function($item) {
        $("#callback-output").prepend(
          "movingFromCenter: " + $item.attr("id") + "<br/>"
          );
      },
      movedFromCenter: function($item) {
        $("#callback-output").prepend(
          "movedFromCenter: " + $item.attr("id") + "<br/>"
          );
      },
      clickedCenter: function($item) {
        $("#callback-output").prepend(
          "clickedCenter: " + $item.attr("id") + "<br/>"
          );
      }
    });

    $("#prev").bind("click", function() {
      carousel.prev();
      return false;
    });

    $("#next").bind("click", function() {
      carousel.next();
      return false;
    });

        // $('#reload').bind('click', function () {
        //   newOptions = eval("(" + $('#newoptions').val() + ")");
        //   carousel.reload(newOptions);
        //   return false;
        // });
      };

      md.able_submit = function() {
        $("#submit").css({
          "font-size": "1.5rem",
          "text-decoration": "none",
          "padding": "5px 20px",
            "color": "#4c4d4d",
            "border-top": "solid 1.5px #4c4d4d",
            "border-bottom": "solid 1.5px #4c4d4d",
            "font-family": "Georgia, serif",
            "font-style": "normal",
            "font-weight": "200",
            "transition-timing-function": "ease-in-out",
            "-webkit-transition": "all 0.5s ease-in-out",
            "pointer-events": "auto",
            "cursor": "pointer"
          });

        $("#submit").mouseover(function() {
          $("#submit").css({
            "background": "#4c4d4d",
            "color": "#fdfefc"
          });
        });
        $("#submit").mouseout(function() {
          $("#submit").css({
            "background": "none",
            "color": "#4c4d4d"
          });
        });
      };

      md.disable_submit = function() {
        $("#submit").css({
          "font-size": "1.5rem",
          "text-decoration": "none",
          "padding": "5px 20px",
            "color": "#e5e6e6",
            "border-top": "solid 1.5px #e5e6e6",
            "border-bottom": "solid 1.5px #e5e6e6",
            "font-family": "Georgia, serif",
            "font-style": "normal",
            "font-weight": "200",
            "transition-timing-function": "ease-in-out",
            "-webkit-transition": "all 0.5s ease-in-out",
            "pointer-events": "none",
            "cursor": "default"
          });
      };

      var checkedList = [];

      function deletetn(checkedList){
        $(".thumbnail-img").bind("click", function() {
          var str = $(this)[0].src;
          str = "cb_images/" + str.substring(str.lastIndexOf("/") + 1);
          if (checkedList.indexOf(str) != -1)
          {
            document.getElementById(str).checked = false;
            checkedList.splice(checkedList.indexOf(str), 1);
            $("#ic-" + $(this)[0].id.substring(3)).parent().remove();
            if ($("input.mycb").filter(":checked").length == 5)
            {
              $("input.mycb:not(:checked)").attr("disabled", "disabled");
              md.able_submit();
            }
            else
            {
              $("input.mycb").removeAttr("disabled");
              md.disable_submit();
            }
            let checkedBoxes = $("#carousel").find("input[type=checkbox]:checked");
            let numChecked = checkedBoxes.length;
            setcursor(numChecked);
          }
        });
      }

      function setthumbnail(checkedList) {
        /* This part is for thumbnail*/
        var i = 0;
        for (; i < 4; i++)
        {
          if ($("#ic-"+i)[0]==undefined)
            break;
        }
        let twodivs = `<div class="thumbnails-img-container"><div class="img-container" id="ic-${i}">`;
        let imgclass = `<img class="thumbnail-img" id="tn-${i}" src="${checkedList[checkedList.length-1].substr(3)}"></div></div>`;
        $(".thumbnails-container").append(twodivs + imgclass);
        $("#ic-" + (i)).show(0).animate({opacity:1});
        deletetn(checkedList);
      }

      function setcursor(numChecked){
        if (numChecked == 5) {
          let unchecked = $("#carousel").find("input[type=checkbox]:not(:checked)");
          for (var j = 0; j < unchecked.length; j++) {
            var elem = document.getElementById("img_" + unchecked[j].id.substr(3));
            elem.style.cursor = "default";
          }
        } else {
          let unchecked = $("#carousel").find("input[type=checkbox]:not(:checked)");
          for (var j = 0; j < unchecked.length; j++) {
            var elem = document.getElementById("img_" + unchecked[j].id.substr(3));
            elem.style.cursor = "pointer";
          }
        }
      }

      function disableenablecb() {
        $(".mycb").change(function() {
          if ($("input.mycb").filter(":checked").length == 5)
            $("input.mycb:not(:checked)").attr("disabled", "disabled");
          else $("input.mycb").removeAttr("disabled");
        });
      }

      md.get_image = function() {
        $(":checkbox").click(function() {
          if (checkedList.indexOf(this.id) == -1)
          {
            checkedList.push(this.id);
            //add one to array and display
            setthumbnail(checkedList);
          }
          else
          {
            //delete one
            checkedList.splice(checkedList.indexOf(this.id), 1);
            let imgsrc = $(this)[0].id.substr(3);
            let elem = $(".thumbnails-container").find('img[src$="' + imgsrc + '"]')
            elem.parent().parent().remove();
          }
          let checkedBoxes = $("#carousel").find("input[type=checkbox]:checked");
          let numChecked = checkedBoxes.length;
          if (numChecked > 4)
            md.able_submit();
          else
            md.disable_submit();
          setcursor(numChecked);
          disableenablecb();
        });
      };

      md.click_event = function() {
        $("#submit").click(function() {
          $("#main-section").empty();

          selection = Array.from(new Set(selection));

          if (typeof Storage !== "undefined") {
            window.localStorage.setItem("selection", JSON.stringify(selection));
          } else {
            console.log("error at sotrage at index");
          }
          window.location.replace("chart.html");
        });
      };

      md.init = function() {
        let cheat = [
        123,
        203,
        205,
        457,
        458,
        459,
        460,
        461,
        18,
        40,
        43,
        114,
        391,
        223,
        227,
        196,
        44,
        199,
        200,
        201,
        221,
        222,
        24,
        40,
        10,
        23,
        230,
        192,
        454,
        455,
        198,
        122,
        29,
        62,
        168,
        208,
        73,
        352,
        401,
        310,
        80,
        108,
        199,
        202,
        204,
        446,
        456,
        458
    ]; // only include images related to wines

    cheat = Array.from(new Set(cheat)).sort(function(a, b) {
      return a - b;
    }); // 'shuffle' the images by simply sorting them

    for (let i of cheat) {
      md.data.photo_list.push("images/" + i + ".jpg");
    }

    md.append_slide_photo(md.data.photo_list);
    md.init_slide();
    md.get_image();
    md.click_event();
  };

  return md;
})(xzhu || {});

$(document).ready(function() {
  xzhu.init();
});

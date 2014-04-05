/*global $: false */

$(function () {
  "use strict";
  
  var keyBind, refreshBox;
  
  $("body").scrollspy({ target: ".main-nav" })
  
  $("pre:not(.no-highlight)").each(function (i, e) {
    var $e = $(e), elem;
    
    $e.addClass("display");
    
    elem = $("<code />");
    elem.addClass("compiled highlight");
    
    $.ajax({
      url: "https://liquidscript.io/run",
      type: "POST",
      dataType: "json",
      data: { code: $e.text(), type: "generated" },
      success: function (d) {
        if (!d.error && d.result) {
          elem.html($(d.result).children("div pre").html());
          $e.append(elem);
        }
      }
    });
    
  });
  
  refreshBox = function() {
    $("#try code.compiled").removeClass("error");
    
    $.ajax({
      url: "https://liquidscript.io/run",
      type: "POST",
      dataType: "json",
      data: { code: $("#try textarea").val(), type: "generated" },
      success: function (d) {
        if(!d.error && d.result) {
          $("#try code.compiled").html($(d.result).children("div pre").html());
        } else {
          $("#try code.compiled").text(d.error);
          $("#try code.compiled").addClass("error");
        }
      }
    });
  };
  
  $("#try").append("<code class='compiled highlight'></code>");
  $("#try textarea").on("keydown", function() {
    if(keyBind) {
      clearTimeout(keyBind); 
    }
    
    keyBind = setTimeout(refreshBox, 500);
  });
  
});
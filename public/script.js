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

  fakeConsole = window.fakeConsole = {};
  fakeConsole._buffer = "";
  fakeConsole.concat = function() {
    for (var i = 0; i < arguments.length; i++) {
      if(arguments[i] && arguments[i].toString())
        fakeConsole._buffer += arguments[i].toString();
      fakeConsole._buffer += "\n";
    }
  }
  fakeConsole.warn = fakeConsole.error = fakeConsole.log = fakeConsole.concat;

  $("#run").click(function() {
    var code = $("#try code.compiled").text();
    var toExec = "(function(console){" + code + "})(window.fakeConsole)"

    try {
      var output = eval(toExec);
      var result = "";

      if(fakeConsole._buffer)
        result += "Console log:\n\n" + fakeConsole._buffer
      if(output)
        result += (result?"\n\n":"") + "Output:\n\n" + output.toString()

      $("#output").text(result || "Code did not return any output")
    } catch(e) {
      $("#output").text(e);
    }
    fakeConsole._buffer = "";
  });

  $("#examples").change(function(){
    var filename = $(this).find("option:selected").val();
    $.get("/examples/" + filename, function(data){
      $("#try textarea").val(data);
      refreshBox();
    });
  });

  refreshBox();

});

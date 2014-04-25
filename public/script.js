/*global $: false */

$(function () {
  "use strict";

  var keyBind, refreshBox, setCursorPos;

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

  setCursorPos = function(obj, caretPos) {
    if(obj.setSelectionRange) {
      obj.setSelectionRange(caretPos, caretPos);
    } else if (obj.createTextRange) {
      var range = obj.createTextRange()
      range.collapse(true);
      range.moveEnd('character', caretPos);
      range.moveStart('character', caretPos);
      range.select();
    }
  }

  $("#try").append("<code class='compiled highlight'></code>");
  $("#try textarea").on("keydown", function(e) {
    if(keyBind) {
      clearTimeout(keyBind);
    }

    // Insert spaces when tab is pressed
    if(e.keyCode === 9) {
      e.preventDefault();

      var tab = "  ";
      var caretPos = this.selectionStart;
      var textAreaTxt = $(this).val();
      $(this).val(textAreaTxt.substring(0, caretPos) + tab + textAreaTxt.substring(caretPos));
      caretPos += tab.length;
      setCursorPos(this, caretPos);

    } else if (e.keyCode === 13) { // Align on return
      e.preventDefault();

      var start, end;
      var caretPos = this.selectionStart;
      var textAreaTxt = $(this).val();
      for (start = caretPos-1; start >= 0 && textAreaTxt[start] != "\n"; --start);
      for (end = caretPos; end < textAreaTxt.length && textAreaTxt[end] != "\n"; ++end);
      var line = textAreaTxt.substring(start + 1, end - 1);

      var spaces = /^(\s*)/.exec(line)[1]
      if (line === spaces)
      	spaces += " ";
      $(this).val(textAreaTxt.substring(0, caretPos) + "\n" + spaces + textAreaTxt.substring(caretPos));
      setCursorPos(this, caretPos + 1 + spaces.length);
    }

    keyBind = setTimeout(refreshBox, 500);
  });

  $.ajax({
    url: "https://liquidscript.io/version",
    success: function(d) {
      $("#brand").append(" v" + d);
    }
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
      $("#try textarea").trigger("autosize.resize");
    });
  });

  $("#input").autosize();
  $("#input").trigger("autosize.resize");

  refreshBox();

});

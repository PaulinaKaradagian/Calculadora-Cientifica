var basicOperators = ["+", "-", "*", "/", "%", "**"];
function $(query) {
  return document.querySelector(query);
}
window.onload = function () {
  var buttons = document.querySelectorAll(".c");
  loadEventListeners(buttons);
};

function invalid(element) {
  element.classList.add("r");
  setTimeout(function () {
    element.classList.remove("r");
  }, 1000);
}
function loadEventListeners(buttons) {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      var button = this.value;
      var work = $("#input").innerHTML;
      if (!isNaN(button)) {
        changeInput(button);
      } else if (button == ".") {
        var string = work;
        var temp = string.lastIndexOf(".");
        if (temp == -1) {
          if (work == "") changeInput("0" + this.value);
          else changeInput(this.value);
        } else {
          string = string.slice(temp + 1, string.length).replace(/[0-9]/g, "");
          if (string != "") changeInput(this.value);
          else invalid(this);
        }
      } else if (button == "=" && work != "") evaluate();
      else if (button == "pi" && work == "")
        $("#input").innerHTML = Math.PI.toFixed(8);
      else if (button == "AC" && work != "")
        document.getElementById("input").innerHTML = "";
      else if (button == "back" && work != "")
        $("#input").innerHTML = work.slice(0, work.length - 1);
      else {
        //chequear si ultimo digito es un numero o no para evitar duplicar operadores
        if (isNaN(work[work.length - 1]))
          //alerta no puede tener dos operadores.
          invalid(this);
        else {
          // agrega op al string
          if (work.replace(/[0-9.]/g, "") != "") evaluate();
          if (basicOperators.includes(button)) changeInput(button);
          else if (button == "√") $("#input").innerHTML = Math.sqrt(work);
          else if (button == "²") $("#input").innerHTML = work * work;
          else if (button == "log") $("#input").innerHTML = Math.log(work);
          else if (button == "pi") changeInput("*" + Math.PI.toFixed(8));
          else if (button == "sin") $("#input").innerHTML = Math.sin(work);
          else if (button == "cos") $("#input").innerHTML = Math.cos(work);
          else if (button == "tan") $("#input").innerHTML = Math.tan(work);
        }
      }
    });
  }
}

function isNumber(input) {
  if (input >= 0 && input <= 9 && !isNaN(input) && input != "" && input != null)
    return true;
  return false;
}
function changeInput(string) {
  $("#input").innerHTML += string;
}

function evaluate() {
  try {
    var code = eval($("#input").innerHTML);
    $("#input").innerHTML = code;
  } catch (err) {
    $("#input").innerHTML = "INVALID INPUT";
  }
}

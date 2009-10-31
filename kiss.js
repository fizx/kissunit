function KISSUnit(tests) {
  this.tests = tests;
};
KISSUnit.prototype = new Object();

KISSUnit.prototype.run = function() {
  KISSUnit.running = this;
  this.init();
  var tests = this.tests;
  var setUp = tests["setUp"];
  var tearDown = tests["tearDown"];
  for(var name in tests){
    if(name.indexOf("test") == 0){
      try {
        if(setUp) setUp();
        this.name = name;    
        tests[name]();
        if(tearDown) tearDown();
      } catch(err) {
        KISSUnit.logFail(name + ": " + err);
      }
    }
  }
};

KISSUnit.prototype.init = function() {
  var id = "KISSPanel";
  if(!(this.div = document.getElementById(id))) {
    this.div = document.createElement("DIV");
    this.div.id = id;
    this.div.style.position = "absolute";
    this.div.style.top = "10px";
    this.div.style.left = "10px";
    this.div.style.padding = "10px";
    this.div.style.border = "1px silver solid";
    this.div.style.backgroundColor = "white";
    document.body.appendChild(this.div);
  }
  this.div.innerHTML = '<div>Results <a href="#" onclick="KISSUnit.hideSuccess()">hide green</a> | <a href="#" onclick="KISSUnit.closeDiv()">close</a></div>';
  
};

KISSUnit.closeDiv = function(){
  var e = document.getElementById("KISSPanel");
  e.parentNode.removeChild(e);
}

KISSUnit.hideSuccess = function(){
  var elements = document.getElementsByTagName("DIV");
  for(var i = 0; i < elements.length; i++) {
    if(elements[i].className == "success"){
      elements[i].style.display = "none";
    }
  }
};

KISSUnit.logOk = function(msg){
  KISSUnit.log('#0f0', 'success', msg);
};

KISSUnit.logFail = function(msg){
  KISSUnit.log('#f00', 'failure', msg);
};

KISSUnit.log = function(color, klass, msg){
  var div = document.createElement("DIV");
  div.className = klass;
  div.style.color = color;
  div.innerHTML = msg;
  KISSUnit.running.div.appendChild(div);
};

function assertTrue(a) {
  var name = KISSUnit.running.name;
  if(a) { 
    KISSUnit.logOk(name);
  } else {
    KISSUnit.logFail(name);
  }
}

function assertEqual(a, b) {
  var name = KISSUnit.running.name;
  if(a == b) { 
    KISSUnit.logOk(name);
  } else {
    KISSUnit.logFail(name + ": " + a + " != " + b);
  }  
}
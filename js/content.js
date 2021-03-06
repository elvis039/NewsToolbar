//logging
// var firstHref = $("a[href^='http']").eq(0).attr("href");
// console.log("[content.js] logging: " + firstHref);

// create toolbar element

function $(id) { return document.getElementById(id); }

var height;

var skipPositionedChild = function( node, style ) {
    if ( this.offsetParent &&
         this.offsetParent.tagName !== 'BODY') return true;
    if ( hasPositionedParent(node) ) return true;
    return false;
};

var hasPositionedParent = function( node ){
    if ( node.tagName === 'BODY') return false;
    var parent = node.parentNode;
    var position = getComputedStyle(parent).position;
    if (position !== 'static') {
      return true;
    }
    return hasPositionedParent( parent );
};

function removetoolbar(){
  console.log("removing");

	var checkb = $('newstoolbar');
	if(checkb){
		document.documentElement.removeChild(checkb);

			var a = document.querySelectorAll('[data-financetoolbar]');

			var a = document.body.getElementsByTagName("*");
			for (var i = 0, len = a.length; i < len; i++) {
					if(a[i].hasAttribute("data-sfttop")){
						a[i].style.top = a[i].getAttribute("data-sfttop");
					}
					if(a[i].hasAttribute("data-sftbottom")){
						a[i].style.bottom = a[i].getAttribute("data-sftbottom");
					}
					if(a[i].hasAttribute("data-sftheight")){
						a[i].style.height = a[i].getAttribute("data-sftheight");
					}
					a[i].setAttribute("data-financetoolbar",false);
			}

	}

	var checkc = $('stefanvdfinanceblocksmall');
	if(checkc){
		document.body.removeChild(checkc);
	}

	var checkd = $('stefanvdfinanceblocklarge');
	if(checkd){
		document.body.removeChild(checkd);
	}

}

function similationElement() {
  console.log("similationElement");
  var direction = "left";
  var posbegin = "+100%";
  var posend = "-100%";

  var timecredit = 35;

  var beginbeh = "normal";
  // beginbeh = "alternate"

  var similation = true;


  // create marquee
  var newframe = document.createElement("div");
  newframe.setAttribute('id','stefanvdfinance');
  // newframe.style.background = "";
  document.body.insertBefore(newframe, document.body.firstChild);

  // var newspeedleft = document.createElement("div");
  // newspeedleft.setAttribute('class','arrowleft');
  // newspeedleft.style.left = "240px"; // can change?
  // newspeedleft.textContent = "<";
  // newspeedleft.addEventListener("mousedown", function() {});
  // newspeedleft.addEventListener("mouseup", function() {});
  // newframe.appendChild(newspeedleft);
  //
  // var newbar = document.createElement("div");
  // newbar.setAttribute('class', "bar");
  // newbar.style.left = "260px";
  // newframe.appendChild(newbar);

  var movingframe = document.createElement("div");
  movingframe.setAttribute('id', "stefanvdfinancemarquee");


  // movingframe.style.fontFamily = getfontfamily;
  // movingframe.style.fontSize = getfontsize + "px";

  //me add
  var createTextContainer = function(sourceName, text, sentiment, url) {
    var hyperlink = document.createElement("a");
    hyperlink.setAttribute("href", url);
    hyperlink.setAttribute("target", "_blank");
    hyperlink.setAttribute("style", "color: inherit;text-decoration: inherit;");
    var textContainer = document.createElement("span");
    var color;
    if(sentiment < 0.20) {
      color = "#ff4554";
    } else if (sentiment < 0.4) {
      color = "#FFA4AC";
    } else if (sentiment < 0.6) {
      color = "#FFFFFF";
    } else if (sentiment < 0.8) {
      color = "#C6E990";
    } else {
      color = "#a1e736";
    }
    textContainer.setAttribute("style", "white-space: nowrap; font-size:medium; color:" + color + "; margin: 0 20px 0 20px;");
    var t = document.createTextNode("[" + sourceName + "] " + text);
    hyperlink.appendChild(t);
    textContainer.appendChild(hyperlink);
    return textContainer;
  };

  chrome.storage.local.get(['result'], function(result) {
    // console.log(JSON.stringify(result['newsSetting'][0]));
    console.log(result['result']);
    if (result['result'] !== undefined && Object.keys(result['result']).length != 0) {
      var lasttextContainer;
      for (var url in result['result']) {
        lasttextContainer = createTextContainer(result['result'][url]['host'], result['result'][url]['summary'], result['result'][url]['sentiment'], url);
        movingframe.appendChild(lasttextContainer);
      }
      var end = document.createElement("span");
      end.setAttribute("id", "end");
      lasttextContainer.appendChild(end);
    }
  });

  movingframe.style.color = "white";
  movingframe.addEventListener("mouseover", function() {}, false);
  movingframe.addEventListener("mouseout", function() {}, false);

  var similation = true;
  	if(similation == true) {
  	   // bar animation move
  	   var pos = 0;
  	   var id = window.setInterval(frame, 50);
  	   var coord;
  	   // window.clearInterval(id);
  	   function frame() {

         if(movingframe.style.transform.length == 0) {
           movingframe.style.transform = "translateX(" + 101 + "%)";
         }
         var percentage = parseFloat(movingframe.style.transform.match(/[+-]?([0-9]*[.])?[0-9]+/)[0]);
         percentage = percentage - 0.25;
         var end = document.getElementById("end");
         if(end != undefined) {
           var endposi = end.getBoundingClientRect();
           if(endposi.left < 0) {
             percentage = 100;
           }
           movingframe.style.transform = "translateX(" + percentage + "%)";
         }
  	   }
  	}

    newframe.appendChild(movingframe);

  var newspeedright = document.createElement("div");
  newspeedright.setAttribute('class','arrowright');
  newspeedright.style.right = "0px";
  newspeedright.textContent = ">";
  newspeedright.addEventListener("mousedown", function() {}, false);
  newspeedright.addEventListener("mouseup", function() {}, false);
  newframe.appendChild(newspeedright);

  console.log("returning "+ newframe);
  return newframe;
}

function updatetoolbar(){
  removetoolbar();
  addtoolbar();
}


function addtoolbar(){
  console.log('addtoolbar\n');
  var getpositiontop = true; // not sure where it is sett

		var checka = $('newstoolbar');
		if (!checka) {
	    var height = '30px';

      // move everything in page down 30px
			var Children = document.body.getElementsByTagName("*");
			for (var i = 0, len = Children.length; i < len; i++) {

				if(Children[i].currentStyle){
					var x = Children[i].currentStyle["position"];
					var y = Children[i].currentStyle["top"];
					var z = Children[i].currentStyle["bottom"];
					var q = Children[i].currentStyle["height"];
				}
				else if(window.getComputedStyle){
					var st = document.defaultView.getComputedStyle(Children[i], null);
					var x = st.getPropertyValue("position");
					var y = st.getPropertyValue("top");
					var z = st.getPropertyValue("bottom");
					var q = st.getPropertyValue("height");
				}

				if(getpositiontop == true){
					if((x == "absolute" || x == "fixed") && y !== 'auto'){
							if(y == "0px"){
								Children[i].setAttribute("data-financetoolbar",true);
								Children[i].setAttribute("data-sfttop",Children[i].style.top);
								Children[i].style.top = parseInt(y, 10) + parseInt(height, 10) + "px";
								// if "top" and "bottom" is 0 => then calc height
								if(q != "auto" && (y=="0px" && z=="0px")){
									Children[i].setAttribute("data-sftheight",q);
									Children[i].style.height = "calc(100% - " + height + ")";
								}
							}
						}
				} else {
					if((x == "absolute" || x == "fixed") && z !== 'auto'){
						if(z == "0px"){
								Children[i].setAttribute("data-financetoolbar",true);
								Children[i].setAttribute("data-sftbottom",Children[i].style.bottom);
								Children[i].style.bottom = parseInt(z, 10) + parseInt(height, 10) + "px";
								// if "top" and "bottom" is 0 => then calc height
								if(q != "auto" && (y=="0px" && z=="0px")){
									Children[i].setAttribute("data-sftheight",q);
									Children[i].style.height = "calc(100% - " + height + ")";
								}
						}
					}
				}

			}

      // create the toolbar div
			var div = document.createElement("div");
			// div.setAttribute("src", "toolbar.html");
			div.setAttribute('id', "newstoolbar");
			div.setAttribute('allowtransparency', "true");
			div.setAttribute('width','100%');
			div.style.height = "30px";
      div.style.backgroundColor = "black";
			div.style.border = "none";
			div.style.position = "fixed";
			if(getpositiontop == true){
				div.style.top = "0px";
			}else{
				div.style.bottom = "0px";
			}
			div.style.left = "0px";
			div.style.marginBottom = "0px";
			div.style.marginLeft = "0px";
			div.style.zIndex = 2147483647;
			div.style.width  = '100%';
			div.style.boxSizing = "border-box";


      // create hide button
      // var btn = document.createElement("button");
      // var t = document.createTextNode("hide");
      // btn.setAttribute('id', "hideBtn");
      // btn.style.backgroundColor = "transparent";
      // btn.style.color = "white";
      // btn.style.border = "none";
      // btn.style.float = "right";
      // btn.appendChild(t);
      // div.appendChild(btn);
      // console.log("apendded: ");


      var newframe = similationElement();
      console.log("content: " + newframe);
      div.appendChild(newframe);

			document.documentElement.appendChild(div);

		}
}

var addbar = null; var dropshadow = null; var allsites = null; var toolbaronly = null; var toolbarDomains = null;var getpositiontop = null; var getpositionbottom = null; var toolbarwhite = null; toolbarblack = null;

addtoolbar();
var newsUpdateTimer = setInterval(updatetoolbar, 1 * 10 * 1000);
// $("#hideBtn").click(() => alert("hahahaha"));



// prevent right click -- do we need this?
// document.addEventListener('contextmenu', event => event.preventDefault());

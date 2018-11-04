
var cnnchecked = false;

var snameList = [];
var urlList = [];
var linkcssList = [];
var contentcssList = [];

function addToSelected(sname) {
  console.log('addToSelected');
  var wrapper = document.getElementById("selected");
  wrapper.innerHTML += sname + ', ';
}

function loadInitialSelected() {
  chrome.storage.local.get(['newsSetting'], function(result) {

      if (result['newsSetting'] != undefined) {
        for (var res in result['newsSetting']) {
          snameList.push(res.sname);
          urlList.push(res.url);
          linkcssList.push(res.linkcss);
          contentcssList.push(res.contentcss);
        }

        // var wrapper = document.getElementById("selected");

        for (var res in result['newsSetting']) {
          // wrapper.innerHTML += res.sname + ', ';
          console.log(res);
          addToSelected(res);
        }

      }


  });
}

function initializeCheckBoxes() {
  var default_news = ["CNN"]; // append the list to make multiple defaults
  var wrapper = document.getElementById("form-lstcheck");
  var myHTML = '';

  console.log("in popup.js" + wrapper);

  for(var i=0; i<default_news.length; i++) {
      myHTML += '<div class="form-check"><input class="form-check-input" type="checkbox" id="'+default_news[i]+'"><label class="form-check-label">'
      + default_news[i] + '</label></div>'
  }
  wrapper.innerHTML = myHTML;
}

function addAnother() {
  var sname = document.getElementById('sname').value;
  var url = document.getElementById('url').value;
  var linkcss = document.getElementById('linkcss').value;
  var contentcss = document.getElementById('contentcss').value;

  if (!(sname == '' && url == '' && linkcss == '' && contentcss == '')) {

    snameList.push(sname);
    urlList.push(url);
    linkcssList.push(linkcss);
    contentcssList.push(contentcss);

    // var wrapper = document.getElementById("selected");
    // wrapper.innerHTML += sname + ', ';
    addToSelected(sname);

    document.getElementById('sname').value = '';
    document.getElementById('url').value = '';
    document.getElementById('linkcss').value = '';
    document.getElementById('contentcss').value = '';

    chrome.storage.local.get(['newsSetting'], function(result) {

          var newArr = (result['newsSetting'] == undefined) ? []: result['newsSetting'];
          newArr = [];
          newArr.push({sname, url, linkcss, contentcss});

          chrome.storage.local.set({'newsSetting': newArr}, function() {
              console.log('[popup] Value is set to ' + newArr);
          });
    });
  }
  // wrapper.innerHTML += '<div class="form-group"><label> Enter the url of your favorite news website </label><input type="url" class="form-control" id="url" placeholder="eg: https://www.cnn.com/us"><label> CSS Selector for links </label><input type="text" class="form-control" id="linkcss" placeholder="eg: .lstdiv"><label> CSS Selector for Contents </label><input type="text" class="form-control" id="contentcss" placeholder="eg: .content"></div>'

}

function addCnn() {
  // right now ok with one single checkbox, if more default is added need to change this
  var cnnchecked = !cnnchecked;

  if (cnnchecked) {
    addToSelected('CNN');

    chrome.storage.local.get(['defaultSetting'], function(result) {

          var newArr = (result['defaultSetting'] == undefined) ? []: result['defaultSetting'];
          newArr = [];
          newArr.push('cnn');

          chrome.storage.local.set({'defaultSetting': newArr}, function() {
              // console.log('[popup] Value is set to ' + newArr);
          });
    });
    document.getElementById("CNN").disabled = true;
  }
}

window.onload = function () {
  // loadInitialSelected();
  initializeCheckBoxes();

  document.getElementById("addBtn").addEventListener("click", addAnother);
  document.getElementById("CNN").addEventListener("click", addCnn);

  console.log("in popup.js");
};

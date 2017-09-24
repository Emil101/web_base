 var xmlHttp = createXmlHttpRequestObject(); // stores the reference to the XMLHttpRequest object

 // retrieves the XMLHttpRequest object
 function createXmlHttpRequestObject() {
     // will store the reference to the XMLHttpRequest object
     var xmlHttp;
     // if running Internet Explorer
     if (window.ActiveXObject) {
         try {
             xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
         } catch (e) {
             xmlHttp = false;
         }
     }
     // if running Mozilla or other browsers
     else {
         try {
             xmlHttp = new XMLHttpRequest();
         } catch (e) {
             xmlHttp = false;
         }
     }
     // return the created object or display an error message
     if (!xmlHttp)
         alert("Error creating the XMLHttpRequest object.");
     else
         return xmlHttp;
 }

 function AutoRefresh(t) {
     setTimeout(function () {
         document.location.reload(false);
     }, t);
 }

 function submit_form(fid, page, contid, reload, cb) {
     var form = document.getElementById(fid);
     var formData = new FormData(form);
     var container = $('#' + contid);
     container.html('<h6 class="text-center" ><img src="/images/loading.gif" width="40px" /> <br/> Please Wait</h6>');
     xmlHttp.open("POST", page);
     xmlHttp.onreadystatechange = function () {
         if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
             var response = xmlHttp.responseText;
             if (reload === false) {
                 var jsonObj = JSON.parse(response);
                 container.html(response);
                 return cb(jsonObj)
             } else {
                 var jsonObj = JSON.parse(response);
                 var status = jsonObj.status;
                 var data = jsonObj.data;
                 container.html(data);
                 if (status == 'success') {
                     AutoRefresh(800);
                 }
             }
         }
     };
     xmlHttp.send(formData);
 }

 function updateField(id, page, table, field, data) {
     var formdata = new FormData();
     formdata.append('id', id);
     formdata.append('data', data);
     xmlHttp.open("POST", page);
     xmlHttp.onreadystatechange = function () {
         if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
             var response = xmlHttp.responseText;
             alert(response);
         }
     };
     xmlHttp.send(formdata);
 }

 function loadPageModal(url, modalId) {
     $('#' + modalId).html('<h2 style="padding:50px;text-align:center; margin:30px; background:#fff;">Loading.. <img width="48"  src="img/loading.gif" /> </h2>');
     xmlHttp.open("GET", url);
     xmlHttp.onreadystatechange = function () {
         if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
             $('#' + modalId).html(xmlHttp.responseText);
         }
     };
     xmlHttp.send(null);
 }
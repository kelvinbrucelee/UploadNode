 var time = new Date().getTime();
 $(document.body).bind("mousemove keypress", function(e) {
     time = new Date().getTime();
 });

 function refresh() {
     if (new Date().getTime() - time >= 6000)
         window.location.reload(true);
     else
         setTimeout(refresh, 30000);
 }

 setTimeout(refresh, 30000);
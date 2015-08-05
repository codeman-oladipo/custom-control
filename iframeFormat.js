// Accessing all hyperlinks within an iframe & opening them within the frame, also prevent live links on mobile browser
(function(){
        var liveLink = document.querySelectorAll(".emailAddress");
        var formattedLink = [];
        var anchor = $('iframe').contents().find('a[refplatform="newwindow"]');
        anchor.click(function(e){
            var self = $(this);
            try{
                if(self.attr('href') != null && self.attr('href').toLowerCase().indexOf('http') != -1){
                    e.preventDefault();
                    window.open(self.attr('href'));
                }
            } catch(er){}
        });
       
         for (var i = 0; i < liveLink.length; i++) {
             formattedLink[i] = liveLink[i].innerHTML;
             formattedLink[i] = formattedLink[i].replace("@","@&#173");  
         }
})();
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="xmas2012.aspx.cs" Inherits="xmas2012_xmas2012" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Balmain Christmas 2012</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="maximum-scale=1,user-scalable=yes,width=1024"/>
    <meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  
    <link href="css/0-up.css" rel="stylesheet" />
    <script src="modernizr.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
     <script type="text/javascript"  src="http://ajax.googleapis.com/ajax/libs/chrome-frame/1/CFInstall.min.js"></script>
    <script src="jquery.reject.min.js"></script>
    <script type="text/javascript" src="game.min.js"></script>
    
    <script>
        function hideAddressBar() {
            if (!window.location.hash) {
                if (document.height < window.outerHeight) {
                    document.body.style.height = (window.outerHeight + 50) + 'px';
                }

                setTimeout(function () { window.scrollTo(0, 1); }, 50);
            }
        }

        $(function () {
            $("#choosePlayer-header").click(function () {
                $("#choosePlayer").slideToggle();
            });


            var choosen = $("input[type='radio']:checked").val();
            var imageSrc = "images/headshots/" + choosen + ".png";
            $("#choosePlayer-header > img").attr("src", imageSrc);


            $('input[type="radio"]').each(function () {
                var Man = $(this).val();
                var imageSource = "images/headshots/" + Man + ".png";
                var Image = "<img src='" + imageSource + "' width='100'>";


                $(this).siblings("label").prepend(Image);
            });


            $('input[type="radio"]').click(function () {
                var choosen = $(this).val();
                var imageSrc = "images/headshots/" + choosen + ".png";

                $("#choosePlayer-header > img").attr("src", imageSrc);
              
              


 

            });
         
           
                $.reject({
                    reject: { msie8: true, msie7: true }, // Reject all renderers for demo  
                    display: ['chrome', 'gcf', 'safari', 'firefox'],
                    browserInfo: { // Settings for which browsers to display  
                        firefox: {
                            text: 'Firefox', // Text below the icon  
                            url: 'http://www.mozilla.com/firefox/' // URL For icon/text link  
                        },
                        safari: {
                            text: 'Safari',
                            url: 'http://www.apple.com/safari/download/',
                            allow: {all: false, mac: true}
                        },
                        opera: {
                            text: 'Opera 12',
                            url: 'http://www.opera.com/download/'
                        },
                        chrome: {
                            text: 'Chrome',
                            url: 'http://www.google.com/chrome/'
                        },
                        msie: {
                            text: 'Internet Explorer 9',
                            url: 'http://www.microsoft.com/windows/Internet-explorer/'
                        },
                        gcf: {
                            text: 'Google Chrome Frame',
                            url: 'http://www.google.com/chromeframe',
                            // This browser option will only be displayed for MSIE  
                            allow: { all: false, msie: true }
                        }
                    },
                    close: false, // Prevent closing of window  
                    // Header of pop-up window  
                    header: 'Unfortunately your Internet Browser is out of date and will not be able to play the game.',
                    // Paragraph 1  
                    paragraph1: 'The good news is that upgrading is easy. ' +
                                'A list of the most popular web browsers can be ' +
                                'found below. Just click on the icons to get to the download page.',
                   
                    paragraph2: 'If you must use your current browser, Click the Chrome Frame icon to install the required plugin.' 
                });


                $(".not-working").click(function () {
                    $.reject({
                        reject: { all: true}, // Reject all renderers for demo  
                        display: ['chrome', 'gcf', 'safari', 'firefox'],
                        browserInfo: { // Settings for which browsers to display  
                            firefox: {
                                text: 'Firefox', // Text below the icon  
                                url: 'http://www.mozilla.com/firefox/' // URL For icon/text link  
                            },
                            safari: {
                                text: 'Safari',
                                url: 'http://www.apple.com/safari/download/',
                                allow: { all: false, mac: true }
                            },
                            chrome: {
                                text: 'Chrome',
                                url: 'http://www.google.com/chrome/'
                            },
                            gcf: {
                                text: 'Google Chrome Frame',
                                url: 'http://www.google.com/chromeframe',
                                // This browser option will only be displayed for MSIE  
                                allow: { all: false, msie: true }
                            }
                        },
                        close: true, // Prevent closing of window  
                        // Header of pop-up window  
                        header: 'Your browser may not be supported.',
                        // Paragraph 1  
                        paragraph1: 'The good news is that upgrading is easy. ' +
                                    'A list of the most popular web browsers can be ' +
                                    'found below. Just click on the icons to get to the download page.',

                        paragraph2: 'If you must use your current browser, Click the Chrome Frame icon to install the required plugin.',
                        closeMessage: ""
                    });
                });




              
        });

        window.addEventListener("load", function () { if (!window.pageYOffset) { hideAddressBar(); } });
        window.addEventListener("orientationchange", hideAddressBar);
    </script>
     <script type="text/javascript">

         var _gaq = _gaq || [];
         _gaq.push(['_setAccount', 'UA-4495133-6']);
         _gaq.push(['_setDomainName', 'none']);
         _gaq.push(['_setAllowLinker', true]);
         _gaq.push(['_trackPageview']);

         (function () {
             var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
             ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
             var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
         })();

</script>
</head>

<body>
    <form id="form1" runat="server">
         <div class="wrapper">
        <section class="header">
            <img src="images/logo.png" />
            <div id="choosePlayerWrap" class="clearfix">
              <div id="choosePlayer-header">
                <img src="#" width="75" height="75" />
                CHOOSE A PLAYER</div>
              <div id="choosePlayer">
                <asp:RadioButtonList ID="staffList" runat="server" DataTextField="Username" DataValueField="Username" RepeatLayout="UnorderedList" CssClass="staffList" OnDataBound="staffList_DataBound"></asp:RadioButtonList>
              </div>
             </div>
        </section>
        <div id="main-content">
            <canvas id="canvas"></canvas>
            <div id="title-screen">
              <img class="landscape" src="media/titlescreen/mholm_front_h.png"/>
              <img class="portrait" src="media/titlescreen/mholm_front_v.png"/>
             </div>
             <div class="message">
                <img src="images/welcome.png" />

        </div>
        </div>
       
        <div id="bottom-section">
            <div class="game-controls">
                <div class="game-control" id="play-pause">PAUSE</div>
                <div class="game-control" id="mute">MUTE</div>
            </div>
            <a class="button restart">Start Again</a> 
            <a class="button" href="http://info.balmain.com.au/BNC5151ChristmasCard2012_ForwardFriend.html" target="_blank">Send to a Friend</a> 
             <a class="button not-working">Having problems?</a> 
            <img id="logo-pattern" src="images/logo-pattern.png">
        </div>
       
        <div id="controls">
            <div id="jump" class="control-button"><img src="images/jump.png"></div>
            <div id="directions">
                <div id="left" class="control-button"><img src="images/left.png"></div>
                <div id="right" class="control-button"><img src="images/right.png"></div>
            </div>
        </div>
       
    </div>
 
    </form>
    <!-- Marketo -->
<script type="text/javascript">
    (function () {
        var didInit = false;
        function initMunchkin() {
            if (didInit === false) {
                didInit = true;
                Munchkin.init('929-AKB-976');
            }
        }
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = document.location.protocol + '//munchkin.marketo.net/munchkin.js';
        s.onreadystatechange = function () {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                initMunchkin();
            }
        };
        s.onload = initMunchkin;
        document.getElementsByTagName('head')[0].appendChild(s);
    })();
</script>
</body>
</html>

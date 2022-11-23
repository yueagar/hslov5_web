(($) => {
	logger.log("Appending scripts and stylesheets to webpage."),
    $("body").append(`<script src="assets/main.js?v=${Date.now()}"></script>`),
    $("body").append(`<link href="assets/main.css?v=${Date.now()} type="text/css" rel="stylesheet">`);
})(window.jQuery);
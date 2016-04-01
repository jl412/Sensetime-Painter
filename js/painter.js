var uploadedImg;
var styleCode;

Dropzone.options.uploadImage = { 
  acceptedFiles: "image/*",
  maxFiles: 1,
  thumbnailWidth: 250,
  thumbnailHeight: 250
};


$('#toggle-art-style').click(function () {

    var showStyle = $('#show-style');
    var styles;

    $.getJSON('data/art-style.json', function (data) {

      console.log(data);

      styles = data.items;
      var content = data.items.map(function (item){
        return '<div class="style-item ui-widget-content" value = "' + item.value + '"><div class="style-thumbnail img-thumbnail" style="background-image:' 
        + item.thumbnail 
        + ';"></div><p>' 
        + item.name 
        +'</p></div>';
      });

      showStyle.empty();

      if (content.length) {
        showStyle.html(content);
      }

    });

    showStyle.text('Loading the JSON file.'); 

    $(function() {
      $( "#show-style" ).selectable({
        selected: function() {
          $("#apply-style").removeClass("disabled");
        },
        unselected: function() {
          $("#apply-style").addClass("disabled");
        },
        selecting: function(event, ui){
          if( $(".ui-selected, .ui-selecting").length > 1){
            $(ui.selecting).removeClass("ui-selecting");
          }
        }
      });
    });

    $("#apply-style").click(function(){
      if (!$(this).hasClass("disabled")) {
        styleCode = $(".ui-selected").attr("value");

        $("#art-style-modal").modal('hide');

        for (var i = 0; i < styles.length; i++) {
          if (styles[i].value == styleCode) {
            $("#page2 .dz-message").html('<div class="zone-img style-thumbnail img-thumbnail" style="background-image:' 
        + styles[i].thumbnail 
        + ';"></div><p>' 
        + styles[i].name 
        +'</p>')
          }
        }
      }
    });

});

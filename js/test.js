$(document).ready(function () {
  $('#get-data').click(function () {
    var showStyle = $('#show-style');

    $.getJSON('data/art-style.json', function (data) {

      console.log(data);

      var styles = data.items.map(function (item){
      	return '<div class="style-thumbnail img-thumbnail" style="background-image:' + item.thumbnail + ';"></div><p>' + item.name +'</p>';
      });

      showStyle.empty();

      if (styles.length) {
      	var content = '<div class="style-item">' + styles.join('</div><div class="style-item">') + '</div><div calss="clearfloat"></div>';
      	showStyle.html(content);
      }


      // var styles = data.items.map(function (item) {
      // 	alert(item.name);
      //   return item.name + ': ' + item.value;
      // });

      // showStyle.empty();

      // if (styles.length) {
      //   var content = '<li>' + styles.join('</li><li>') + '</li>';
      //   var list = $('<ul />').html(content);
      //   showStyle.append(list);
      // }
    });

    showStyle.text('Loading the JSON file.');
  });
});
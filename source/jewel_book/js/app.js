var App = Em.Application.create();

App.datas = Ember.Object.create({
  images_path: './scans',
  current_image: "",
 file : [ { filename: 'jewel_1.png' },
  { filename: 'jewel_2.png' },
  { filename: 'jewel_3.png' },
  { filename: 'jewel_4.png' },
  { filename: 'jewel_5.png' },
  { filename: 'jewel_6.png' },
  { filename: 'jewel_7.png' },
  { filename: 'jewel_8.png' } ]
});

App.MyView = Em.View.extend({
  fileBinding: 'App.datas.file'
});

App.imgView = Em.View.extend({
  imageBinding: 'App.datas.curent_image'
});

Handlebars.registerHelper('zoom_image', function(property) {
  var value = Ember.getPath(this, property);
  return new Handlebars.SafeString('<image src="'+App.datas.get('images_path')+"/"+value+'" class="thumbnail"/>');
});

$('.thumbnail').live('click', function(){
  App.datas.set('current_image',this.src);
  $('#big_image').fadeIn(function(){
    $('#big_image img').css('margin-left',"-"+ $('#big_image img').get(0).width/2+"px");
    $('#big_image img').css('margin-top',"-"+ $('#big_image img').get(0).height/2+"px");
    $('#big_image img').fadeIn()
  });
});

$('#big_image').live('click',function(){
  $('#big_image img').hide()
  $(this).hide();
});


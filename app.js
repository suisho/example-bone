var $ = require('jquery')(window)
var checkboxTpl = require("./checkbox.hbs")
var Backbone = require("backbone")
Backbone.$ = $

var Marionette = require("backbone.marionette")

var Pref = Backbone.Model.extend({
})

var PrefGroup = Backbone.Collection.extend({
  model: Pref
})

var PrefCheckView = Marionette.ItemView.extend({
  template : function(model){
    return checkboxTpl({
      name : model.name
    })
  }
})

var PrefGroupView = Marionette.CollectionView.extend({
  childView : PrefCheckView
})

var PanelApp = Marionette.Application.extend({
  initialize : function(){
    var prefGroup = new PrefGroup([
      new Pref({name : "北海道"}),
      new Pref({name : "山形県"})
    ])
  }
})

var panel = new PanelApp({
  container : "#container"
})

panel.start()
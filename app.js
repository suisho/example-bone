var $ = require('jquery')
var checkboxTpl = require("./checkbox.hbs")
var Backbone = require("backbone")
Backbone.$ = $

var Marionette = require("backbone.marionette")

var Pref = Backbone.Model.extend({
  defaults: {
    "active" : false
  }
})

var PrefGroup = Backbone.Collection.extend({
  model: Pref,
  activePrefs : function(){
    var prefs = this.filter(function(item){
      return item.get("active") === true
    })
    return new PrefGroup(prefs)
  }
})

var PrefCheckView = Marionette.ItemView.extend({
  ui : {
    checkbox : "input.checkbox"
  },
  events : {
    'change @ui.checkbox' : 'changeCheck'
  },
  changeCheck : function(e){
    this.model.set("active", this.ui.checkbox.is(":checked") )
    this.trigger("check:changed")
  },
  template : function(model){
    return checkboxTpl({
      name : model.name,
      active : model.active || false
    })
  }
})

var prefGroup = new PrefGroup([
  new Pref({name : "北海道", active: true}),
  new Pref({name : "山形県"})
])
  
var PrefGroupView = Marionette.CollectionView.extend({
  el : "#modal",
  childView : PrefCheckView,
  collection : prefGroup,
  childEvents : {
    'check:changed' : function(){
    }
  }
})
var PrefLabelView = Marionette.CollectionView.extend({
  el : "#labels",
  childView : PrefCheckView,
  collection : prefGroup.activePrefs(),
  childEvents : {
    'check:changed' : function(){
      this.collection = prefGroup.activePrefs()
      console.log(this.collection)
      this.render()
    }
  }
})

var PanelApp = Marionette.Application.extend({
  initialize : function(){
    var prefGroupView = new PrefGroupView()
    var prefLabelView = new PrefLabelView()
    prefGroupView.render()
    prefLabelView.render()
    
  }
})

var panel = new PanelApp({
  container : "#container"
})
panel.start()
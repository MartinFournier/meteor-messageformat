if (Meteor.isClient) {

  Router.map(function () {
    this.route('examples', {
      path: '/examples',
//      waitOn: function() {
//        return [{ ready: function() { return true; }}];
//      }
    });
  });


  Template.examples.getName = function() {
    var lang = Session.get('lang');
    return lang == 'he' ? 'גדי' : 'Gadi';
  }

  function myTrim(text, indent) {
    text = text.replace(/^\n*/, '').replace(/\t/g, '  ');
    var re = /^ */;
    var origIndent = re.exec(text)[0];
    re = new RegExp('^' + origIndent, 'gm');
    return text.replace(re, indent).replace(/\s*$/, '');
  }

  Template.examples.example = function(key, message, params) {
    var js, longMessage;
    if (typeof key == "function") {
        // if called as a block helper
        message = myTrim(key.fn(this), '   ');
        params = { hash: key.hash };
        js = myTrim(key.inverse(this), '');
        key = params.hash.KEY;
        longMessage = true;
    } else {
        message = params ? message : null;
        js = params.extra;
        longMessage = false;
    }
    return new Handlebars.SafeString(Template.example({
      longMessage: longMessage,
      key: key, message: message, params: params, js: js,
      paramOverride: params.hash && params.hash.paramOverride
    }));
  }
  Template.example.blah = function() {
    console.log(this);
  }

  Template.example.paramsStr = function() {
    var out = '';
    var params = this.params.hash;
    for (key in params)
      out += ' ' + key + '="' + params[key] + '"';
    return out;
  }

/*
  Template.example.longMessage = function() {
    return 1;
    return this.message.length > 20;
  }
*/

  Session.setDefault('lang', 'en');
  Template.langButtons.events({
    'click button': function(event) {
      var lang = $(event.target).val();
      Session.set('lang', lang);
      Session.set('locale', lang);
    }
  });
  Template.langButtons.isLang = function(lang) {
    return Session.equals('lang', lang);
  }

  Session.setDefault('NUM', 1);
  Template.numButtons.events({
    'click button': function(event) {
      Session.set('NUM', $(event.target).val());
    }
  });
  Template.numButtons.isNum = function(num) {
    // Session.equals doesn't work well with 0
    return Session.get('NUM') == num;
    /*
    console.log(Session.get('NUM'), num);
    console.log(Session.get('NUM') == num);
    console.log(Session.equals('NUM', num));
    return Session.equals('NUM', num);
    */
  }
  Template.examples.getNum = function() {
    return Session.get('NUM');
  }

  Session.setDefault('NUM2', 1);
  Template.numButtons2.events({
    'click button': function(event) {
      Session.set('NUM2', $(event.target).val());
    }
  });
  Template.numButtons2.isNum = function(num) {
    // Session.equals doesn't work well with 0
    return Session.get('NUM2') == num;
    /*
    console.log(Session.get('NUM'), num);
    console.log(Session.get('NUM') == num);
    console.log(Session.equals('NUM', num));
    return Session.equals('NUM', num);
    */
  }
  Template.examples.getNum2 = function() {
    return Session.get('NUM2');
  }


  Session.setDefault('GENDER', 'male');
  Template.genderButtons.events({
    'click button': function(event) {
      Session.set('GENDER', $(event.target).val());
    }
  });
  Template.genderButtons.isGender = function(gender) {
    return Session.equals('GENDER', gender);
  }
  Template.examples.getGender = function() {
    return Session.get('GENDER');
  }

  function setBodyDir() {
    // There will ultimately be a better way to do this in the final package
    var lang = Session.get('lang');
    $('body').attr('dir', lang == 'he' ? 'rtl' : 'ltr');    
  }
  Deps.autorun(setBodyDir);
  Meteor.startup(setBodyDir);

}

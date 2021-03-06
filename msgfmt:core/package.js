Package.describe({
  name:    "msgfmt:core",
  version: "2.0.0-preview.20",
  summary: "MessageFormat i18n support, the Meteor way",
  git:     "https://github.com/gadicc/meteor-messageformat.git",
  documentation: '../README.md'
});

Package.registerBuildPlugin({
  name: 'msgfmt',
  sources: [ 'buildPlugin.js' ]
});

var client = 'client';
var server = 'server';
var both = [ client, server ];

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.0.1");

  // common deps
  api.use([
    'underscore',
    'ddp',
    'mongo@1.0.4',
    'meteorhacks:inject-initial@1.0.3',
    'jag:pince@0.0.6',
    'raix:eventemitter@0.1.2'
  ], both);

  // client deps
  api.use([
    // core MDG packages
    'session',
    'tracker',
    'reactive-var',
    'ddp',
    // core 3rd party packages
    'jquery',
    // MDG maintained non-core
    'amplify@1.0.0'
  ], client);

  // Blaze support
  api.use(['templating', 'spacebars'], client, { weak: true });

  // For msgfmt.storeUserLocale == true.
  api.use('accounts-base', client, { weak: true });

  // For v0 warning check
  api.use('gadicohen:messageformat@0.0.1', server, { weak: true });

  // api.use('browser-policy', 'server', { /* weak: true */ });

  //api.use(['ui', 'spacebars', 'htmljs'], 'client');

  // server deps
  api.use([
    'check',
    'webapp'
  ], server);

  // common adds
//  api.addFiles('lib/messageformat.js/messageformat.js', ['client', 'server']);

  // TODO, locales by demand, respect namespacing by wrapping files ourselves
  api.addFiles([
    'lib/intl-messageformat/dist/intl-messageformat-with-locales.js'
  ], both)

  api.addFiles([
    'lib/mfPkg/messageformat.js'//,
//    'lib/mfPkg/locale-all.js'
  ], both);

  // server
  api.addFiles([
    'lib/mfPkg/messageformat-server.js',
    'lib/mfPkg/messageformat-server-integrations.js'
  ], server);

  // client
  api.addFiles([
    'lib/mfPkg/messageformat-client.js',
    'lib/mfPkg/messageformat-client-integrations.js',
  ], client);

  // TODO, on cordova, need to bundle all languages

  // Integrations
  api.use('cmather:handlebars-server@2.0.0', 'server', { weak: true });

  // For msgfmt.sanitizeHTML()
  api.use('djedi:sanitize-html@1.11.2', server);
  api.use('djedi:sanitize-html-client@1.11.2-0', client);
  api.addFiles('lib/mfPkg/sanitization.js', both);

  api.export(['mfPkg', 'mf', 'msgfmt'], both);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('msgfmt:core');
  api.use('underscore');
  api.use('http', 'server');
  api.use('browser-policy', server);

  api.addFiles('tests/tests-client.js', client);
  api.addFiles('tests/tests-server.js', server);

  api.addFiles('tests/integrations/handlebars-server.handlebars', server);
  api.addFiles('tests/tests-server-integrations.js', server);
  api.use('cmather:handlebars-server@2.0.0', 'server');

});

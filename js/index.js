/*
 * App Store Link Slug Generator
 */
var app = angular.module('App', []);

app.controller('AppCtrl', function($scope, $filter) {
  $scope.data = {
    name: '',
    platform: 'ios',
    linkAppStore: '',
    linkItunes: ''
  };
  
  $scope.getUrlAppStore = function() {
    var prefix = ($scope.data.platform === 'ios') ? 'http://appstore.com/' : 'http://appstore.com/mac/';
    var slug = $filter('appStoreLinkSlug')($scope.data.name);
    return prefix + slug;
  };
  
  $scope.getUrlItunes = function() {
    var prefix = ($scope.data.platform === 'ios') ? 'http://itunes.com/apps/' : 'http://itunes.com/mac/';
    var slug = $filter('appStoreLinkSlug')($scope.data.name);
    return prefix + slug;
  };
  
  $scope.updateLinks = function() {
    $scope.data.linkAppStore = $scope.getUrlAppStore();
    $scope.data.linkItunes = $scope.getUrlItunes();
  };
  $scope.updateLinks();
  
});

app.filter('appStoreLinkSlug', function() {
  return function(input) {
    
    // Remove all whitespace
    input = input.replace(/\s+/g, '');
    
    // Convert all characters to lower-case
    input = input.toLowerCase();
    
    // Remove all copyright (©), trademark (™) and registered mark (®) symbols
    input = input.replace(/[©™®]/gi, '');
    
    // Replace ampersands ("&") with "and"
    input = input.replace(/[&]/gi, 'and');
    
    // Remove most punctuation (!¡"#$%'()*+,\-./:;<=>¿?@[\]^_`{|}~)
    input = input.replace(/[!¡"#$%'()*+,-.:;<=>¿?@^_`|~\{\}\[\]\\\/]/gi, '');
    
    // @todo: Replace accented and other "decorated" characters (ü, å, etc.) with their elemental character (u, a, etc.)
    
    return input || 'apple';
  };
});

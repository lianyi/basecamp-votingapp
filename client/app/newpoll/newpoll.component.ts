'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './newpoll.routes';

export class NewpollComponent {

  /*@ngInject*/
  $http;
  $state;
  poll;

  constructor($http, $state) {
    this.$http = $http;
    this.$state = $state;
  }

  addNewPoll() {
    var me = this;
    if (me.poll) {
      if (angular.isArray(me.poll.results)) {
        var n = {};
        me.poll.results.forEach(function (d) {
          n[d] = 0;
        });
        me.poll.results = n;
      }
      console.info(me.poll);
      me.$http.post('/api/polls', this.poll).then(function (res) {
        me.$state.go("pollDetails", {pollId: res.data._id}, {reload: true});
      });
    }
  }
}

export default angular.module('pollAppApp.newpoll', [uiRouter])
  .config(routes)
  .component('newpoll', {
    template: require('./newpoll.html'),
    controller: NewpollComponent,
    controllerAs: 'newpollCtrl'
  })
  .name;

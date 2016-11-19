const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  polls = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('poll');
    });
  }

  $onInit() {
    this.$http.get('/api/polls').then(response => {
      this.polls = response.data;
      this.socket.syncUpdates('poll', this.polls);
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/polls', {name: this.newThing});
      this.newThing = '';
    }
  }

  deleteThing(poll) {
    this.$http.delete('/api/polls/' + poll._id);
  }
}

export default angular.module('pollAppApp.main', [
  uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;

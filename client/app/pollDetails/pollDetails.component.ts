'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './pollDetails.routes';

export class PollDetailsComponent {
  /*@ngInject*/
  $http;
  socket;
  $stateParams;
  $scope;
  $state;
  $location;
  pollId;
  poll;
  Auth;
  absurl: string;
  votefor;
  voteforCustom;

  getCurrentUser: Function;


  constructor($scope, socket, $stateParams, $state, $http, Auth, $location) {
    this.$stateParams = $stateParams;
    this.pollId = $stateParams.pollId;
    this.socket = socket;
    this.$http = $http;
    this.$state = $state;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.absurl = 'https://twitter.com/intent/tweet?url=' + encodeURI($location.absUrl().split('?')[0]);

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('poll');
    });
  }


  updateChart(){
    this.$scope.chartLabels = Object.keys(this.poll.results);
    this.$scope.chartData = [];
    this.$scope.isPollOwner = (this.poll.owner === this.getCurrentUser()._id);

    for (var i = 0; i < this.$scope.chartLabels.length; i++) {
      this.$scope.chartData.push(this.poll.results[this.$scope.chartLabels[i]]);
    }
  }
  $onInit() {
    this.$http.get('/api/polls/' + this.pollId).then(response => {
        this.poll = response.data;
        this.socket.syncUpdates('poll', this.poll);
        this.updateChart();
      }, () => this.$state.go("main")
    );
  }

  submitVote() {
    var votefor = "";
    if (this.votefor && this.votefor !== "===custom-option") {
      votefor = this.votefor;
    } else if (this.votefor === "===custom-option" && this.voteforCustom) {
      votefor = this.voteforCustom;
    }

    if (votefor) {
      console.info(votefor);
      this.poll.results[votefor] = this.poll.results[votefor] ? this.poll.results[votefor] + 1 : 1;
      this.$http.put('/api/polls/' + this.pollId,this.poll);
      this.updateChart();
    } else {
      window.alert("You must choose which option to vote for.");
    }
  };
}

export default angular.module('pollAppApp.pollDetails', [uiRouter])
  .config(routes)
  .component('pollDetails', {
    template: require('./pollDetails.html'),
    controller: PollDetailsComponent,
    controllerAs: 'pollDetailsCtrl'
  })
  .name;

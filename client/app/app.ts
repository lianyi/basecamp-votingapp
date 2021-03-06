'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');
import 'angular-socket-io';

const uiRouter = require('angular-ui-router');
const uiBootstrap = require('angular-ui-bootstrap');
const  chartJs = require('angular-chart.js');

// const ngMessages = require('angular-messages');
// import ngValidationMatch from 'angular-validation-match';


import {routeConfig} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import newpool from './newpoll/newpoll.component';
import pollDetails from './pollDetails/pollDetails.component';
import myPolls from './myPolls/myPolls.component';

import './app.less';

angular.module('pollAppApp', [
  ngCookies,
  ngResource,
  ngSanitize,

  'btford.socket-io',

  uiRouter,
  uiBootstrap,
  chartJs,
  _Auth,
  account,
  admin,
  navbar,
  footer,
  main,
  constants,
  socket,
  util,
  newpool,
  pollDetails,
  myPolls
])
  .config(routeConfig)
  .run(function ($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedIn(function (loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['pollAppApp'], {
      strictDi: true
    });
  });

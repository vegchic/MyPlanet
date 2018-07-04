import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios';

const menubar = () => import('@/components/menuBar');
const galaxiesTable = () => import('@/page/galaxiesTable');
const starsTable = () => import('@/page/starsTable');
const cometsTable = () => import('@/page/cometsTable');
const planetsTable = () => import('@/page/planetsTable');
const satellitesTable = () => import('@/page/satellitesTable');
const searchTable = () => import('@/page/searchTable');
const itemDetail = () => import('@/page/itemDetail');
const newItem = () => import('@/page/newItem');
const userInfo = () => import('@/page/userInfo');
const register = () => import('@/page/register');
const login = () => import('@/page/login');
const home = () => import('@/page/home');


Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/register',
      name: 'register',
      components: {
        menubarCenter: register
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        menubarCenter: login
      }
    },
    {
      path: '/home',
      name: 'home',
      components: {
        menubarCenter: menubar,
        infoTable: home
      }
    },
    {
      path: '/galaxies',
      name: 'galaxies',
      components: {
        menubarTop: menubar,
        infoTable: galaxiesTable
      }
    },
    {
      path: '/galaxies/:id',
      name: 'galaxy-item',
      components: {
        menubarTop: menubar,
        infoTable: itemDetail
      }
    },
    {
      path: '/comets',
      name: 'comets',
      components: {
        menubarTop: menubar,
        infoTable: cometsTable
      }
    },
    {
      path: '/comets/:id',
      name: 'comet-item',
      components: {
        menubarTop: menubar,
        infoTable: itemDetail
      }
    },
    {
      path: '/stars',
      name: 'stars',
      components: {
        menubarTop: menubar,
        infoTable: starsTable
      }
    },
    {
      path: '/stars/:id',
      name: 'star-item',
      components: {
        menubarTop: menubar,
        infoTable: itemDetail
      }
    },
    {
      path: '/planets',
      name: 'planets',
      components: {
        menubarTop: menubar,
        infoTable: planetsTable
      }
    },
    {
      path: '/planets/:id',
      name: 'planet-item',
      components: {
        menubarTop: menubar,
        infoTable: itemDetail
      }
    },
    {
      path: '/satellites',
      name: 'satellites',
      components: {
        menubarTop: menubar,
        infoTable: satellitesTable
      }
    },
    {
      path: '/satellites/:id',
      name: 'satellite-item',
      components: {
        menubarTop: menubar,
        infoTable: itemDetail
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        menubarTop: menubar,
        infoTable: userInfo
      }
    },
    {
      path: '/search',
      name: 'search',
      components: {
        menubarTop: menubar,
        infoTable: searchTable
      }
    },
    {
      path: '/add',
      name: 'add',
      components: {
        menubarTop: menubar,
        infoTable: newItem
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  axios.get('/api/isAuth').then(response => {
    if (!response.data.status
        && to.path !== '/login' && to.path !== '/register') {
      next('/login');
    } else if (response.data.status && (to.path === '/login' || to.path === '/register')) {
      next('/home');
    } else {
      next();
    }
  });
});

export default router;

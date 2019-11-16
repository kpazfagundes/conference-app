import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faClock,
  faMapMarkerAlt,
  faGlobeAmericas,
  faChevronDown,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

import {
  faLinkedinIn,
  faInstagram,
  faFacebookF,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faClock,
  faMapMarkerAlt,
  faInstagram,
  faFacebookF,
  faLinkedinIn,
  faTwitter,
  faGlobeAmericas,
  faChevronDown,
  faSearch,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
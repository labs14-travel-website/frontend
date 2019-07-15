import mixpanel from 'mixpanel-browser';
import ga from 'react-ga';

// limit tracking to production
let enabled = process.env.REACT_APP_ENV === 'production';

// initialize trackers
if (enabled) {
  mixpanel.init(process.env.REACT_APP_MP_TOKEN);
  ga.initialize(process.env.REACT_APP_GA_TOKEN);
}

/**
 * Identifies a user for analytics, user must be logged in
 * @param {string} id - Id of the current user
 * @param {string} type - Option type of user E.g. "Admin", "Pro" default: "User"
 * @return {undefined}
 */
const identify = (id, type = "User") => {
  if (enabled) {
    // TODO: Hash provided user ID for analytics
    mixpanel.people.set({ type });
    mixpanel.identify(id);
    ga.set({ user: id, type });
  }
};

/**
 * Tracks a specific user interaction
 * @param {object} props Event information for the tracked event.
 * @param {string} props.category Category for the event.
 * @param {string} props.action Action that the user has taken.
 * @param {string} [props.label] Optional label for the event.
 * @param {number} [props.value] Optional numeric value associated with this event (e.g. rating);
 * @return {undefined}
 */
// TODO: Set up useful logging: category and action are REQUIRED.
const event = ({ category, action, label = 'Generic', value }) => {
  if (enabled) {
    mixpanel.track(label, {
      category,
      action,
      value,
    });

    ga.event({
      category,
      action,
      label,
      value
    });
  }
};

/**
 * Tracks a page view.
 * @param {string} path Path for the page being viewed.
 * @return {undefined}
 */
const pageview = path => {
  if (enabled) {
    mixpanel.track('Page View', {
      path,
    });

    ga.pageview(path);
  }
};

export default {
  identify,
  event,
  pageview,
  ga,
  mp: mixpanel,
};

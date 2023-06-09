import { connect } from 'react-redux';
import { selectUnseenNotificationCount } from 'redux/selectors/notifications';
import { doSeeAllNotifications } from 'redux/actions/notifications';
import { selectUser } from 'redux/selectors/user';
import NotificationHeaderButton from './view';

const select = (state) => ({
  unseenCount: selectUnseenNotificationCount(state),
  user: selectUser(state),
});

export default connect(select, {
  doSeeAllNotifications,
})(NotificationHeaderButton);

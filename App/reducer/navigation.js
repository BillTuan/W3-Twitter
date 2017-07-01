import {NavigationActions} from 'react-navigation';
import Navigator from '../route';


export default (state , action) => {
  const nextState = Navigator.router.getStateForAction(action, state);
  return nextState || state
}

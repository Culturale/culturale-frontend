import { useApplicationLayer } from '~/hooks';

type SearchType = 'users' | 'events';

class SearchController {
    const {controllers:{EventController}} = useApplicationLayer();
    const events = EventController.events;

    const {controllers:{UserController}} = useApplicationLayer();
    const users = UserController.userInfo;
    
    if (searchType === 'usuarios') {
        const params = {
          username: searchText
        };
        .then(response => {
          const modifiedUsers = response.data.user.map((user: User, index: number) => {
            user._id = (index + 1).toString();
            return user;
          })
          setSearchResults(modifiedUsers);
        })
        .catch(error => {
            console.log(error);
        });
    }

    else if (searchType === 'eventos') {
        .then(response => {
          const modifiedEvents = response.data.event.map((event: Event, index: number) => {
              event._id = (index + 1).toString();
              return event;
          });
          setSearchResults(modifiedEvents);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
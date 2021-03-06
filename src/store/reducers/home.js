import * as actionTypes from '../actions/actionTypes';

const initialState = {
	allBlogs: [],
	allEvents: [],
	filteredEvents: [],
	filteredBlogs: [],
	onFetchingEvents: true,
	onFetchingBlogs: true,
	onPostingBlogComment: false,
	onLoadingHomeData: false,
	onRSVP: false,
	alertMessage: '',
	alertType: '',
	isCreating: false,
};

const homeReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ON_GET_EVENTS:
			return {
				...state,
				onFetchingEvents: true,
				alertMessage: '',
				alertType: '',
			};

		case actionTypes.GET_EVENTS_SUCCESS:
			return {
				...state,
				allEvents: action.allEvents,
				filteredEvents: action.allEvents,
				onFetchingEvents: false,
				alertMessage: '',
			};

		case actionTypes.GET_BLOGS_SUCCESS:
			return {
				...state,
				allBlogs: action.allBlogs,
				filteredBlogs: action.allBlogs,
				onFetchingBlogs: false,
				alertMessage: '',
				alertType: '',
			};

		case actionTypes.ON_RSVP:
			return {
				...state,
				onRSVP: true,
				alertMessage: '',
				alertType: '',
			};

		case actionTypes.RSVP_EVENT_SUCCESS:
			return {
				...state,
				allEvents: state.allEvents.map((event) => {
					if (event.event_name === action.rsvpEventTitle) {
						if (event.RSVP.indexOf(action.rsvpUsername) === -1) {
							const updatedEvent = JSON.parse(JSON.stringify(event));
							updatedEvent.RSVP.push(action.rsvpUsername);
							return updatedEvent;
						}
					}
					return event;
				}),

				filteredEvents: state.allEvents.map((event) => {
					if (event.event_name === action.rsvpEventTitle) {
						if (event.RSVP.indexOf(action.rsvpUsername) === -1) {
							const updatedEvent = JSON.parse(JSON.stringify(event));
							updatedEvent.RSVP.push(action.rsvpUsername);
							return updatedEvent;
						}
					}
					return event;
				}),
				onFetchingEvents: false,
				onRSVP: false,
				alertMessage: '',
				alertType: '',
			};

		case actionTypes.ON_POSTING_BLOG_COMMENT:
			return {
				...state,
				onPostingBlogComment: true,
				alertMessage: '',
				alertType: '',
			};

		case actionTypes.COMMENT_BLOG_SUCCESS:
			return {
				...state,
				allBlogs: state.allBlogs.map((blog) => {
					if (blog.blogName === action.blogSubject) {
						const updatedBlog = JSON.parse(JSON.stringify(blog));
						updatedBlog.BlogComment[action.username] = action.blogComment;
						return updatedBlog;
					}
					return blog;
				}),
				filteredBlogs: state.allBlogs.map((blog) => {
					if (blog.blogName === action.blogSubject) {
						const updatedBlog = JSON.parse(JSON.stringify(blog));
						updatedBlog.BlogComment[action.username] = action.blogComment;
						return updatedBlog;
					}
					return blog;
				}),
				onPostingBlogComment: false,
				alertMessage: '',
				alertType: '',
			};

		case actionTypes.ON_FILTER:
			return {
				...state,
				onLoadingHomeData: true,
				alertMessage: '',
				alertType: '',
			};

		case actionTypes.FILTER_EVENTS_SUCCESS:
			return {
				...state,
				filteredEvents: action.filteredEvents,
				onLoadingHomeData: false,
				alertMessage: '',
				alertType: '',
			};

		case actionTypes.SEARCH_BLOGS_AND_EVENTS_SUCCESS:
			return {
				...state,
				filteredEvents: action.matchedEvents,
				onLoadingHomeData: false,
				alertMessage: '',
				alertType: '',
			};

		case actionTypes.ON_CREATING:
			return {
				...state,
				alertMessage: '',
				alertType: '',
				isCreating: true,
			};

		case actionTypes.CREATED_FAIL:
			return {
				...state,
				alertMessage: action.alertMessage,
				alertType: action.alertType,
				isCreating: false,
			};

		case actionTypes.CREATED_EVENT_SUCCESS:
			const newEvent = {
				Event_date: action.eventDate,
				Event_desc: action.eventDescription,
				Event_image: action.imgUrl,
				Event_location: action.locationDetail,
				Online: action.eventType,
				RSVP: [],
				User: action.creator,
				event_name: action.eventTitle,
			};

			return {
				...state,
				alertMessage: action.alertMessage,
				alertType: action.alertType,
				allEvents: [...state.allEvents, { ...newEvent }],
				filteredEvents: [...state.filteredEvents, { ...newEvent }],
				isCreating: false,
			};

		case actionTypes.POSTED_BLOG_SUCCESS:
			const newBlog = {
				BlogComment: {},
				BlogContent: action.blogBody,
				BlogDate: action.currentDate,
				BlogLocation: action.currentLocation,
				BlogTime: action.currentTime,
				UserName: action.username,
				blogName: action.blogSubject,
			};

			return {
				...state,
				alertMessage: action.alertMessage,
				alertType: action.alertType,
				allBlogs: [...state.allBlogs, { ...newBlog }],
				filteredBlogs: [...state.filteredBlogs, { ...newBlog }],
				isCreating: false,
			};

		case actionTypes.CLEAR_ALERT_MESSAGE:
			return {
				...state,
				alertMessage: '',
				alertType: '',
				isCreating: false,
			};

		default:
			return state;
	}
};

export default homeReducer;

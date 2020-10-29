import React, { useState, useEffect } from 'react';
import {
	Container,
	Grid,
	Button,
	TextField,
	Typography,
	Select,
	MenuItem,
	FormControl,
	CircularProgress,
} from '@material-ui/core';
import * as actions from '../../store/actions/home';

import { connect } from 'react-redux';

import SlideShow from '../../components/UI/slideShow/SlideShow';

const Home = (props) => {
	const [filterValue, setFilterValue] = useState('All Events');

	useEffect(() => {
		console.log('this is use effect in home ');
		props.fetchEvents(props.token);
		props.fetchBlogs(props.token);
	}, []);

	const handleChangeFilterValue = (event) => {
		setFilterValue(event.target.value);

		props.filteringEvents(event.target.value, props.allEvents);
	};

	let allEventSection = null;
	let blogSection = null;

	if (props.onFetchingEvents) {
		allEventSection = <CircularProgress />;
	} else {
		allEventSection = (
			<SlideShow
				slideItems={props.filteredEvents}
				token={props.token}
				username={props.username}
				isEvent={true}
				isProfile={false}
				isRsvpList={false}
			/>
		);
	}

	if (props.onFetchingBlogs) {
		blogSection = <CircularProgress />;
	} else {
		blogSection = (
			<SlideShow
				slideItems={props.filteredBlogs}
				token={props.token}
				username={props.username}
				isEvent={false}
				isProfile={false}
				isRsvpList={false}
			/>
		);
	}

	return (
		<Container>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={8}>
					<TextField
						variant='outlined'
						size='small'
						fullWidth
						name='searchTerm'
						placeholder='Search'
						// label='Search Term'
						type='text'
						id='search-term'
						// inputRef={register({ required: true })}
						// error={errors.username?.type === 'required'}
					/>
				</Grid>
				<Grid item xs={3} sm={3} md={2}>
					<FormControl variant='outlined' style={{ width: '100%' }}>
						<FormControl variant='outlined'>
							{/* <InputLabel id='demo-simple-select-filled-label'>Age</InputLabel> */}
							<Select
								displayEmpty
								value={filterValue}
								onChange={handleChangeFilterValue}
								style={{ height: '40px' }}>
								<MenuItem value='All Events'>All Events</MenuItem>
								<MenuItem value='Only Online'>Only Online</MenuItem>
								<MenuItem value='Only In-Person'>Only In-Person</MenuItem>
							</Select>
						</FormControl>
					</FormControl>
				</Grid>
				<Grid item xs={1} sm={1} md={1}>
					<Button variant='contained' color='primary' size='medium'>
						Search
					</Button>
				</Grid>
				{/* <Grid item xs={12} sm={12}>
					<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
						Popular Online Events
					</Typography>
					{onlineEventSection}
				</Grid> */}

				{props.onLoadingHomeData ? <CircularProgress /> : null}

				{props.onLoadingHomeData ? null : (
					<Grid item xs={12} sm={12}>
						<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
							Trending Events
						</Typography>
						{allEventSection}
					</Grid>
				)}

				{props.onLoadingHomeData ? null : (
					<Grid item xs={12} sm={12}>
						<Typography variant='h5' style={{ fontWeight: 'bolder' }}>
							Recent Blogs
						</Typography>
						{blogSection}
					</Grid>
				)}
			</Grid>
		</Container>
	);
};
const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		username: state.auth.username,
		onFetchingEvents: state.home.onFetchingEvents,
		onFetchingBlogs: state.home.onFetchingBlogs,
		filteredEvents: state.home.filteredEvents,
		filteredBlogs: state.home.filteredBlogs,
		// allOnlineEvents: state.home.allOnlineEvents,
		allEvents: state.home.allEvents,
		allBlogs: state.home.allBlogs,
		onLoadingHomeData: state.home.onLoadingHomeData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchEvents: (token) => dispatch(actions.fetchEvents(token)),
		fetchBlogs: (token) => dispatch(actions.fetchBlogs(token)),
		filteringEvents: (filterValue, events) =>
			dispatch(actions.filteringEvents(filterValue, events)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

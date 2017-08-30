import CausalityRedux from 'causality-redux';
import fetchPosts from '../model/AsyncModel';
import AsyncApp from '../view/containers/AsyncApp';
import 'react-causality-redux';

//
// Redux partition definition. This is the declarative part of the controller
// that defines the redux store partition and also the set of functions that
// can be inserted into the props of react components by causality-redux
//
const controllerFetchPosts = (selectedSubreddit) => {
    partitionState.isFetching = true;
    fetchPosts(
        selectedSubreddit,
        (json) => {
            const received = Date.now();
            const posts = json.data.children.map(child => child.data);
            const cache = partitionState.cache;
            cache[selectedSubreddit] = { posts, received };
            partitionState.cache = cache;
            setState({ isFetching: false, selectedSubreddit, posts, lastUpdated: received });
        }
    );
};

const controllerHandleChangeSubreddit = (selectedSubreddit) => {
    const cacheEntry = partitionState.cache[selectedSubreddit];
    if (cacheEntry) 
        setState({ selectedSubreddit, posts: cacheEntry.posts, lastUpdated: cacheEntry.received });
    else
        controllerFetchPosts(selectedSubreddit);
};

const controllerRefresh = () => {
    controllerFetchPosts(partitionState.selectedSubreddit);
};

//
// Redux partition definition.
//
const ASYNC_PARTITION = 'ASYNC_PARTITION';
const asyncPartition = {
    partitionName: ASYNC_PARTITION,
    // Define the shape of the redux state partition with initial values.
    defaultState: { cache: {post:[], received: new Date()}, posts: [], selectedSubreddit: 'reactjs', isFetching: false, lastUpdated: new Date() },
    controllerFunctions:
    {
        // UI callable functions.
        'handleChangeSubreddit': controllerHandleChangeSubreddit,
        'handleRefreshList': controllerRefresh
    }
};

//
// Add the partition definition to CausalityRedux.
//
const { partitionState, setState, uiComponent } = CausalityRedux.establishControllerConnections({
    module, // module is needed to support hot reloading.
    partition: asyncPartition, // Partition definition above
    storeKeys: ['posts', 'selectedSubreddit', 'isFetching', 'lastUpdated'],
    uiComponent: AsyncApp, // React component to wrap.
    uiComponentName: 'AsyncApp'
});

// Export the redux wrapped react component.
export default uiComponent;

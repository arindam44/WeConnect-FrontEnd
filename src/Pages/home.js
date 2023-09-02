import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../Redux/Actions/dataActions";
import Grid from "@material-ui/core/Grid";
import PostCard from "../Components/Post/PostCard";
import PropTypes from "prop-types";
import PostSkeleton from "../Util/PostSkeleton";
import NavigationPanel from "../Components/NavBar/NavigationPanel";
import UsersPanel from "../Components/Chat/UsersPanel";

export class home extends Component {
  state = {
    openDialog: false,
    show: true,
  };

  componentWillMount() {
    if (!localStorage.IdToken) {
      this.props.history.push("/login");
    }
    this.props.getPosts();
  }
  componentDidMount() {
    this.props.getPosts();
    if (window.screen.availWidth < 400) this.setState({ show: false });
  }
  openNewPostDialog = () => {
    console.log("open dialog");
    this.setState({ openDialog: true });
  };
  render() {
    const { posts, loading } = this.props.data;
    let recentPostsMarkUp = !loading ? (
      posts.map((post) => <PostCard key={post._id} post={post} />)
    ) : (
      <PostSkeleton />
    );
    return (
      <div class="container">
        <Grid container spacing={2}>
          <Grid item sm={3} xs={12}>
            {this.state.show && <NavigationPanel />}
          </Grid>
          <Grid item sm={7} xs={12}>
            {recentPostsMarkUp}
          </Grid>
          <Grid item sm={2}>
            {this.state.show && <UsersPanel />}
          </Grid>
        </Grid>
      </div>
    );
  }
}
//<Profile history={this.props.history} />
home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { getPosts })(home);

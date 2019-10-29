import React from "react";
import { Switch } from "react-router-dom";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import TopicMessages from "./containers/TopicMessages";
import Topics from "./containers/Topics";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";

const MainRouter = () => (
<div>
	<Switch>
		<PrivateRoute exact path="/" component={Topics} />
		<PublicRoute exact path="/signup" component={Signup} />
		<PublicRoute exact path="/signin" component={Signin} />
		<PrivateRoute exact path="/topic/:id/messages" component={TopicMessages} />
	</Switch>
</div>
);

export default MainRouter;
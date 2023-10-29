import * as React from "react";

import { Routes as ReactRoutes, Route } from "react-router-dom";

import Loader from "../components/Loader";

const PlayersList = React.lazy(() => import("../pages/PlayersList"));
const PlayerDetails = React.lazy(() => import("../pages/PlayerDetails"));


const Routes: React.FC = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <ReactRoutes>
        <Route path="/players" element={<PlayersList />} />
        <Route path="/players/:id" element={<PlayerDetails />} />
        <Route path="*" element={<PlayersList />} />
      </ReactRoutes>
    </React.Suspense>
  );
};

export default Routes;

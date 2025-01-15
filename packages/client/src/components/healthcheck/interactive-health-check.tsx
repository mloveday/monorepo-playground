import { useState } from "react";

import { HealthCheckContent } from "./health-check-content";

export const InteractiveHealthCheck = () => {
  const [forceSucceed, setForceSucceed] = useState(true);
  return (
    <HealthCheckContent
      forceSucceed={forceSucceed}
      setForceSucceed={setForceSucceed}
    />
  );
};

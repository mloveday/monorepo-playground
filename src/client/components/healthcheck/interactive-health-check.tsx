import { useState } from "react";

import { HealthCheckContent } from "@/client/components/healthcheck/health-check-content";

export const InteractiveHealthCheck = () => {
  const [forceSucceed, setForceSucceed] = useState(true);
  return (
    <HealthCheckContent
      forceSucceed={forceSucceed}
      setForceSucceed={setForceSucceed}
    />
  );
};

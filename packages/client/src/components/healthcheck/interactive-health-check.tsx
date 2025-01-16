import { HealthCheckContent } from "@repo/client/components/healthcheck/health-check-content.tsx";
import { useState } from "react";

export const InteractiveHealthCheck = () => {
  const [forceSucceed, setForceSucceed] = useState(true);
  return (
    <HealthCheckContent
      forceSucceed={forceSucceed}
      setForceSucceed={setForceSucceed}
    />
  );
};

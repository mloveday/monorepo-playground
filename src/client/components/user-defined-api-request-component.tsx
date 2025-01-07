import { useState } from "react";

import { SampleApiDrivenComponent } from "@/client/components/sample-api-driven-component";

export const UserDefinedApiRequestComponent = () => {
  const [forceSucceed, setForceSucceed] = useState(true);
  return (
    <SampleApiDrivenComponent
      forceSucceed={forceSucceed}
      setForceSucceed={setForceSucceed}
    />
  );
};

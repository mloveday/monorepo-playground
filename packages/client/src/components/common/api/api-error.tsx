import { ApiLoading } from "@repo/client/components/common/api/api-loading.tsx";

export const ApiError = ({ retry }: { retry: () => void }) => (
  <div className="flex flex-col gap-2">
    <span>There was an error loading this content.</span>
    <ApiLoading />
    <button type="button" onClick={retry}>
      Retry
    </button>
  </div>
);

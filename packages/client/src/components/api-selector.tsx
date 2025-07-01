import { apiSlice } from "@repo/client/state/api-slice.ts";
import { useAppDispatch, useAppSelector } from "@repo/client/store/store.ts";

export const ApiSelector = () => {
  const selection = useAppSelector((s) => s.apiSelection.api);
  const dispatch = useAppDispatch();
  const handleChange = (value: "express" | "java") =>
    dispatch(apiSlice.actions.setApi(value));

  return (
    <div className="flex gap-4">
      <span className="self-center">API</span>
      <fieldset className="flex flex-col">
        <label className="flex gap-2">
          <input
            type="radio"
            name="api-select"
            value="express"
            checked={selection === "express"}
            onChange={() => handleChange("express")}
          />
          <span>Express</span>
        </label>
        <label className="flex gap-2">
          <input
            type="radio"
            name="api-select"
            value="java"
            checked={selection === "java"}
            onChange={() => handleChange("java")}
          />
          <span>Java</span>
        </label>
      </fieldset>
    </div>
  );
};

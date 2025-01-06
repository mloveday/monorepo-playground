import {useDispatch, useSelector, useStore} from "react-redux";

import {AppDispatch, AppStore, RootState} from "@/client/store/store";

// NB: do not call these directly in components, there should be some kind of service between the state and the component
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
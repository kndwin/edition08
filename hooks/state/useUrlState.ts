import {useRouter} from "next/dist/client/router";

export function useUrlState() {
  const router = useRouter();
  const urlState = router.query;
  const setUrlState = (state: any, pathname = router.pathname) => {
    const params = new URLSearchParams();
    Object.entries(state).map(([key, value]) => {
			//@ts-ignore
      params.set(key, value);
    });
    router.replace(`${pathname}?${params.toString()}`, undefined, {
      shallow: true,
    });
  };

	return { urlState, setUrlState };
}

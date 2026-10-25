import React, { Suspense } from "react";
export default function dynamic(dynamicOptions, options) {
    const LazyComponent = React.lazy(async () => {
        const mod = await dynamicOptions();
        if ("default" in mod) {
            return { default: mod.default };
        }
        return { default: mod };
    });
    return function DynamicWrapper(props) {
        const Fallback = options?.loading ? options.loading() : null;
        return (<Suspense fallback={Fallback}>
        <LazyComponent {...props}/>
      </Suspense>);
    };
}

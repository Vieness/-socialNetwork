import React, {Suspense} from "react";

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <Suspense fallback={<div>Загрузка...</div>}>
            <WrappedComponent {...props}/>
        </Suspense>
    }
}
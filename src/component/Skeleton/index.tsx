import { Suspense } from "react";
import Skeletons  from '@mui/material/Skeleton';
import { CSSProperties } from "@emotion/serialize";
export default function Skeleton({children, width, height, sx, variant}:{children:any,width?: string, height?:string, sx? : CSSProperties, variant : "text" | "rectangular" | "rounded" | "circular"}) {
    const option : any = {
        
    }
    if(width != null) {
        option.width = width 
    }
    if(height != null) {
        option.height != height
    }
    if(sx != null) {
        option.sx = sx
    }
    return(
        <Suspense fallback={<Skeletons variant={variant} {...option} />} >
            {children}
        </Suspense>
    )
}
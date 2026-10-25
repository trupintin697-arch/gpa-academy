import React, { forwardRef } from "react";
const Image = forwardRef(function Image({ src, alt, width, height, fill, priority, quality, unoptimized, className, style, ...rest }, ref) {
    const imgSrc = typeof src === "string" ? src : src?.src || "";
    const combinedStyle = {
        ...style,
        ...(fill
            ? {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: style?.objectFit || "cover",
            }
            : {}),
    };
    return (<img ref={ref} src={imgSrc} alt={alt} width={width} height={height} className={className} style={combinedStyle} loading={priority ? "eager" : "lazy"} {...rest}/>);
});
export default Image;

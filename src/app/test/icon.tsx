import {ImageResponse} from "next/og";

import "../globals.scss";

export const size = {
    width: 256,
    height: 256,
};

export const contentType = "image/svg+xml";

export default function Icon() {
    const icon = (
        <div style={{
            fontSize: 150,
            width: "100%",
            height: "100%",
            color: "white",
            background: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textShadow: "0 0 1rem #cd7920",
        }}>
            JIF
        </div>
    );

    return new ImageResponse(icon, {...size});
};

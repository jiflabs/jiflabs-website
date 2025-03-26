"use client";

import "react-quill-new/dist/quill.snow.css";
import "react-quill-new/dist/quill.core.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import( "react-quill-new" ), {ssr: false});

export default function Test() {
    return <ReactQuill/>;
}

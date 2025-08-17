"use client";

import {Main} from "@/component/container/client-container";
import {Component, ErrorInfo, ReactNode} from "react";

type Props = {
    children?: ReactNode,
};

type State = {
    isError: false,
} | {
    isError: true,
    error: Error,
    errorInfo: ErrorInfo,
};

function formatTrace(trace: string) {
    return (
        <ul>
            {trace
                .trim()
                .split("\n")
                .map(line => line.trim())
                .map((line, index) => (
                    <li key={index}>{line}</li>
                ))}
        </ul>
    );
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {isError: false};
    }

    render() {
        if (!this.state.isError)
            return this.props.children;

        return (
            <Main>
                <h1>{this.state.error.name}: {this.state.error.message}</h1>
                {this.state.error.stack ? (
                    <>
                        <h2>Error Stack</h2>
                        {formatTrace(this.state.error.stack)}
                    </>
                ) : undefined}

                {this.state.errorInfo.componentStack ? (
                    <>
                        <h2>Component Stack</h2>
                        {formatTrace(this.state.errorInfo.componentStack)}
                    </>
                ) : undefined}
            </Main>
        );
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            isError: true,
            error,
            errorInfo,
        });
    }
}

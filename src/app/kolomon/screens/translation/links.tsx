import React, { Component } from "react";
import { Link } from "../../../core/api/validation";

const truncateLongString = (
    text: string, maxLength = 40,
    noMidWordTruncation = true,
): string => {
    if (text.length < maxLength) {
        return text;
    }

    const naiveClip = text.substr(0, maxLength);
    if (noMidWordTruncation) {
        return `${naiveClip.substr(0, naiveClip.lastIndexOf(" "))}...`;
    }

    return `${naiveClip}...`;
};

const extractDomainFromURL = (url: string): string => {
    const urlInstance = new URL(url);
    return urlInstance.hostname.replace("www", "");
};

interface WorkLinksProps {
    links: Link[],
}

interface WorkLinksState {}

class WordLinks extends Component<WorkLinksProps, WorkLinksState> {
    render() {
        const { links } = this.props;

        return (
            <div className="word-links">
                {links.map((link) => (
                    <a
                        key={link.id}
                        href={link.url}
                        className="link"
                    >
                        <span className="link-icon">Icon</span>
                        <span className="link-title">
                            {truncateLongString(link.title, 40, true)}
                        </span>
                        <span className="link-domain">
                            {extractDomainFromURL(link.url)}
                        </span>
                    </a>
                ))}
            </div>
        );
    }
}

export default WordLinks;

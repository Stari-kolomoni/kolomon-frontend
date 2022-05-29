import React, { Component } from "react";
import { Link } from "../../../core/api/validation";

import Icon5ETools from "../../../../assets/link-icons/5e-tools.svg";
import IconFandomForgottenRealms from "../../../../assets/link-icons/fandom-forgotten-realms.svg";
import IconFandomGeneric from "../../../../assets/link-icons/fandom-generic.svg";
import IconWikipedia from "../../../../assets/link-icons/wikipedia.svg";
import IconWizardsOfTheCoast from "../../../../assets/link-icons/wizards-of-the-coast.svg";


interface DomainIconEntry {
    regex: RegExp,
    icon: string,
}

// TODO Not ideal, but more dynamic. Is it worth it?
const domainIcons: DomainIconEntry[] = [
    {
        regex: /.*\.?wikipedia.org/i,
        icon: IconWikipedia,
    },
    {
        regex: /.*\.?dnd.wizards.com/i,
        icon: IconWizardsOfTheCoast,
    },
    {
        regex: /.*\.?5e.tools/,
        icon: Icon5ETools,
    },
    // Specific fandom wikis here
    {
        regex: /.*\.?forgottenrealms.fandom.com/i,
        icon: IconFandomForgottenRealms,
    },
    // Any unrecognized fandom wiki gets the generic icon
    {
        regex: /.*\.?\.fandom.com/i,
        icon: IconFandomGeneric,
    },
];


const getDomainIcon = (domain: string): string | null => {
    // Return first match from domainIcons.
    const results = domainIcons.filter((entry: DomainIconEntry) => {
        return entry.regex.test(domain);
    });

    if (results.length < 1) {
        return null;
    }

    return results[0].icon;
};


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
                        <span
                            className="link-icon"
                            dangerouslySetInnerHTML={{ __html: getDomainIcon(extractDomainFromURL(link.url)) || "" }}
                        />
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

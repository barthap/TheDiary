import * as React from 'react';


export const AboutPage: React.SFC<{}> = () => (
    <article>
        <h1>About TheDiary</h1>
        <p className="lead">Welcome to TheDiary project!</p>
        <p>
            Everything about this project is described at its <a
            href="https://github.com/barthap/TheDiary">GitHub page</a>. Soon,
            here also should appear more info.
        </p>
        <p>
            <em>by <a href="https://github.com/barthap">Barthap</a></em>
        </p>
    </article>
);
AboutPage.displayName = "AboutPage";
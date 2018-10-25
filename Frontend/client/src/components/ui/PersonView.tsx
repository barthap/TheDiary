import * as React from 'react';
import {Person} from "../../types";
import * as ReactMarkdown from "react-markdown";

export interface PersonViewProps {
    person: Person;
}

export const PersonView: React.SFC<PersonViewProps> = (props) => {

    if(!props.person) return <pre>Person not loaded</pre>;

    const {birthDate, description} = props.person;
    const birthdate = new Date(birthDate).toLocaleDateString();

    return (
        <article>

            <h5>Birth date: {birthdate}</h5>
            <section>
                <h4>Description: </h4>
                <ReactMarkdown source={description} />
            </section>
        </article>
    );
};
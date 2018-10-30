import * as React from 'react';
import {IPerson} from "../../../helpers/types";
import {Link} from "react-router-dom";

export interface PersonListProps {
    people: IPerson[];
}
export const PersonList: React.SFC<PersonListProps> = (props) => (
    <ul>
        {props.people.map(i =>
            <li key={i.id}>
                <Link to={`/people/${i.id}`}>{i.fullName}</Link>
            </li>
        )}
    </ul>
);
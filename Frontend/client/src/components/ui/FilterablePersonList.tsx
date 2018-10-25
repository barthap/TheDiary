import * as React from 'react';
import {Person} from "../../types";
import {PersonList} from "./PersonList";

export interface FilterablePersonListProps {
    people: Person[];
}

type PersonGroup = {
    group: string;
    children: Person[];
}

type ThisState = {
    sortedPeople: PersonGroup[];
    filterText?: string;
}

export class FilterablePersonList extends React.Component<FilterablePersonListProps, ThisState> {

    public constructor(props: FilterablePersonListProps) {
        super(props);

        this.state = {
            filterText: '',
            sortedPeople: this.arrangeGroups(props.people)
        };

        this.handleFilterChange = this.handleFilterChange.bind(this);
    }
    
    public componentWillReceiveProps(newProps: FilterablePersonListProps) {
        this.arrangeAndFilter(newProps.people, this.state.filterText);
    }

    public render() {
        const {sortedPeople, filterText} = this.state;
        
        return (
            <div>
                <div className="input-group">
                    <div className="input-group-addon"><span>Filter</span></div>
                    <input type="text" placeholder="Filter..." className="form-control"
                        value={filterText} onChange={this.handleFilterChange}/>
                </div>
                {sortedPeople.map(g => <div key={g.group}>
                    <h5>{g.group}</h5>
                    <PersonList people={g.children}/>
                </div>)}
            </div>
        )
    }

    private handleFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        this.setState({filterText: value});
        this.arrangeAndFilter(this.props.people, value);
    }

    private arrangeAndFilter(rawData: Person[], filterText: string) {
        const trimmedFilterText = filterText.trim().toLowerCase();
        let filtered = rawData;
        if(filterText && filterText.length !== 0)
            filtered = rawData.filter(p => p.fullName.toLowerCase().includes(trimmedFilterText));
        this.setState({sortedPeople: this.arrangeGroups(filtered)});
    }

    private arrangeGroups(rawData: Person[]): PersonGroup[] {
        const data = rawData.reduce((r: any, e) => {
            let group = e.fullName[0];

            if(!r[group])
                r[group] = {group, children: [e]};
            else r[group].children.push(e);
            return r;
        }, {});

        return Object.keys(data).map(k=> data[k]);
    }
}
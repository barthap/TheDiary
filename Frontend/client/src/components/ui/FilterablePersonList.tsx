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
                {this.renderColumns(sortedPeople)}
            </div>
        )
    }

    private renderColumns(items: PersonGroup[]) {
        const secondColumnStart = Math.floor(items.length / 2);

        return (
            <div className="row">
                <div className="col-md-6">
                    {items.slice(0,secondColumnStart).map(item => this.renderGroup(item))}
                </div>
                <div className="col-md-6">
                    {items.slice(secondColumnStart).map(item => this.renderGroup(item))}
                </div>
            </div>
        );
    }

    private renderGroup(g: PersonGroup) {
        return <div key={g.group}>
            <h5>{g.group}</h5>
            <PersonList people={g.children}/>
        </div>;
    }

    private handleFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        this.setState({filterText: value});
        this.arrangeAndFilter(this.props.people, value);
    }

    private arrangeAndFilter(rawData: Person[], filterText: string) {
        const trimmedFilterText = filterText.trim().toLowerCase();
        let filtered = rawData;
        if(filterText && filterText.length > 0)
            filtered = rawData.filter(p => p.fullName.toLowerCase().includes(trimmedFilterText));
        this.setState({sortedPeople:
                this.arrangeGroups(filtered)
        });
    }

    private arrangeGroups(rawData: Person[]): PersonGroup[] {
        const data = rawData.reduce((r: any, e) => {
            let group = e.fullName[0];

            if(!r[group])
                r[group] = {group, children: [e]};
            else r[group].children.push(e);
            return r;
        }, {});

        //sort em
        return Object.keys(data).map(k=> data[k])
            .map((g: PersonGroup) => ({...g,
                children: g.children.sort((a, b) =>
                    a.fullName > b.fullName ? 1 : (a.fullName < b.fullName ? -1 : 0))
            })).sort((a, b) => a.group > b.group ? 1 : a.group < b.group ? -1 : 0);
    }

}
import * as React from 'react';
import {api} from "../../helpers/api";


//HTMLImgAttributes
export interface FetchableImageProps {
    onError?: (err: any) => void
}

type State = {
    fetching: boolean
    error: boolean
    dataUrl?: string
}
const initialState: State ={
    fetching: true,
    error: false,
    dataUrl: null
};

/**
 * Component that renders image fetched from secured API
 */
type Props = FetchableImageProps & React.ImgHTMLAttributes<HTMLImageElement>;
export class FetchableImage extends React.Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);

        this.state = initialState;
    }

    render() {
        const {dataUrl, fetching, error} = this.state;

        if(fetching)
            return <h3>...</h3>;
        if(error)
            return <h5>Error loading image</h5>;

        return <img {...this.props} src={dataUrl} />;
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if(prevProps.src !== this.props.src) { //src url changed so we need to re-render
            this.setState(initialState);
            this.doFetch();
        }
    }

    componentDidMount() {
        this.doFetch();
    }

    componentWillUnmount() {
        URL.revokeObjectURL(this.state.dataUrl);
    }

    private doFetch(){
        const { src } = this.props;
        const that = this;
        const prevData = this.state.dataUrl;

        api.get(src, {
            responseType: 'blob',
            timeout: 30000  //30s
        })
            .then(res => res.data)
            .then(data => {
                if(prevData)
                    URL.revokeObjectURL(prevData);

                const url = URL.createObjectURL(data);
                that.setState({
                    dataUrl: url,
                    fetching: false
                });
            })
            .catch(err => {
                if(that.props.onError)
                    that.props.onError(err);
                that.setState({error: true, fetching: false})
            });
    }
}
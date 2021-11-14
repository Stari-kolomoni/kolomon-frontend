import React, { ChangeEvent, Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { H2 } from "../components/text";
import { RootState } from "../../store";
import { FormTextInputNoLabel } from "../components/form";
import { CenteringContainer, Container } from "../components/container";

import PlusSVG from "../../../assets/plus.svg";
import { Button } from "../components/button";

interface MainSearchBarProps {}

interface MainSearchBarState {
    searchTerm: string,
}

class MainSearchBar extends Component<MainSearchBarProps, MainSearchBarState> {
    constructor(props: MainSearchBarProps) {
        super(props);
        this.state = {
            searchTerm: "",
        };
    }

    handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ searchTerm: event.target.value });
    };


    render() {
        const { searchTerm } = this.state;

        return (
            <div id="main-search-bar">
                <FormTextInputNoLabel
                    value={searchTerm}
                    onChange={this.handleSearchTermChange}
                    id="main-search-bar-input"
                />
                <div
                    id="main-search-bar-add-btn"
                    dangerouslySetInnerHTML={{ __html: PlusSVG }}
                />
            </div>
        );
    }
}


// Redux setup (mapStateToProps, mapDispatchToProps, connector)
const mapState = (state: RootState) => ({
    user: state.login.user,
});
const mapDispatch = {};
const connector = connect(mapState, mapDispatch);
type HomePropsFromRedux = ConnectedProps<typeof connector>;

// Prop & State setup (merge redux and own props)
interface HomeProps extends HomePropsFromRedux {}

interface HomeState {}

// Component
class Home extends Component<HomeProps, HomeState> {
    render() {
        const { user } = this.props;

        const username = user ? user.username.replace(/^\w/, (c) => c.toUpperCase()) : "";

        return (
            <div className="home-page">
                <Container containerType="narrow">
                    <H2 content={`Pozdravljen, ${username}`} className="text-center" />
                    <CenteringContainer>
                        <MainSearchBar />
                    </CenteringContainer>
                </Container>
            </div>
        );
    }
}

export default connector(Home);

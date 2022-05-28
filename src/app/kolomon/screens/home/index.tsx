import React, { ChangeEvent, Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import produce from "immer";

import { H2 } from "../../components/text";
import { FormTextInputNoLabel } from "../../components/form";
import { CenteringContainer, Container, ElevatedContainer } from "../../components/container";
import { Button } from "../../components/button";

import { SimpleEnglishWord, SloveneWord } from "../../../core/api/validation";
import KolomonApi from "../../../core/api";
import { withNavigation, WithNavigationProp } from "../../utilities";
import { RootState } from "../../../store";
import PlusSVG from "../../../../assets/plus.svg";
import BaseScreen from "../baseScreen";

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
type HomeScreenPropsFromRedux = ConnectedProps<typeof connector>;

// Prop & State setup (merge redux and own props)
// interface HomeProps extends HomePropsFromRedux, WithNavigationProp {}
interface HomeScreenProps extends HomeScreenPropsFromRedux, WithNavigationProp {}

interface HomeScreenState {
    englishWordList: SimpleEnglishWord[];
    sloveneWordList: SloveneWord[];
}

// Component
class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
    constructor(props: HomeScreenProps) {
        super(props);
        this.state = {
            englishWordList: [],
            sloveneWordList: [],
        };
    }

    async componentDidMount() {
        const wordList = await KolomonApi.getAllEnglishWords();
        this.setState(
            produce((previousState: HomeScreenState) => {
                previousState.englishWordList = wordList;
            }),
        );
    }

    redirectToEnglishWord(englishWordID: number): void {
        const { navigate } = this.props;
        navigate(`/translation/${englishWordID}`);
    }

    render() {
        const { user } = this.props;
        const { englishWordList } = this.state;

        const username = user
            ? user.username.replace(/^\w/, (c: string) => c.toUpperCase())
            : "";

        return (
            <BaseScreen className="page-home" showHeader>
                <Container containerType="narrow">
                    <H2
                        content={`Pozdravljen, ${username}`}
                        className="text-center"
                    />
                    <CenteringContainer>
                        <MainSearchBar />
                    </CenteringContainer>
                    <ElevatedContainer>
                        {englishWordList.map((word) => (
                            <Button
                                content={word.word}
                                type="button"
                                className="km-button km-button--primary"
                                key={word.id}
                                onClick={
                                    () => this.redirectToEnglishWord(word.id)
                                }
                            />
                        ))}
                    </ElevatedContainer>
                </Container>
            </BaseScreen>
        );
    }
}

// export default connector(withNavigation(Home));
export default withNavigation(HomeScreen);

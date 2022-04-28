import { Fragment, Component } from "react";
import _ from "lodash";
import store from "./store/store";
import Header from "./components/header";
import Footer from "./components/footer";
import AttributeSelect from "./components/attributeSelect";
import availableAttributes from "./configs/availableAttributes";
import GameMessages from "./components/gameMessages";
import DweebLife from "./components/dweebLife";
import { messagesUpdate, dweebUpdate, fight } from "./store/actions";
import { connect } from "react-redux";
import gameStart from "./game-logic/gameStart";
import AboutModal from "./components/aboutModal";
import {
  FIGHT,
  DWEEB_UPDATED_MESSAGE,
  EVALUATE_DWEEB_UPDATE,
} from "./store/actionTypes";

class App extends Component {
  componentDidMount() {
    gameStart(true);
  }

  handleDweebUpdate = updatedDweeb => {
    this.props.dweebUpdate(EVALUATE_DWEEB_UPDATE, updatedDweeb);
    store.dispatch(DWEEB_UPDATED_MESSAGE);
  };

  renderControls = dweeb => {
    const fightAction = () => this.props.fight(FIGHT, this.props.dweebs);
    if (dweeb.id === 1) {
      return (
        <div className="controls">
          <button className="start" onClick={() => gameStart(false)}>
            Start Game
          </button>
          <button className="fight" onClick={fightAction}>
            FIGHT !
          </button>
          <GameMessages />
        </div>
      );
    }
  };

  listAvailableAttributes = dweeb => {
    return (
      <>
        {availableAttributes.map(attrSet => {
          return (
            <AttributeSelect
              key={attrSet.attributeId}
              dweeb={dweeb}
              attributeName={attrSet.attributeName}
              attributeArray={attrSet.attributeArray}
              labelArray={attrSet.labelArray}
              handleDweebUpdate={this.handleDweebUpdate}
            />
          );
        })}
      </>
    );
  };

  getActionStyle(dweeb) {
    if (dweeb.life > 0) {
      return {
        backgroundColor: dweeb.hurted ? "red" : "#f7931e"
      };
    }
    return {
      backgroundColor: "gray"
    };
  }

  render() {
    return (
      <>
        <AboutModal />
        <Header />

        <main className="App">
          <div className="game-wrapper">
            {this.props.dweebs.map(dweeb => {
              return (
                <Fragment key={dweeb.id}>
                  <div
                    className="dweeb-container"
                    style={this.getActionStyle(dweeb)}
                  >
                    <p className="dweeb-name">{dweeb.name}</p>
                    <img
                      className="dweeb-image"
                      src={dweeb.image}
                      alt={dweeb.name}
                    />
                    <div className="attributes-selection">
                      {this.listAvailableAttributes(dweeb)}
                    </div>

                    <DweebLife dweeb={dweeb} />
                  </div>

                  {this.renderControls(dweeb)}
                </Fragment>
              );
            })}
          </div>
        </main>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => ({
  dweebs: _.values(state.dweebs)
});

export default connect(mapStateToProps, { messagesUpdate, dweebUpdate, fight })(
  App
);

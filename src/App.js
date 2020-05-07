import React from "react";
import Container from "react-bootstrap/Container";
import {createSelector} from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { pass, stop } from "./app/appSlice";

const App = ({ state, pass, stop, totalWon, meanWon }) => {
  return (
    <Container className="p-3">
      <h1>
        Lo stesso amico matematico della scorsa volta vi propone un altro
        quesito.
      </h1>
      <p>
        Immagina di avere di fronte a te 100 fogli con altrettanti numeri
        scritti all'interno, estratti casualmente tra 1 e 10000.
      </p>
      <p>
        Le carte sono coperte, quindi non vedi il numero che vi è scritto
        all'interno.
      </p>
      <p>
        Ti chiedo di scegliere quello che secondo te è il numero più grande, ma
        senza la possibilità di scegliere tra tutti quelli estratti, ma solo
        dall'ultimo che sceglierai.
      </p>
      <p>
        Ossia se giri al primo 3000 e al secondo 2000 non potrai più scegliere
        3000 perchè hai girato la carta che nascondeva i 2000.
      </p>
      <p>
        Ora, qual è secondo te il metodo migliore per assicurarsi la vittoria?
      </p>
      <p>Quando è secondo te più profittevole smettere di girare carte?</p>

      <h2>Gioco del mese {state.month}</h2>
      <div className="row mb-4">
        <div className="col-sm-6">
          <p className="mb-0">Ci sono {100 - state.seen} fogli coperti.</p>
          <button className="btn btn-primary btn-block" disabled={state.seen === 100} onClick={() => pass()}>
            Gira un foglio
          </button>
        </div>
        {state.seen > 0 ? (
          <div className="col-sm-6">
            <p className="mb-0">
              L'ultimo foglio girato ha scritto il numero{" "}
              {state.sheets[state.seen - 1]}.
            </p>
            <button
              className="btn btn-primary btn-block"
              onClick={() => stop()}
            >
              Scegli {state.sheets[state.seen - 1]}
            </button>
          </div>
        ) : null}
      </div>

      {state.history.length > 0 ? <h2>Storico (vittorie: {totalWon} su {state.history.length})</h2> : null}
      {state.history.map(({ month, seen, chosenNumber, maxIndex, maxNumber }) => (
        <p key={month}>
          Mese {month}:{' '}
          { chosenNumber === maxNumber ?
            `hai trovato il massimo, ${chosenNumber}, dopo aver girato ${seen} fogl${seen === 1 ? 'io' : 'i'}` :
            `hai scelto ${chosenNumber}, dopo aver girato ${seen} fogl${seen === 1 ? 'io' : 'i'}, ma il massimo era ${maxNumber}, in posizione ${maxIndex + 1}`
          }
        </p>
      ))}
    </Container>
  );
};

const selectHistory = state => state.history
const selectTotalWon = createSelector(
  [selectHistory],
  (history) => history.filter(({chosenNumber, maxNumber}) => chosenNumber === maxNumber).length
)

const mapState = (state) => ({ state, totalWon: selectTotalWon(state) });

const mapDispatch = { pass, stop };

export default connect(mapState, mapDispatch)(App);

import Head from 'next/head'
import React, { useReducer } from 'react'
import questoes from '../questoes.yaml'

function QuizOption({ text, correct, missed, onClick }) {
  const border = correct ? "border-green-400" :
    missed ? "border-red-400" : "border-white"
  return (
    <div className={`rounded border-solid ${border} border-2 small font-serif text-xs border-opacity-75 my-3 p-2 ${correct || missed ? "cursor-not-allowed" : "cursor-pointer"} `} onClick={correct || missed ? null : onClick}>
      {text}
    </div>
  )
}
const initialState = {
  acertos: 0,
  showResult: false,
  currentQuestion: 0,
  questoes: questoes.questoes,
  guessed: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'GUESS':
      return { ...state, guessed: action.q, acertos: action.q === state.currentQuestion.correta - 1 ? state.acertos + 1 : state.acertos }
    case 'NEXT':
      const isLast = state.currentQuestion === state.questoes.length - 1
      return { ...state, guessed: null, showResult: isLast, currentQuestion: (isLast ? state.currentQuestion :  state.currentQuestion + 1) }
    default:
      throw new Error();
  }
}

export default function Home() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const questao = state.questoes[state.currentQuestion]

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!state.showResult ?  <main className="container font-serif flex flex-col justify-around">
        <div>
          <div>Questao {state.currentQuestion + 1}/{state.questoes.length}</div>
        </div>
        <div>
          {questao.enunciado}
        </div>
        <div>
          {questao.respostas.map((r, i) =>
            <QuizOption key={i} text={r} correct={(state.guessed !== null && questao.correta === i + i)} missed={state.guessed !== null && questao.correta !== i + 1} onClick={() => dispatch({ type: 'GUESS', q: i })} />
          )}

        </div>

        <div className="flex justify-center">
          <div className={`cursor-pointer bg-blue-500 font-bold py-2 px-4 rounded-full ${state.guessed === null && "opacity-50 cursor-not-allowed"}`}
            onClick={() => dispatch({ type: 'NEXT' })}>
            Proximo
          </div>
        </div>
                             </main> :

      <main className="container font-serif flex flex-col items-center justify-center">
        <h1> Parabens, voce acertou { state.acertos } de {state.questoes.length} questoes </h1>

        <div className="flex justify-center">
          <div className={`cursor-pointer bg-blue-500 font-bold py-5 px-4 rounded-full my-5`}
            onClick={() => dispatch({ type: 'RESET' })}>
            Jogar de Novo
          </div>
        </div>
       </main>
      }

    </div>
  )
}

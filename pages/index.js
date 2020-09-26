import Head from 'next/head'
import React, { useReducer } from 'react'
import questoes from '../questoes.yaml'
import Lottie from 'react-lottie-player'
import animationData from '../check.json'
import FadeIn from 'react-fade-in';


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
      const questao = state.questoes[state.currentQuestion]
      return { ...state, guessed: action.q, acertos: action.q === questao.correta - 1 ? state.acertos + 1 : state.acertos }
    case 'NEXT':
      const isLast = state.currentQuestion === state.questoes.length - 1
      return { ...state, guessed: null, showResult: isLast, currentQuestion: (isLast ? state.currentQuestion :  state.currentQuestion + 1) }
    case 'RESET':
      return initialState
    default:
      throw new Error();
  }
}

export default function Home() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const questao = state.questoes[state.currentQuestion]

const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

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
        <FadeIn>
          {questao.respostas.map((r, i) =>
            <QuizOption key={`${state.currentQuestion}-${i}`} text={r} correct={(state.guessed !== null && questao.correta === i + i)} missed={state.guessed !== null && questao.correta !== i + 1} onClick={() => dispatch({ type: 'GUESS', q: i })} />
          )}

        </FadeIn>

        <div className="flex justify-center">
          <div className={`cursor-pointer bg-blue-500 font-bold py-2 px-4 rounded-full ${state.guessed === null && "opacity-50 cursor-not-allowed"}`}
       onClick={state.guessed !== null ? () => dispatch({ type: 'NEXT' }) : undefined}>
            Proximo
          </div>
        </div>
                             </main> :

      <main className="container font-serif flex flex-col items-center justify-center">

        <Lottie animationData={animationData}
                loop={false}
                play
style={{ width: 150, height: 150 }}
        />

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

import Head from 'next/head'

function QuizOption({text}) {
  return (
        <div className="rounded border-solid border-white border-2 small font-serif text-xs border-opacity-75 my-3 p-2">
          {text}
      </div>
  )
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container font-serif flex flex-col justify-around">
        <div>
          <div>Question 1/10</div>
        </div>
        <div>
Acerca da Lei de Introdução do Código Civil e da vigência, aplicação e interpretação das leis, assinale a opção correta.
        </div>
        <div>
    <QuizOption text={"Iniciado o transcurso da vacatio legis, se, por qualquer motivo, ocorrer nova publicação do texto legal, o prazo de obrigatoriedade da lei contará da primeira publicação."} />

    <QuizOption text={"A lei nova que estabelece disposições gerais revoga as leis especiais anteriores que dispuserem sobre a mesma matéria, pois não pode ocorrer conflito de leis, ou seja, uma mesma matéria não pode ser regida por diversas leis."} />

    <QuizOption text={"Repristinação da lei é dar nova vigência a determinada lei, ou seja uma lei que tiver sido revogada volta a viger por determinação expressa de uma nova lei."} />

    <QuizOption text={"A lei tem vigência até que a outra lei a revogue, ou, então, até que a lei nova com ela seja incompatível. Nesse caso, ocorre a derrogação da lei, ou seja, a revogação integral de uma lei anterior por uma posterior."} />
    </div>

        <div className="flex justify-center">

       <div className="bg-blue-500 font-bold py-2 px-4 rounded-full">
         Proximo
       </div>

        </div>


      </main>
      <footer >
      </footer>
    </div>
  )
}
